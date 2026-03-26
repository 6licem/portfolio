import { useState, useEffect } from 'react';
import { Play, Trash2, Loader2 } from 'lucide-react';
import { supabase, type Video } from '../lib/supabase';

interface VideoGalleryProps {
  refreshTrigger?: number;
}

export default function VideoGallery({ refreshTrigger }: VideoGalleryProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos();
  }, [refreshTrigger]);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const getVideoUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('videos')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleDelete = async (video: Video) => {
    if (!confirm(`Are you sure you want to delete "${video.title}"?`)) {
      return;
    }

    setDeleting(video.id);
    try {
      const { error: storageError } = await supabase.storage
        .from('videos')
        .remove([video.file_path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('videos')
        .delete()
        .eq('id', video.id);

      if (dbError) throw dbError;

      setVideos(videos.filter(v => v.id !== video.id));
      if (selectedVideo?.id === video.id) {
        setSelectedVideo(null);
      }
    } catch (err) {
      console.error('Error deleting video:', err);
      alert('Failed to delete video');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No videos uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {selectedVideo && (
        <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
          <video
            controls
            autoPlay
            className="w-full"
            src={getVideoUrl(selectedVideo.file_path)}
          >
            Your browser does not support the video tag.
          </video>
          <div className="bg-stone-900/90 backdrop-blur-xl p-6 border-b border-stone-700/40">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tighter">{selectedVideo.title}</h3>
            {selectedVideo.description && (
              <p className="text-stone-300 mt-2 text-sm sm:text-base leading-relaxed">{selectedVideo.description}</p>
            )}
            <p className="text-xs text-stone-500 mt-4 uppercase tracking-widest font-semibold">
              Published {new Date(selectedVideo.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-stone-900/60 backdrop-blur-md rounded-2xl border border-stone-800/60 overflow-hidden hover:border-yellow-400/30 transition-all duration-500 group/card shadow-2xl"
          >
            <div
              className="relative aspect-video bg-gray-900 cursor-pointer group"
              onClick={() => setSelectedVideo(video)}
            >
              <video
                src={getVideoUrl(video.file_path)}
                className="w-full h-full object-cover"
                preload="metadata"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-16 h-16 text-white" />
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="font-black text-white truncate text-base sm:text-lg tracking-tighter group-hover/card:text-yellow-200 transition-colors">{video.title}</h3>
              {video.description && (
                <p className="text-xs sm:text-sm text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
              )}
              <div className="flex items-center justify-between mt-4">
                <p className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-widest font-bold">
                  {new Date(video.created_at).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleDelete(video)}
                  disabled={deleting === video.id}
                  className="p-2 text-stone-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-300 disabled:opacity-30"
                >
                  {deleting === video.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
