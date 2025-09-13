import React, { useState, KeyboardEvent } from 'react';
import { SendIcon } from './icons/SendIcon';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
    const [input, setInput] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSend = () => {
        if (input.trim() && !isLoading) {
            onSendMessage(input);
            setInput('');
            
            setIsSending(true);
            setTimeout(() => setIsSending(false), 600);
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
        <style>{`
            @keyframes fly-away {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) rotate(0deg);
                }
                100% {
                    opacity: 0;
                    transform: translate(50px, -50px) rotate(45deg);
                }
            }
            .animate-fly {
                animation: fly-away 0.6s ease-in-out forwards;
            }
        `}</style>
        <div className="mt-auto pt-4 pb-4 border-t border-gray-800 z-10">
            <div className="relative">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter your prompt idea here..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 pr-14 text-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 resize-none"
                    rows={1}
                    disabled={isLoading}
                    aria-label="Chat input"
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-sky-600 hover:bg-sky-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white transition-colors duration-200"
                    aria-label="Send message"
                >
                   {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                   ) : (
                      <div className={isSending ? 'animate-fly' : ''}>
                        <SendIcon />
                      </div>
                   )}
                </button>
            </div>
        </div>
        </>
    );
};
