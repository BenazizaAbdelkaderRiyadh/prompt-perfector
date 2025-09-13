import React, { useRef, useEffect, useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { Message } from '../App';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface ChatWindowProps {
    messages: Message[];
    isLoading: boolean;
}

const LoadingBubble: React.FC = () => (
    <div className="flex justify-start">
        <div className="flex items-start gap-4">
             <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center mt-1">
                <div className="w-5 h-5 text-gray-400 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
                </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 mt-1">
                <div className="flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
);


export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
    const endOfMessagesRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const scrollToBottom = (behavior: 'smooth' | 'auto' = 'smooth') => {
        endOfMessagesRef.current?.scrollIntoView({ behavior });
    };

    const handleScroll = () => {
        const container = chatContainerRef.current;
        if (container) {
            const isScrolledUp = container.scrollHeight - container.scrollTop > container.clientHeight + 100;
            setShowScrollButton(isScrolledUp);
        }
    };

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom('auto');
        }
    }, [messages, isLoading]);

    return (
        <div className="flex-grow overflow-y-auto pr-4 -mr-4 py-8 relative" ref={chatContainerRef} onScroll={handleScroll}>
            {messages.length === 0 && !isLoading && (
                 <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="text-5xl mb-4">✨</div>
                    <h2 className="text-2xl font-bold text-gray-200">Start a new conversation</h2>
                    <p className="text-gray-400 mt-2">What prompt can I perfect for you?</p>
                </div>
            )}
            <div className="space-y-6">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} role={msg.role} content={msg.content} />
                ))}
                {isLoading && <LoadingBubble />}
                <div ref={endOfMessagesRef} />
            </div>
            <div className={`absolute bottom-6 right-0 left-0 flex justify-center transition-opacity duration-300 ${showScrollButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                 <button
                    onClick={() => scrollToBottom()}
                    className="bg-gray-700/50 backdrop-blur-sm text-gray-200 p-2 rounded-full hover:bg-gray-600/70 transition-all"
                    aria-label="Scroll to bottom"
                 >
                    <ChevronDownIcon />
                 </button>
            </div>
        </div>
    );
};