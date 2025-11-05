
import React from 'react';

interface StyleSelectorProps {
  styles: string[];
  selectedStyle: string | null;
  onStyleSelect: (style: string) => void;
  onLoadMore: () => void;
  isLoadingMore: boolean;
  extraStylesLoaded: boolean;
}

const PlusCircleIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LoadingSpinner: React.FC<{className?: string}> = ({className}) => (
  <div className={`w-6 h-6 border-2 border-dashed rounded-full animate-spin ${className}`}></div>
);

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onStyleSelect, onLoadMore, isLoadingMore, extraStylesLoaded }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {styles.map((style) => {
        const isSelected = style === selectedStyle;
        const imageUrl = `https://picsum.photos/seed/${style.replace(/\s+/g, '')}/200/200`;

        return (
          <button
            key={style}
            onClick={() => onStyleSelect(style)}
            className={`relative group overflow-hidden rounded-lg text-white font-bold p-3 text-center transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50 h-24 ${
              isSelected ? 'ring-4 ring-cyan-500 scale-105 shadow-2xl' : 'ring-2 ring-transparent hover:ring-cyan-500 hover:scale-105'
            }`}
          >
            <img src={imageUrl} alt={style} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300"></div>
            <span className="relative z-10 drop-shadow-lg">{style}</span>
          </button>
        );
      })}

      {!extraStylesLoaded && (
        <button
          onClick={onLoadMore}
          disabled={isLoadingMore}
          className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center gap-2 bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-lg p-3 text-center text-gray-400 transition-all duration-300 hover:border-cyan-500 hover:bg-gray-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 h-24"
        >
          {isLoadingMore ? (
            <>
              <LoadingSpinner className="border-white"/>
              <span className="text-sm font-medium">Loading...</span>
            </>
          ) : (
            <>
              <PlusCircleIcon className="w-8 h-8"/>
              <span className="font-bold">Load More</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};
