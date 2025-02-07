import React, { useState } from 'react';

// Usar variable de entorno o fallback a localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const ChatTest: React.FC = () => {
  const [messages, setMessages] = useState<{text: string, isBot: boolean}[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamContent, setStreamContent] = useState('');

  const handleSendMessage = async () => {
    if (!messageInput.trim() || isLoading) return;

    setMessages(prev => [...prev, { text: messageInput, isBot: false }]);
    setMessageInput('');
    setIsLoading(true);
    setStreamContent('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/search/generate_custom_response_stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: messageInput }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let text = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          setMessages(prev => [...prev, { text, isBot: true }]);
          break;
        }

        const chunk = decoder.decode(value);
        text += chunk;
        setStreamContent(text);
      }
    } catch (error) {
      setMessages(prev => [...prev, { text: `Error: ${error.message}`, isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col p-4 bg-gray-900 text-white font-roboto">
      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto mb-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`${msg.isBot ? 'text-left' : 'text-right'}`}>
            <pre className="inline-block bg-gray-800 p-3 rounded-lg whitespace-pre-wrap break-words max-w-[80%] border border-gray-700 overflow-x-auto">
              {msg.text}
            </pre>
          </div>
        ))}
        
        {isLoading && streamContent && (
          <div className="text-left">
            <pre className="inline-block bg-gray-800 p-3 rounded-lg whitespace-pre-wrap break-words max-w-[80%] border border-gray-700 overflow-x-auto">
              {streamContent}
            </pre>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <textarea
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message... (Enter to send)"
          className="flex-grow p-2 bg-gray-800 rounded-lg resize-none"
          rows={3}
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={!messageInput.trim() || isLoading}
          className="px-4 bg-blue-600 rounded-lg disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}; 