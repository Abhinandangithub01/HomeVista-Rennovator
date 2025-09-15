import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File, base64: string) => void;
  imagePreviewUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imagePreviewUrl }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  // FIX: Changed event type from React.DragEvent<HTMLDivElement> to React.DragEvent<HTMLLabelElement> to match the element it's attached to.
  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // FIX: Changed event type from React.DragEvent<HTMLDivElement> to React.DragEvent<HTMLLabelElement> to match the element it's attached to.
  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  // FIX: Changed event type from React.DragEvent<HTMLDivElement> to React.DragEvent<HTMLLabelElement> to match the element it's attached to.
  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // FIX: Changed event type from React.DragEvent<HTMLDivElement> to React.DragEvent<HTMLLabelElement> to match the element it's attached to.
  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  return (
    <div className="group bg-slate-800/50 p-6 rounded-2xl border-2 border-dashed border-slate-700 transition-all duration-300 hover:border-indigo-600">
      <label 
        htmlFor="image-upload" 
        className="cursor-pointer"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${isDragging ? 'bg-indigo-500/10' : ''}`}>
          {imagePreviewUrl ? (
            <img src={imagePreviewUrl} alt="Preview" className="max-h-60 w-auto rounded-lg object-contain shadow-lg" />
          ) : (
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-sm text-slate-400">
                <span className="font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-slate-500">PNG, JPG, WEBP up to 10MB</p>
            </div>
          )}
        </div>
      </label>
      <input
        id="image-upload"
        name="image-upload"
        type="file"
        className="sr-only"
        accept="image/png, image/jpeg, image/webp"
        onChange={(e) => handleFileChange(e.target.files)}
      />
    </div>
  );
};

export default ImageUploader;