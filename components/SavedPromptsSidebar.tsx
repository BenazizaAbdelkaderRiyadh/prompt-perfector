import React from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

interface SavedPromptsSidebarProps {
    prompts: string[];
    isOpen: boolean;
}

const SavedPromptItem: React.FC<{ prompt: string }> = ({ prompt }) => {
    const [isCopied, copy] = useCopyToClipboard();

    return (
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
            <p className="text-sm text-slate-300 whitespace-pre-wrap font-mono max-h-32 overflow-y-auto mb-3">
                {prompt}
            </p>
            <button
                onClick={() => copy(prompt)}
                className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-2 px-3 rounded-md transition duration-200 text-xs"
            >
                {isCopied ? <CheckIcon /> : <CopyIcon />}
                {isCopied ? 'Copied!' : 'Copy Prompt'}
            </button>
        </div>
    );
};

export const SavedPromptsSidebar: React.FC<SavedPromptsSidebarProps> = ({ prompts, isOpen }) => {
    return (
        <aside className={`flex-shrink-0 bg-slate-900/70 backdrop-blur-sm border-l border-slate-700/50 flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'w-80 p-4' : 'w-0 p-0' } overflow-hidden`}>
            <h2 className="text-xl font-semibold text-slate-100 mb-4 flex-shrink-0">Saved Prompts</h2>
            {prompts.length > 0 ? (
                <div className="flex-grow overflow-y-auto space-y-4 -mr-4 pr-4">
                    {prompts.map((prompt, index) => (
                        <SavedPromptItem key={index} prompt={prompt} />
                    ))}
                </div>
            ) : (
                <div className="flex-grow flex items-center justify-center text-center">
                    <p className="text-slate-500 text-sm">You haven't saved any prompts yet. Click the save icon on a generated prompt to keep it here.</p>
                </div>
            )}
        </aside>
    );
};