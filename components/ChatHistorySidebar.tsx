import React, { useState, useMemo } from 'react';
import { ChatSession } from '../App';
import { SearchIcon } from './icons/SearchIcon';
import { NewChatIcon } from './icons/NewChatIcon';

interface ChatHistorySidebarProps {
    history: ChatSession[];
    isOpen: boolean;
    onSelectChat: (chatId: string) => void;
    onNewChat: () => void;
    activeChatId: string | null;
}

export const ChatHistorySidebar: React.FC<ChatHistorySidebarProps> = ({ history, isOpen, onSelectChat, onNewChat, activeChatId }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredHistory = useMemo(() => {
        if (!searchTerm.trim()) {
            return history;
        }
        return history.filter(chat =>
            chat.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [history, searchTerm]);
    
    return (
        <aside className={`flex-shrink-0 bg-gray-900/80 backdrop-blur-sm border-r border-gray-800 flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'w-80 p-4' : 'w-0 p-0' } overflow-hidden z-10`}>
            <div className="flex-shrink-0">
                 <button
                    onClick={onNewChat}
                    title="Start a new chat"
                    className="w-full mb-4 flex items-center justify-center gap-2 border border-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm hover:bg-gray-800"
                >
                    <NewChatIcon />
                    <span>New Chat</span>
                </button>
                 <h2 className="text-xl font-semibold text-gray-100 mb-4">Chat History</h2>
                 <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search history..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 pl-9 text-gray-300 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <SearchIcon />
                    </div>
                </div>
            </div>
            {filteredHistory.length > 0 ? (
                <div className="flex-grow overflow-y-auto space-y-2 -mr-4 pr-4">
                    {filteredHistory.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => onSelectChat(chat.id)}
                            className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-sm truncate ${
                                activeChatId === chat.id
                                ? 'bg-gray-800 text-white font-semibold'
                                : 'hover:bg-gray-800/70 text-gray-300'
                            }`}
                        >
                            {chat.title}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex-grow flex items-center justify-center text-center">
                    <p className="text-gray-500 text-sm">
                        {searchTerm ? 'No matching chats found.' : 'Your chat history is empty.'}
                    </p>
                </div>
            )}
        </aside>
    );
};