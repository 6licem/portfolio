import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { uploadImage } from '../lib/imageStorage';

interface UploadedImage {
  name: string;
  url: string;
  path: string;
}

export default function ImageUploadManager() {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setUploading(true);
    setError(null);

    for (const file of e.target.files) {
      try {
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name}`;

        const result = await uploadImage(file, filename);

        if (result) {
          setUploadedImages(prev => [...prev, {
            name: file.name,
            url: result.url,
            path: result.path
          }]);
        } else {
          setError(`Failed to upload ${file.name}`);
        }
      } catch (err) {
        setError(`Error uploading ${file.name}: ${err}`);
      }
    }

    setUploading(false);
  };

  const removeImage = (path: string) => {
    setUploadedImages(prev => prev.filter(img => img.path !== path));
  };

  return (
    <div className="p-6 bg-stone-900 rounded-lg border border-stone-700">
      <h2 className="text-xl font-bold text-white mb-4">Upload Images to Supabase</h2>

      <div className="mb-6">
        <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-stone-600 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors">
          <div className="text-center">
            <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <span className="text-stone-300">Click to upload or drag and drop</span>
            <span className="text-sm text-stone-500">PNG, JPG, GIF up to 50MB</span>
          </div>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-700 text-red-300 rounded">
          {error}
        </div>
      )}

      {uploading && (
        <div className="mb-4 p-3 bg-yellow-900/30 border border-yellow-700 text-yellow-300 rounded">
          Uploading...
        </div>
      )}

      {uploadedImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Uploaded Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {uploadedImages.map((img) => (
              <div key={img.path} className="bg-stone-800 rounded-lg overflow-hidden">
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3 flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium truncate">{img.name}</p>
                    <p className="text-xs text-stone-400 truncate">{img.path}</p>
                  </div>
                  <button
                    onClick={() => removeImage(img.path)}
                    className="text-stone-400 hover:text-red-400 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
