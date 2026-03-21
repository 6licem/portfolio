import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import * as tus from 'tus-js-client';

interface VideoUploadProps {
  onUploadComplete?: () => void;
}

export default function VideoUpload({ onUploadComplete }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        const maxSize = 500 * 1024 * 1024;
        if (file.size > maxSize) {
          setError(`File size must be less than 500MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
          return;
        }
        setSelectedFile(file);
        setError('');
        if (!title) {
          setTitle(file.name.replace(/\.[^/.]+$/, ''));
        }
      } else {
        setError('Please select a valid video file');
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) {
      setError('Please provide a title and select a video file');
      return;
    }

    setUploading(true);
    setProgress(0);
    setError('');

    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = fileName;

    const projectId = import.meta.env.VITE_SUPABASE_URL.split('//')[1].split('.')[0];

    const upload = new tus.Upload(selectedFile, {
      endpoint: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 6000, 12000, 24000],
      headers: {
        authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'x-upsert': 'false',
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      metadata: {
        bucketName: 'videos',
        objectName: filePath,
        contentType: selectedFile.type,
        cacheControl: '3600',
      },
      chunkSize: 6 * 1024 * 1024,
      onError: function (error) {
        console.error('Upload error:', error);
        setError(error.message || 'Failed to upload video');
        setUploading(false);
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        const percentage = Math.round((bytesUploaded / bytesTotal) * 70);
        setProgress(percentage);
      },
      onSuccess: async function () {
        try {
          setProgress(80);

          const { error: dbError } = await supabase
            .from('videos')
            .insert({
              title: title.trim(),
              description: description.trim(),
              file_path: filePath,
              file_size: selectedFile.size,
              mime_type: selectedFile.type,
            });

          if (dbError) throw dbError;

          setProgress(100);
          setTitle('');
          setDescription('');
          setSelectedFile(null);

          if (onUploadComplete) {
            onUploadComplete();
          }

          setTimeout(() => {
            setProgress(0);
          }, 1000);
        } catch (err) {
          console.error('Database error:', err);
          setError(err instanceof Error ? err.message : 'Failed to save video info');
        } finally {
          setUploading(false);
        }
      },
    });

    upload.findPreviousUploads().then(function (previousUploads) {
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }
      upload.start();
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Upload Video</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter video title"
            disabled={uploading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter video description"
            disabled={uploading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video File *
          </label>
          <div className="relative">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
              id="video-upload"
              disabled={uploading}
            />
            <label
              htmlFor="video-upload"
              className={`flex items-center justify-center w-full px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                selectedFile
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400 bg-gray-50'
              } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {selectedFile ? (
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to select a video file</p>
                  <p className="text-xs text-gray-400 mt-1">MP4, WebM, MOV, etc.</p>
                </div>
              )}
            </label>
            {selectedFile && !uploading && (
              <button
                onClick={() => setSelectedFile(null)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {uploading && (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 text-center">Uploading... {progress}%</p>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading || !selectedFile || !title.trim()}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Upload Video
            </>
          )}
        </button>
      </div>
    </div>
  );
}
