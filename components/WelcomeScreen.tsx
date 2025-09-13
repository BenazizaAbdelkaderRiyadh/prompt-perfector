import React from 'react';

interface WelcomeScreenProps {
    onStart: () => void;
    isExiting: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, isExiting }) => {
    return (
        <>
        <style>{`
            @keyframes slide-up-and-fade-out {
                0% {
                    transform: translateY(0);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-50px);
                    opacity: 0;
                }
            }
            .animate-slide-up {
                animation: slide-up-and-fade-out 0.5s ease-out forwards;
            }
        `}</style>
        <div className={`flex flex-col items-center justify-center h-full text-center ${isExiting ? 'animate-slide-up' : ''}`}>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 text-transparent bg-clip-text mb-4">
                Prompt Perfector
            </h1>
            <p className="text-gray-400 mt-2 text-lg md:text-xl max-w-2xl">
                Turn your simple ideas into powerful, detailed prompts. Get the best possible results from any AI model by starting with the perfect prompt.
            </p>
            <button
                onClick={onStart}
                className="mt-8 bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg hover:shadow-sky-500/50"
            >
                Start Chat
            </button>
        </div>
        </>
    );
};