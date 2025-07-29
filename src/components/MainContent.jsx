// frontend/src/components/MainContent.jsx
import React, { useState } from 'react';

// This is a simplified concept. You would fetch data based on the sessionId prop.
function MainContent({ sessionId }) {
  const [activeTab, setActiveTab] = useState('preview'); // 'preview', 'jsx', 'css'

  if (!sessionId) {
    return (
      <main className="main-content">
        <div className="welcome-screen">
          <h1>AI Component Playground</h1>
          <p>Select a chat from the sidebar or start a new one.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="chat-view">
        {/* Your chat history messages will be mapped and displayed here */}
      </div>

      <div className="input-area">
        {/* Your textarea and send button will go here */}
      </div>

      <div className="output-area">
        <div className="tabs">
          <button onClick={() => setActiveTab('preview')}>Live Preview</button>
          <button onClick={() => setActiveTab('jsx')}>JSX</button>
          <button onClick={() => setActiveTab('css')}>CSS</button>
        </div>
        <div className="tab-content">
          {activeTab === 'preview' && (
            <div className="preview-content">
              {/* Your <iframe> goes here */}
            </div>
          )}
          {activeTab === 'jsx' && (
            <div className="code-box">
              {/* Your JSX <pre> block goes here */}
            </div>
          )}
          {activeTab === 'css' && (
            <div className="code-box">
              {/* Your CSS <pre> block goes here */}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default MainContent;