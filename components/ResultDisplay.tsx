
import React from 'react';

interface ResultDisplayProps {
  isLoading: boolean;
  generatedImage: string | null;
  originalFileName: string;
  selectedStyle: string | null;
}

const DownloadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ShareIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center gap-4 p-8">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
      <h3 className="text-xl font-semibold text-gray-200">Creating your masterpiece...</h3>
      <p className="text-gray-400">The AI is working its magic. This can take a moment.</p>
    </div>
);

const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center text-gray-500 h-full p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 mb-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="font-medium">Your generated image will appear here.</p>
    </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, generatedImage, originalFileName, selectedStyle }) => {
    
    const handleDownload = () => {
        if (!generatedImage) return;
        const link = document.createElement('a');
        link.href = generatedImage;
        const styleName = selectedStyle ? selectedStyle.replace(/\s+/g, '-') : 'styled';
        link.download = `${originalFileName}-${styleName}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const dataURLtoFile = (dataurl: string, filename: string): File | null => {
        const arr = dataurl.split(',');
        if (arr.length < 2) {
            console.error('Invalid data URL');
            return null;
        }
        const mimeMatch = arr[0].match(/:(.*?);/);
        if (!mimeMatch) {
            console.error('Could not parse MIME type from data URL');
            return null;
        }
        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        return new File([blob], filename, { type: mime });
    };

    const handleShare = async () => {
        if (!navigator.share) {
            alert("Sharing is not supported on this browser. Please download the image to share it.");
            return;
        }
        
        if (generatedImage) {
            const styleName = selectedStyle ? selectedStyle.replace(/\s+/g, '-') : 'styled';
            const filename = `${originalFileName}-${styleName}.jpg`;
            let file: File | null = null;
            
            try {
                file = dataURLtoFile(generatedImage, filename);
            } catch(e) {
                console.error("Error creating file for sharing:", e);
            }

            // Attempt to share the file if it was created successfully
            if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        title: 'My AI Artwork',
                        text: 'Check out this artwork I created!',
                        files: [file],
                    });
                    return; // Success!
                } catch (error) {
                    if (error instanceof DOMException && error.name === 'AbortError') {
                        console.log("Share action was cancelled by the user.");
                        return;
                    }
                    console.warn("Sharing file failed, falling back to URL share.", error);
                }
            }

            // Fallback: If file sharing is not supported, not possible, or failed, share the app URL.
            try {
                await navigator.share({
                    title: 'Artistic Photo Style Converter',
                    text: `I just created this ${selectedStyle || 'cool'} artwork! Check out the app.`,
                    url: window.location.href,
                });
            } catch (error) {
                if (error instanceof DOMException && error.name === 'AbortError') {
                    console.log("Share action was cancelled by the user.");
                } else {
                    console.error('Error sharing app URL:', error);
                    alert("Sharing failed. Please download the image to share it manually.");
                }
            }
        }
    };


  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-gray-700/50 rounded-lg p-4 min-h-[300px] sm:min-h-[400px]">
      {isLoading ? (
        <LoadingSpinner />
      ) : generatedImage ? (
        <div className="w-full flex flex-col items-center gap-4">
          <img src={generatedImage} alt="Generated artwork" className="max-w-full max-h-[400px] object-contain rounded-lg shadow-2xl" />
          <div className="flex items-center gap-4 mt-4">
            <button onClick={handleDownload} className="flex items-center gap-2 px-5 py-2.5 font-medium bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors">
                <DownloadIcon className="w-5 h-5" />
                Download
            </button>
            <button onClick={handleShare} className="flex items-center gap-2 px-5 py-2.5 font-medium bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors">
                <ShareIcon className="w-5 h-5" />
                Share
            </button>
          </div>
        </div>
      ) : (
        <Placeholder />
      )}
    </div>
  );
};
