import React from 'react';
import { ChevronDown } from 'lucide-react';

export type SortOption = {
  label: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { label: 'Varsayılan Sıralama', value: 'default' },
  { label: 'Fiyat: Düşükten Yükseğe', value: 'price_asc' },
  { label: 'Fiyat: Yüksekten Düşüğe', value: 'price_desc' },
  { label: 'İsim: A-Z', value: 'name_asc' },
  { label: 'İsim: Z-A', value: 'name_desc' },
];

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const SortSelect: React.FC<SortSelectProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full md:w-64 px-4 py-2 pr-8 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all duration-300"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}; 