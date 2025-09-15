import React, { useState, useEffect, useCallback } from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultViewerProps {
  originalImage: string | null;
  generatedImage: string | null;
}

interface ImagePanelProps {
    imageUrl: string | null;
    title: string;
    isPlaceholder?: boolean;
    isDownloadable?: boolean;
}

const ImagePanel: React.FC<ImagePanelProps> = ({ imageUrl, title, isPlaceholder = false, isDownloadable = false }) => {
    const [isImageVisible, setIsImageVisible] = useState(false);

    useEffect(() => {
        if (imageUrl) {
            setIsImageVisible(false);
            const image = new Image();
            image.src = imageUrl;
            image.onload = () => {
                setTimeout(() => setIsImageVisible(true), 50);
            };
        } else {
            setIsImageVisible(false);
        }
    }, [imageUrl]);

    const handleDownload = useCallback(() => {
        if (!imageUrl) return;
        const link = document.createElement('a');
        link.href = imageUrl;
        const fileExtension = imageUrl.split(';')[0].split('/')[1] || 'png';
        link.download = `homevista-remodel.${fileExtension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, [imageUrl]);
    
    return (
      <div className="w-full">
        <h3 className="text-lg font-semibold text-center mb-3 text-slate-400">{title}</h3>
        <div className="group aspect-square bg-slate-800/50 rounded-2xl border border-slate-700 flex items-center justify-center overflow-hidden shadow-inner relative">
          {imageUrl ? (
            <>
              <img 
                src={imageUrl} 
                alt={title} 
                className={`w-full h-full object-contain transition-all duration-700 ease-in-out ${isImageVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} 
              />
              {isDownloadable && isImageVisible && (
                 <button 
                    onClick={handleDownload} 
                    className="absolute top-3 right-3 p-2 bg-slate-900/50 backdrop-blur-sm rounded-full text-slate-300 hover:text-white hover:bg-slate-900/80 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Download remodeled image"
                >
                   <DownloadIcon />
                 </button>
              )}
            </>
          ) : (
            <div className="text-center text-slate-500 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-2 text-sm">{isPlaceholder ? "Your AI-remodeled image will appear here." : "Upload an image to get started."}</p>
            </div>
          )}
        </div>
      </div>
    );
};

const ResultViewer: React.FC<ResultViewerProps> = ({ originalImage, generatedImage }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ImagePanel imageUrl={originalImage} title="Before" />
      <ImagePanel 
        imageUrl={generatedImage} 
        title="After" 
        isPlaceholder={true} 
        isDownloadable={!!generatedImage}
      />
    </div>
  );
};

export default ResultViewer;