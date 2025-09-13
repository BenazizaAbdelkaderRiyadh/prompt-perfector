
import React from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

interface OutputDisplayProps {
  generatedPrompt: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        <div className="h-4 bg-slate-700 rounded w-1/2"></div>
        <div className="h-4 bg-slate-700 rounded w-full mt-6"></div>
        <div className="h-4 bg-slate-700 rounded w-4/5"></div>
    </div>
);


export const OutputDisplay: React.FC<OutputDisplayProps> = ({ generatedPrompt, isLoading, error }) => {
  const [isCopied, copy] = useCopyToClipboard();

  const handleCopy = () => {
    if (generatedPrompt) {
      copy(generatedPrompt);
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 shadow-lg min-h-[396px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-100">Generated Prompt</h2>
        <button
          onClick={handleCopy}
          disabled={!generatedPrompt || isLoading}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-300 font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm"
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <div className="flex-grow bg-slate-900/70 border border-slate-600 rounded-md p-4 whitespace-pre-wrap font-mono text-sm text-slate-300 overflow-y-auto">
        {isLoading && <LoadingSkeleton />}
        {error && <div className="text-red-400">{error}</div>}
        {!isLoading && !error && !generatedPrompt && (
          <div className="text-slate-500 h-full flex items-center justify-center">Your perfected prompt will appear here...</div>
        )}
        {generatedPrompt}
      </div>
    </div>
  );
};
