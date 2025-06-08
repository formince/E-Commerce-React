import React from 'react';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  currentMin: number;
  currentMax: number;
  onPriceChange: (min: number, max: number) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
  currentMin,
  currentMax,
  onPriceChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Fiyat Aralığı</h3>
        <span className="text-sm text-muted-foreground">
          {currentMin.toLocaleString('tr-TR')}₺ - {currentMax.toLocaleString('tr-TR')}₺
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={currentMin}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value <= currentMax) {
                onPriceChange(value, currentMax);
              }
            }}
            className="w-full accent-primary"
          />
        </div>
        <div>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={currentMax}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= currentMin) {
                onPriceChange(currentMin, value);
              }
            }}
            className="w-full accent-primary"
          />
        </div>
      </div>
    </div>
  );
}; 