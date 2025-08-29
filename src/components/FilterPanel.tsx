import React from 'react';
import { Filter } from 'lucide-react';

interface FilterPanelProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'events', label: 'School Events' },
    { value: 'classes', label: 'Class Photos' },
    { value: 'activities', label: 'Activities' },
    { value: 'academics', label: 'Academic' },
    { value: 'sports', label: 'Sports' },
    { value: 'arts', label: 'Arts & Culture' },
  ];

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <span className="font-medium text-gray-900">Filter by Category</span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;