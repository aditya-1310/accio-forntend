import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import OutputView from './components/OutputView';
import InputArea from './components/InputArea';

export default function App() {
    // Placeholder state for the generated code.
    const [sessionId, setSessionId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [components, setComponents] = useState([]);

    const [generatedCode, setGeneratedCode] = useState({
        jsx: `import React from "react";

export default function App() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to AI Component Generator</h1>
      <p className="text-gray-300">Ask the AI to build a Tailwind component for you!</p>
    </div>
  );
}`,
        css: ""
    });

    const API_BASE_URL = "http://localhost:3000/api"; // adjust if needed
    const handleNewChat = () => {
        console.log("Starting a new chat session...");
        // Here we would clear the state or create a new session via API
    };

    const handleSelectSession = async (sessionId) => {
        // console.log(`Loading session: ${sessionId}`);
        // Here we would fetch the data for the selected session
        try {
          console.log(`Loading session: ${sessionId}`);

          const res = await fetch(`${API_BASE_URL}/session/${sessionId}`);
          const session = await res.json();

          console.log("Fetched session data:", session);
          setSessionId(sessionId);

        // Update  UI with chatHistory and components
        if (session.success && session.data) {
          const { chatHistory = [], components = [] } = session.data;
          console.log(chatHistory);

          const transformedHistory = chatHistory.map(msg => ({
            role: msg.role || (msg.from === 'ai' ? 'ai' : 'user'),
            content: msg.content
          }));

          setMessages(transformedHistory);
          setComponents(components); // if your backend sends saved components
        }
        } catch (error) {
          console.error("Error loading session:", error);
        }
      };

    const handleSendMessage = async (message) => {
        // console.log("Sending message to AI:", message);
        // Here you would make the API call to your backend
        if (!sessionId) {
              console.warn("No session selected.");
              return;
            }
         try {
            console.log("Sending message to AI:", message);
            setMessages(prev => [...prev, { role: 'user', content: message }]);
            const res = await fetch(`${API_BASE_URL}/generate`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                sessionId,
                userPrompt: message,
              }),
            });
            const apiResponse = await res.json();

              // Support both old { aiContent, newComponent } and new { aiMessage, component } formats
              const aiText = apiResponse.aiMessage || apiResponse.aiContent || "";
              const comp = apiResponse.component || apiResponse.newComponent || { jsx: '', css: '' };

              // Add AI message
              if (aiText) {
                setMessages(prev => [...prev, { role: 'ai', content: aiText }]);
              }

              // Update generated code preview only if jsx exists
              if (comp.jsx) {
                setGeneratedCode({
                  jsx: comp.jsx,
                  css: comp.css || '',
                });

                // Save component for session output history if needed
                setComponents(prev => [...prev, comp]);
              }

          } catch (error) {
            console.error("Error sending message:", error);
          }

    };

    return (
        <div className="flex h-screen bg-gray-800 text-white font-sans">
            <Sidebar onNewChat={handleNewChat} onSelectSession={handleSelectSession} />
            <main className="flex-1 flex flex-col">
                <ChatView messages={messages} />
                <OutputView generatedCode={generatedCode} />
                <InputArea onSendMessage={handleSendMessage} />
            </main>
        </div>
    );
}


