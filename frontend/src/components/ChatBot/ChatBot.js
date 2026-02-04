import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

export default function ChatBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Welcome! You can search by saying things like "Protein 30 Calories 400 to 600 Fat 15".', type: 'bot' },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSearch = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, type: 'user' }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { text: data.reply, type: 'bot' }]);
      } else {
        setMessages((prev) => [...prev, { text: 'Sorry, no valid reply from the bot.', type: 'bot' }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { text: 'Sorry, something went wrong.', type: 'bot' }]);
    }

    setIsLoading(false);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearChat = () => {
    setMessages([
      { text: 'Welcome! You can search by saying things like "Protein 30 Calories 400 to 600 Fat 15".', type: 'bot' },
    ]);
    setInput('');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      <div className={`chat-toggle-wrapper ${isOpen ? 'open' : ''}`}>
        <button className="chat-toggle-button" onClick={toggleChat}>
          {isOpen ? (
            <span>Close Chat</span>
          ) : (
            <>
              <span>Nutrition Assistant</span>
              <span className="chat-icon">💬</span>
            </>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <h2 className="chatbot-title">Nutrition Assistant</h2>
            <button className="clear-chat-button" onClick={handleClearChat}>
              <span className="clear-icon">🗑️</span>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.type}`}>
                <div className="message-bubble">
                  {msg.type === 'bot' && <span className="bot-icon">🤖</span>}
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message bot">
                <div className="message-bubble typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-container">
            <input
              type="text"
              placeholder='Try: "Protein 25 Calories 300 to 500 Fat 15"'
              className="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="chatbot-button"
              onClick={handleSearch}
              disabled={!input.trim()}
            >
              <span className="search-icon">🔍</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
