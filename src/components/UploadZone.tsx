import React, { useRef } from 'react';
import { Upload, Image, Video, Plus } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (files: FileList) => void;
  dragActive: boolean;
  setDragActive: (active: boolean) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect, dragActive, setDragActive }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
        dragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileInput}
        className="hidden"
      />
      
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="bg-blue-100 rounded-full p-4">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Drop your files here, or{' '}
            <button
              onClick={openFileDialog}
              className="text-blue-600 underline hover:text-blue-700 transition-colors duration-200"
            >
              browse
            </button>
          </h3>
          <p className="text-gray-600">
            Supports photos (JPG, PNG, GIF) and videos (MP4, MOV) up to 50MB each
          </p>
        </div>

        <div className="flex justify-center space-x-8 pt-4">
          <div className="flex items-center space-x-2 text-gray-500">
            <Image className="h-5 w-5" />
            <span className="text-sm">Photos</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Video className="h-5 w-5" />
            <span className="text-sm">Videos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;