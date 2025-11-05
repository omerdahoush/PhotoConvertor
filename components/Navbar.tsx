import React, { useState } from 'react';
import { MagicWandIcon } from './GenerateButton';

const ShareIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

export const Navbar: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShareApp = async () => {
    const shareData = {
        title: 'Artistic Photo Style Converter',
        text: 'Check out this cool AI-powered app to turn photos into works of art!',
        url: window.location.href,
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') {
                console.log("Share action was cancelled by the user.");
            } else {
                console.error('Error sharing application:', error);
            }
        }
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center gap-3 text-white">
              <div className="p-1.5 bg-cyan-500/20 rounded-md">
                <MagicWandIcon className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="font-bold text-lg hidden sm:inline">Artistic Converter</span>
            </a>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-cyan-400 transition-colors duration-200 font-medium">Creator</a>
            <a href="#" onClick={(e) => {e.preventDefault(); alert('Coming Soon!')}} className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">Gallery</a>
            <a href="#" onClick={(e) => {e.preventDefault(); alert('Coming Soon!')}} className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">About</a>
          </div>

          {/* Share Button */}
          <div>
            <button
              onClick={handleShareApp}
              className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500"
              aria-label="Share this application"
            >
              {copied ? (
                  <>
                      <CheckIcon className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-medium text-gray-200 hidden sm:inline">Copied!</span>
                  </>
              ) : (
                  <>
                      <ShareIcon className="w-5 h-5" />
                      <span className="hidden sm:inline text-sm font-medium">Share App</span>
                  </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};