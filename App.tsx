import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { sendMessage, generateChatTitle } from './services/geminiService';
import { ChatHistorySidebar } from './components/ChatHistorySidebar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { WelcomeScreen } from './components/WelcomeScreen';

export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

const App: React.FC = () => {
  const [chatHistory, setChatHistory] = useLocalStorage<ChatSession[]>('chatHistory', []);
  const [currentChatId, setCurrentChatId] = useLocalStorage<string | null>('currentChatId', null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  
  const [chatState, setChatState] = useState<'welcome' | 'animating-out' | 'chat'>(
    currentChatId ? 'chat' : 'welcome'
  );

  useEffect(() => {
    const activeChat = chatHistory.find(chat => chat.id === currentChatId);
    if (activeChat) {
      setMessages(activeChat.messages);
      setChatState('chat');
    } else {
      setMessages([]);
      setChatState('welcome');
    }
  }, [currentChatId, chatHistory]);

  const handleStartChat = () => {
    setChatState('animating-out');
    setTimeout(() => {
        setChatState('chat');
    }, 500);
  };

  const handleSendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim()) return;

    const userMessage: Message = { role: 'user', content: userInput };
    const messagesWithUserPrompt = [...messages, userMessage];
    
    setMessages(messagesWithUserPrompt);
    setIsLoading(true);

    try {
      const modelResponse = await sendMessage(messagesWithUserPrompt);
      const modelMessage: Message = { role: 'model', content: modelResponse };
      
      const finalMessages = [...messagesWithUserPrompt, modelMessage];
      setMessages(finalMessages);

      let activeChatId = currentChatId;

      if (!activeChatId) {
        const newChatId = `chat_${Date.now()}`;
        const title = await generateChatTitle(userInput);
        const newSession: ChatSession = { id: newChatId, title, messages: finalMessages };
        setChatHistory(prev => [newSession, ...prev]);
        setCurrentChatId(newChatId);
      } else {
        setChatHistory(prev =>
          prev.map(chat =>
            chat.id === activeChatId ? { ...chat, messages: finalMessages } : chat
          )
        );
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? `Error: ${err.message}` : 'An unknown error occurred. Please try again.';
      const errorResponseMessage: Message = { role: 'model', content: errorMessage };
      const finalMessages = [...messagesWithUserPrompt, errorResponseMessage];
      setMessages(finalMessages);
      
      if (currentChatId) {
        setChatHistory(prev =>
          prev.map(chat =>
            chat.id === currentChatId ? { ...chat, messages: finalMessages } : chat
          )
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [messages, currentChatId, setChatHistory, setCurrentChatId]);

  const handleNewChat = useCallback(() => {
    setCurrentChatId(null);
    setMessages([]);
    setChatState('welcome');
  }, [setCurrentChatId]);

  const handleSelectChat = useCallback((chatId: string) => {
      setCurrentChatId(chatId);
  }, [setCurrentChatId]);
  
  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const renderContent = () => {
    if (chatState === 'welcome' || chatState === 'animating-out') {
      return <WelcomeScreen onStart={handleStartChat} isExiting={chatState === 'animating-out'} />;
    }
    return (
      <>
        <ChatWindow messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        <Footer />
      </>
    );
  };

  return (
    <div className="h-screen bg-gray-950 text-gray-200 font-sans flex flex-col overflow-hidden">
      <Header onToggleSidebar={handleToggleSidebar} />
      <div className="flex-grow flex overflow-hidden">
        <ChatHistorySidebar 
          history={chatHistory} 
          isOpen={isSidebarOpen} 
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          activeChatId={currentChatId}
        />
        <main className="flex-grow container mx-auto px-4 w-full flex flex-col overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
