import React, { useState, useEffect } from 'react';
import { Search, Filter, Play, Download, Calendar, Tag } from 'lucide-react';
import MediaCard from '../components/MediaCard';
import Lightbox from '../components/Lightbox';
import FilterPanel from '../components/FilterPanel';

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

const Gallery = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with Google Apps Script API calls
  useEffect(() => {
    // Simulate API call to Google Apps Script
    const fetchMedia = async () => {
      setLoading(true);
      try {
        // This would be replaced with actual Google Apps Script endpoint
        const mockData: MediaItem[] = [
          {
            id: '1',
            type: 'photo',
            title: 'Sports Day 2024',
            url: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
            thumbnailUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=400',
            uploadDate: '2024-01-15',
            category: 'events',
            tags: ['sports', 'competition', 'students'],
            uploaderName: 'Teacher Smith'
          },
          {
            id: '2',
            type: 'photo',
            title: 'Science Fair Projects',
            url: 'https://images.pexels.com/photos/8471919/pexels-photo-8471919.jpeg',
            thumbnailUrl: 'https://images.pexels.com/photos/8471919/pexels-photo-8471919.jpeg?auto=compress&cs=tinysrgb&w=400',
            uploadDate: '2024-01-12',
            category: 'academics',
            tags: ['science', 'projects', 'learning'],
            uploaderName: 'Ms. Johnson'
          },
          {
            id: '3',
            type: 'video',
            title: 'Annual Day Performance',
            url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
            thumbnailUrl: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=400',
            uploadDate: '2024-01-10',
            category: 'events',
            tags: ['performance', 'music', 'dance'],
            uploaderName: 'Principal Davis'
          },
          {
            id: '4',
            type: 'photo',
            title: 'Class Photo - Grade 5',
            url: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
            thumbnailUrl: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400',
            uploadDate: '2024-01-08',
            category: 'classes',
            tags: ['class photo', 'grade 5', 'students'],
            uploaderName: 'Mrs. Wilson'
          },
          {
            id: '5',
            type: 'photo',
            title: 'Library Reading Session',
            url: 'https://images.pexels.com/photos/8471998/pexels-photo-8471998.jpeg',
            thumbnailUrl: 'https://images.pexels.com/photos/8471998/pexels-photo-8471998.jpeg?auto=compress&cs=tinysrgb&w=400',
            uploadDate: '2024-01-05',
            category: 'activities',
            tags: ['reading', 'library', 'education'],
            uploaderName: 'Librarian Brown'
          },
        ];
        
        setMediaItems(mockData);
        setFilteredItems(mockData);
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  useEffect(() => {
    let filtered = mediaItems;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply type filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === activeFilter);
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  }, [searchTerm, activeFilter, selectedCategory, mediaItems]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Photo & Video Gallery
          </h1>
          <p className="text-lg text-gray-600">
            Explore our collection of school memories and special moments.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search photos and videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { key: 'all', label: 'All' },
                { key: 'photo', label: 'Photos' },
                { key: 'video', label: 'Videos' },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeFilter === filter.key
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <FilterPanel
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          )}
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredItems.length} of {mediaItems.length} items
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 rounded-xl aspect-square mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <MediaCard
                    key={item.id}
                    item={item}
                    onSelect={setSelectedItem}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <Lightbox
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Gallery;