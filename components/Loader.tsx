import React, { useState, useEffect } from 'react';

const Loader: React.FC = () => {
    const messages = [
        "Consulting with our AI architects...",
        "Applying virtual paint...",
        "Rendering photorealistic details...",
        "Adjusting the lighting...",
        "Finalizing your vision..."
    ];
    
    const [message, setMessage] = useState(messages[0]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fadeInTimer = setTimeout(() => setIsVisible(true), 10);

        const interval = setInterval(() => {
            setMessage(prev => {
                const currentIndex = messages.indexOf(prev);
                const nextIndex = (currentIndex + 1) % messages.length;
                return messages[nextIndex];
            });
        }, 3000);

        return () => {
            clearTimeout(fadeInTimer);
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-20 h-20 border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg mt-6 font-medium transition-opacity duration-500">{message}</p>
        </div>
    );
};

export default Loader;