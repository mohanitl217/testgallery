import React, { useState } from 'react';
import { Upload as UploadIcon, Image, Video, X, CheckCircle, AlertCircle } from 'lucide-react';
import UploadZone from '../components/UploadZone';
import ProgressBar from '../components/ProgressBar';

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  preview?: string;
}

const Upload = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploaderName, setUploaderName] = useState('');
  const [category, setCategory] = useState('events');
  const [tags, setTags] = useState('');

  const categories = [
    { value: 'events', label: 'School Events' },
    { value: 'classes', label: 'Class Photos' },
    { value: 'activities', label: 'Activities' },
    { value: 'academics', label: 'Academic' },
    { value: 'sports', label: 'Sports' },
    { value: 'arts', label: 'Arts & Culture' },
  ];

  const handleFileSelect = (selectedFiles: FileList) => {
    const newFiles = Array.from(selectedFiles).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'pending' as const,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const uploadFiles = async () => {
    if (!uploaderName.trim()) {
      alert('Please enter your name before uploading.');
      return;
    }

    // Update all files to uploading status
    setFiles(prev => prev.map(file => ({ ...file, status: 'uploading' as const })));

    // Simulate upload process - replace with actual Google Apps Script API calls
    for (const fileData of files.filter(f => f.status === 'uploading')) {
      try {
        // Simulate progress
        for (let progress = 0; progress <= 100; progress += 20) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setFiles(prev => prev.map(file => 
            file.id === fileData.id ? { ...file, progress } : file
          ));
        }

        // Mark as completed
        setFiles(prev => prev.map(file => 
          file.id === fileData.id ? { ...file, status: 'completed' as const } : file
        ));
      } catch (error) {
        setFiles(prev => prev.map(file => 
          file.id === fileData.id ? { ...file, status: 'error' as const } : file
        ));
      }
    }
  };

  const resetForm = () => {
    setFiles([]);
    setUploaderName('');
    setTags('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Share Your Memories
          </h1>
          <p className="text-lg text-gray-600">
            Upload photos and videos to preserve our school moments forever.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Upload Form */}
          <div className="space-y-6">
            {/* Uploader Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={uploaderName}
                  onChange={(e) => setUploaderName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags (optional)
              </label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter tags separated by commas (e.g., sports, fun, memories)"
              />
            </div>

            {/* Upload Zone */}
            <UploadZone
              onFileSelect={handleFileSelect}
              dragActive={dragActive}
              setDragActive={setDragActive}
            />

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Selected Files</h3>
                <div className="space-y-3">
                  {files.map((fileData) => (
                    <div
                      key={fileData.id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      {/* Preview */}
                      <div className="flex-shrink-0">
                        {fileData.preview ? (
                          <img
                            src={fileData.preview}
                            alt="Preview"
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                            {fileData.file.type.startsWith('video/') ? (
                              <Video className="h-6 w-6 text-gray-500" />
                            ) : (
                              <Image className="h-6 w-6 text-gray-500" />
                            )}
                          </div>
                        )}
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {fileData.file.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(fileData.file.size / (1024 * 1024)).toFixed(1)} MB
                        </p>
                        {fileData.status === 'uploading' && (
                          <ProgressBar progress={fileData.progress} />
                        )}
                      </div>

                      {/* Status */}
                      <div className="flex-shrink-0">
                        {fileData.status === 'completed' && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        {fileData.status === 'error' && (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                        {fileData.status === 'pending' && (
                          <button
                            onClick={() => removeFile(fileData.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upload Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={uploadFiles}
                    disabled={files.length === 0 || !uploaderName.trim() || files.some(f => f.status === 'uploading')}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <UploadIcon className="h-5 w-5" />
                    <span>Upload Files</span>
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-medium text-blue-900 mb-4">Upload Guidelines</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Maximum file size: 50MB per file</li>
            <li>• Supported formats: JPG, PNG, GIF, MP4, MOV</li>
            <li>• Please use descriptive tags to help others find your content</li>
            <li>• All uploads are reviewed before being published</li>
            <li>• By uploading, you confirm you have permission to share these files</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Upload;