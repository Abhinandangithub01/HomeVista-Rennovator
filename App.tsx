
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import RemodelControls from './components/RemodelControls';
import ResultViewer from './components/ResultViewer';
import Loader from './components/Loader';
import { remodelImage } from './services/geminiService';
import { STYLE_THEMES } from './constants';

function App() {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImageBase64, setOriginalImageBase64] = useState<string | null>(null);
  const [modificationText, setModificationText] = useState<string>('');
  const [styleTheme, setStyleTheme] = useState<string>(STYLE_THEMES[0].id);
  const [generatedImageBase64, setGeneratedImageBase64] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File, base64: string) => {
    setOriginalImageFile(file);
    setOriginalImageBase64(base64);
    setGeneratedImageBase64(null); // Clear previous result on new image upload
    setError(null);
  }, []);

  const handleGenerate = async () => {
    if (!originalImageFile || !originalImageBase64 || !modificationText) {
      setError("Please upload an image and describe the modifications.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageBase64(null);

    const base64Data = originalImageBase64.split(',')[1];
    const selectedStyle = STYLE_THEMES.find(theme => theme.id === styleTheme);

    try {
      const resultBase64 = await remodelImage(
        base64Data,
        originalImageFile.type,
        modificationText,
        selectedStyle?.name || 'None'
      );
      setGeneratedImageBase64(`data:${originalImageFile.type};base64,${resultBase64}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const isReadyToGenerate = !!originalImageFile && modificationText.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {isLoading && <Loader />}
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Controls Column */}
          <div className="flex flex-col space-y-6">
            <ImageUploader 
              onImageUpload={handleImageUpload} 
              imagePreviewUrl={originalImageBase64}
            />
            <RemodelControls
              modification={modificationText}
              setModification={setModificationText}
              styleTheme={styleTheme}
              setStyleTheme={setStyleTheme}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              isReadyToGenerate={isReadyToGenerate}
            />
          </div>

          {/* Results Column */}
          <div className="flex flex-col">
            {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            <ResultViewer 
              originalImage={originalImageBase64} 
              generatedImage={generatedImageBase64}
            />
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Gemini. Visualizations are AI-generated and may not be perfectly accurate.</p>
      </footer>
    </div>
  );
}

export default App;
