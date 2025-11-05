
import React, { useRef, useState, useEffect, useCallback } from 'react';

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

const UploadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const CameraIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const CaptureIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12a3 3 0 116 0 3 3 0 01-6 0z" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect, selectedFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);


  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);
  
  // Cleanup effect to stop camera stream when component unmounts or camera closes
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const file = event.dataTransfer.files?.[0];
      if (file && file.type.startsWith('image/')) {
        onFileSelect(file);
      }
  }, [onFileSelect]);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
  };
  
  const handleOpenCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError("Camera is not supported on this browser.");
        return;
    }

    setCameraError(null);
    onFileSelect(null);

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setIsCameraOpen(true);
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
        setStream(stream);
    } catch (err) {
        console.error("Error accessing camera:", err);
        if (err instanceof Error) {
            if (err.name === 'NotAllowedError') {
                setCameraError("Camera access denied. To use this feature, please grant camera permission for this site in your browser's address bar or settings.");
            } else {
                setCameraError(`Error accessing camera: ${err.message}`);
            }
        } else {
            setCameraError("An unknown error occurred while accessing the camera.");
        }
    }
  };

  const handleCloseCamera = () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
    setStream(null);
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
        const context = canvas.getContext('2d');
        if (context) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            
            canvas.toBlob((blob) => {
                if (blob) {
                    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
                    const file = new File([blob], `capture-${timestamp}.jpg`, { type: 'image/jpeg' });
                    onFileSelect(file);
                    handleCloseCamera();
                }
            }, 'image/jpeg', 0.95);
        }
    }
  };

  if (isCameraOpen) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-full bg-black rounded-lg overflow-hidden shadow-lg relative">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto block transform -scale-x-100" />
                <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
            {cameraError && (
                <div className="mt-3 text-sm text-center text-red-400 bg-red-900/50 p-3 rounded-lg">
                    {cameraError}
                </div>
            )}
            <div className="flex items-center justify-center gap-4 mt-4 w-full">
                <button 
                    onClick={handleCapture} 
                    disabled={!!cameraError}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 font-bold bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
                    <CaptureIcon className="w-6 h-6" />
                    Capture Photo
                </button>
                <button 
                    onClick={handleCloseCamera}
                    className="px-5 py-3 font-medium bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors">
                    Cancel
                </button>
            </div>
        </div>
    );
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className="cursor-pointer bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-cyan-500 hover:bg-gray-700"
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="max-h-60 w-auto object-contain rounded-md shadow-lg" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <UploadIcon className="w-12 h-12" />
            <span className="font-semibold">Click to upload, or drag and drop</span>
            <span className="text-sm">PNG, JPG, or WEBP.</span>
          </div>
        )}
      </label>
      {selectedFile && (
          <div className="mt-3 text-sm text-center text-gray-400">
              Selected: <span className="font-medium text-gray-200">{selectedFile.name}</span>
          </div>
      )}

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-600"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">OR</span>
        <div className="flex-grow border-t border-gray-600"></div>
      </div>

      <button
        onClick={handleOpenCamera}
        className="w-full flex items-center justify-center gap-2 px-5 py-2.5 font-medium text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
      >
        <CameraIcon className="w-5 h-5"/>
        Use Camera
      </button>

    </div>
  );
};
