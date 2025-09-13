
import React from 'react';
import { GenerateIcon } from './icons/GenerateIcon';

interface InputAreaProps {
  userInput: string;
  setUserInput: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ userInput, setUserInput, onGenerate, isLoading }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 shadow-lg">
      <h2 className="text-xl font-semibold text-slate-100 mb-4">Your Idea</h2>
      <p className="text-slate-400 mb-4 text-sm">
        Describe what you want the AI to do. Be as simple or as complex as you like.
        For example: "write an email to my boss asking for a raise" or "create a fantasy story about a dragon who loves to bake".
      </p>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your prompt idea here..."
        className="w-full h-60 bg-slate-900/70 border border-slate-600 rounded-md p-3 text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 resize-none"
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 disabled:scale-100 shadow-md hover:shadow-cyan-500/50"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <GenerateIcon />
            Perfect My Prompt
          </>
        )}
      </button>
    </div>
  );
};
