import React from 'react';
import { Play, Calendar, Tag, User } from 'lucide-react';

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

interface MediaCardProps {
  item: MediaItem;
  onSelect: (item: MediaItem) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onSelect }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
      onClick={() => onSelect(item)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-square bg-gray-100">
        <img
          src={item.thumbnailUrl}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {item.type === 'video' && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-3">
              <Play className="h-6 w-6 text-gray-800" />
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
        
        {/* Meta Info */}
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(item.uploadDate)}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{item.uploaderName}</span>
          </div>
          
          {item.tags.length > 0 && (
            <div className="flex items-start space-x-1">
              <Tag className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className="text-gray-400 text-xs">+{item.tags.length - 3}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaCard;