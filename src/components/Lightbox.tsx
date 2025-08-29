import React from 'react';
import { X, Download, Calendar, Tag, User } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  url: string;
  thumbnailUrl: string;
  uploadDate: string;
  category: string;
  tags: string[];
  uploaderName: string;
}

interface LightboxProps {
  item: MediaItem;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ item, onClose }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(item.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = item.title + (item.type === 'video' ? '.mp4' : '.jpg');
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-2xl max-w-6xl w-full max-h-full overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-10 p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 truncate mr-4">{item.title}</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownload}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title="Download"
              >
                <Download className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Media Content */}
        <div className="pt-16 pb-24">
          {item.type === 'photo' ? (
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            />
          ) : (
            <video
              src={item.url}
              controls
              className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-6 border-t border-gray-200">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(item.uploadDate)}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <User className="h-4 w-4" />
              <span>{item.uploaderName}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <Tag className="h-4 w-4" />
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className="text-gray-400 text-xs">+{item.tags.length - 3}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;