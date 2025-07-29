import React from 'react';

const ChatView = ({ messages }) => {
  return (
    <div id="chat-container" className="flex-1 p-6 overflow-y-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'} mb-4`}
        >
          <div
            className={`max-w-[80%] p-4 rounded-lg ${
              msg.role === 'user' ? 'bg-gray-700' : 'bg-blue-600'
            }`}
          >
            <p>{msg.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};


export default ChatView;