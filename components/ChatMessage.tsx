import React from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';

interface ChatMessageProps {
  role: 'user' | 'model';
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
    const [isCopied, copy] = useCopyToClipboard();

    const isModel = role === 'model';
    const isError = isModel && content.toLowerCase().startsWith('error:');

    const containerClasses = `flex items-start gap-4 ${isModel ? '' : 'justify-end'}`;
    const bubbleClasses = `rounded-xl p-4 max-w-2xl whitespace-pre-wrap font-sans text-base ${
        isModel
            ? `bg-gray-800 text-gray-300`
            : `bg-sky-700 text-sky-50`
    } ${isError ? 'bg-red-900/50 border border-red-500/50 text-red-300' : ''}`;
    
    const icon = isModel ? <BotIcon /> : <UserIcon />;

    return (
        <div className={containerClasses}>
            {isModel && (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center mt-1">
                  {icon}
              </div>
            )}
            <div className={`relative group ${isModel ? 'mr-auto' : 'ml-auto'}`}>
                <div className={bubbleClasses}>
                    {content}
                </div>
                {isModel && !isError && (
                     <button
                        onClick={() => copy(content)}
                        className="absolute top-2 right-2 flex items-center gap-1.5 bg-gray-900/50 backdrop-blur-sm p-1.5 rounded-lg text-gray-300 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 hover:bg-gray-700/50"
                        aria-label="Copy prompt"
                    >
                        {isCopied ? <CheckIcon /> : <CopyIcon />}
                    </button>
                )}
            </div>
            {!isModel && (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center mt-1">
                  {icon}
              </div>
            )}
        </div>
    );
};