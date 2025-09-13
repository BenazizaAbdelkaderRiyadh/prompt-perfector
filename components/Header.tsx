import React from 'react';
import { SidebarIcon } from './icons/SidebarIcon';

interface HeaderProps {
    onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-gray-950/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-20 flex-shrink-0">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <button
          onClick={onToggleSidebar}
          title="Toggle chat history"
          className="flex-shrink-0 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 p-2 rounded-lg transition duration-200"
        >
          <SidebarIcon />
        </button>
        <div className="text-center flex-grow">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 text-transparent bg-clip-text">
            Prompt Perfector
          </h1>
          <p className="text-gray-400 mt-1 text-sm md:text-base">
            Your conversational prompt engineering assistant.
          </p>
        </div>
        <div className="w-9 h-9"></div>
      </div>
    </header>
  );
};
