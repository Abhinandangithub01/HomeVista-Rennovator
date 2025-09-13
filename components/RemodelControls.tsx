import React from 'react';
import { STYLE_THEMES, QUICK_SUGGESTIONS } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';

interface RemodelControlsProps {
  modification: string;
  setModification: (value: string) => void;
  styleTheme: string;
  setStyleTheme: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  isReadyToGenerate: boolean;
}

const RemodelControls: React.FC<RemodelControlsProps> = ({
  modification,
  setModification,
  styleTheme,
  setStyleTheme,
  onGenerate,
  isLoading,
  isReadyToGenerate,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="modification" className="block text-sm font-medium text-gray-300 mb-2">
          1. Describe Modifications
        </label>
        <textarea
          id="modification"
          rows={5}
          className="w-full bg-gray-800 border border-gray-600 hover:border-gray-500 rounded-lg text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 p-3"
          placeholder="e.g., 'Change facade color to light gray...'"
          value={modification}
          onChange={(e) => setModification(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Quick Suggestions
        </label>
        <div className="flex flex-wrap gap-2">
            {QUICK_SUGGESTIONS.map((suggestion) => (
                <button
                    key={suggestion.name}
                    onClick={() => setModification(suggestion.prompt)}
                    className="px-3 py-1.5 bg-gray-700/60 hover:bg-gray-700 text-gray-300 rounded-full text-sm transition-colors"
                >
                    {suggestion.name}
                </button>
            ))}
        </div>
      </div>

      <div>
        <label htmlFor="style" className="block text-sm font-medium text-gray-300 mb-2">
          2. Select a Style (Optional)
        </label>
        <select
          id="style"
          className="w-full bg-gray-800 border border-gray-600 hover:border-gray-500 rounded-lg text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          value={styleTheme}
          onChange={(e) => setStyleTheme(e.target.value)}
        >
          {STYLE_THEMES.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>
      
      <button
        onClick={onGenerate}
        disabled={!isReadyToGenerate || isLoading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Remodeling...
          </>
        ) : (
          <>
            <SparklesIcon />
            Generate Vision
          </>
        )}
      </button>
    </div>
  );
};

export default RemodelControls;
