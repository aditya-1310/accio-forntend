import React, { useState, useEffect } from 'react';

// SVG Icon for the logout button
const LogoutIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
    </svg>
);

const Sidebar = ({ onNewChat, onSelectSession }) => {
    

    const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/session/allSession', {
        //   credentials: 'include', // if cookies/session are used
        });
        const result = await response.json();

        if (result.success) {
          const sessions = result.data.map((session) => ({
            id: session._id,
            name: session.sessionName || 'Untitled Session',
          }));
          setChatHistory(sessions);
        } else {
          console.error('Failed to fetch sessions:', result.message);
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);
    
    const [activeSessionId, setActiveSessionId] = useState('1');

    const handleSessionClick = (id) => {
        setActiveSessionId(id);
        onSelectSession(id);
    }

    return (
        <aside className="w-64 bg-[#202123] p-4 flex flex-col flex-shrink-0">
            <button 
                onClick={onNewChat}
                className="w-full text-left p-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors duration-200"
            >
                ➕ New Chat
            </button>
            <div className="mt-4 flex-grow overflow-y-auto pr-2">
                <h2 className="text-sm text-gray-400 font-semibold mb-2">Chat History</h2>
                <ul className="space-y-2">
                    {chatHistory.map(session => (
                        <li 
                            key={session.id}
                            onClick={() => handleSessionClick(session.id)}
                            className={`p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-200 truncate ${session.id === activeSessionId ? 'bg-gray-700/50' : ''}`}
                        >
                            {session.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pt-2 border-t border-gray-700">
                 <button className="w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2">
                    <LogoutIcon />
                    <span>Logout</span>
                 </button>
            </div>
        </aside>
    );
};

export default Sidebar;