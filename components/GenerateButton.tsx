
import React from 'react';

export const MagicWandIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" transform="scale(0.8) translate(3 3)"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" transform="rotate(-45 12 12) scale(0.4) translate(25 5)"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 20l2 2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17l1 1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 14l.5 .5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l-2-2" transform="translate(4 4)" />
    </svg>
);


interface GenerateButtonProps {
    onClick: () => void;
    disabled: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-60"
        >
            <MagicWandIcon className="w-7 h-7" />
            <span>Generate Artwork</span>
        </button>
    );
};
