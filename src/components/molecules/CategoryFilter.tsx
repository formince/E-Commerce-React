import React from 'react';
import { cn } from '../../lib/utils';

// Kategorileri mock datadan otomatik olarak çıkaralım
const categories = [
  'Tümü',
  'Kalemler',
  'Defterler',
  'Kitaplar',
  'Sanat Malzemeleri',
  'Okul Malzemeleri'
];

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
      <div className="flex space-x-2 min-w-max">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category === 'Tümü' ? null : category)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
              'border border-border/50 backdrop-blur-sm',
              'hover:border-primary/50 hover:bg-primary/5',
              selectedCategory === (category === 'Tümü' ? null : category)
                ? 'bg-primary/10 border-primary/50 text-primary'
                : 'bg-background/50 text-muted-foreground'
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}; 