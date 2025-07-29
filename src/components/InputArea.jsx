import React, { useState } from 'react';

// SVG Icon for the send button
const SendIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
    </svg>
);

const InputArea = ({ onSendMessage }) => {
    const [prompt, setPrompt] = useState('');

    const handleSend = () => {
        if (!prompt.trim()) return;
        onSendMessage(prompt);
        setPrompt('');
    };
    
    return (
        <div className="p-4 border-t-2 border-gray-700 bg-[#202123]">
            <div className="relative">
                <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 pr-16 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Ask the AI to create or modify a component..."
                />
                <button 
                    onClick={handleSend}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-500"
                    disabled={!prompt.trim()}
                >
                    <SendIcon />
                </button>
            </div>
        </div>
    );
};

export default InputArea;