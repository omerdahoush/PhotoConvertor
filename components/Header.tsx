import React from 'react';
import { MagicWandIcon } from './GenerateButton';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-8">
      <div className="inline-flex items-center gap-4">
        <div className="p-2 bg-cyan-500/20 rounded-lg">
            <MagicWandIcon className="w-8 h-8 text-cyan-400" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
          Artistic Photo Style Converter
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
        Turn your photos into stunning works of art. Upload an image, select a style, and let our AI bring your creative vision to life.
      </p>
    </header>
  );
};
