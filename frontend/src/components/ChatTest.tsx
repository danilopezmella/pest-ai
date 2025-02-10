import React, { useState, useRef, useEffect } from 'react';
import { ThinkingAnimation } from './ThinkingAnimation';

// Use environment variable or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Utility function to detect iPhone
const isIPhone = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('iphone');
};

export const ChatTest: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{text: string, isBot: boolean}[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamContent, setStreamContent] = useState('');
  const [thinkingStage, setThinkingStage] = useState<'searching' | 'thinking' | null>(null);
  const [isIPhoneDevice] = useState(isIPhone());
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const isNearBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return true;
    
    const threshold = 20; // Reducido para ser más preciso
    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    return distanceFromBottom < threshold;
  };

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    
    // Si el usuario está en el fondo, activamos auto-scroll
    const atBottom = isNearBottom();
    setShouldAutoScroll(atBottom);
    setShowScrollButton(!atBottom);
  };

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth'
    });
    
    setShouldAutoScroll(true);
    setShowScrollButton(false);
  };

  // Scroll to bottom when messages change or stream content updates
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || !shouldAutoScroll) return;

    // Si auto-scroll está activo, seguimos el contenido
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'auto'
    });
  }, [messages, streamContent, shouldAutoScroll]);

  const cleanResponse = (text: string) => {
    // Split into lines, remove first two lines, and join back
    const lines = text.split('\n');
    const remainingLines = lines.slice(2).join('\n');
    
    return remainingLines
      // Remove backticks and excessive whitespace around numbered items
      .replace(/(\d+\.)\s*```\s*\n+\s*/g, '$1 ')
      // Remove remaining backticks and empty lines around them
      .replace(/\n*```\s*\n|\n```\s*\n*/g, '\n')
      // Remove "Direct Answer First:" and similar variations
      .replace(/^\*\*Direct Answer First:?\*\*\s*/gm, '')
      .replace(/^Direct Answer First:?\s*/gm, '')
      // Aggressively remove Question X/X and bullet points
      .replace(/^[•❓🔹]\s*Question \d+\/\d+:?\s*/gmu, '')
      .replace(/^Question \d+\/\d+:?\s*/gm, '')
      .replace(/^[•❓🔹]\s*/gmu, '')
      .replace(/^[•❓🔹]?\s*Question \d+\/\d+:?\s*/gmu, '')
      .replace(/Question \d+\/\d+:?\s*/g, '')
      // Remove separator lines with "Analysis Complete" or "Starting Multi-Question Analysis"
      .replace(/^={2,}\s*(Analysis Complete|Starting Multi-Question Analysis|Moving to Question.*?|🔍.*?)?\s*={2,}$/gm, '')
      // Remove pure separator lines (only = signs, possibly with spaces)
      .replace(/^[=\s]+$/gm, '')
      // Replace multiple consecutive newlines with double newlines
      .replace(/\n{3,}/g, '\n\n')
      // Convert **text** to <strong>text</strong>, including numbers before the text
      .replace(/(\d+[.|)]?\s*)?\*\*(.*?)\*\*/g, '<strong>$1$2</strong>')
      // Convert markdown headers (# to #####) to strong until newline
      .replace(/^#{1,5}\s*([^\n]+)/gm, '<strong>$1</strong>')
      // Remove any remaining bullet points or question marks at the start of lines
      .replace(/^[•❓🔹]\s+/gmu, '')
      // Trim whitespace from start and end
      .trim();
  };

  const handleStreamChunk = React.useCallback((text: string) => {
    const cleanedText = cleanResponse(text);
    setStreamContent(cleanedText);
  }, []);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || isLoading) return;

    setMessages(prev => [...prev, { text: messageInput, isBot: false }]);
    setMessageInput('');
    setIsLoading(true);
    setStreamContent('');
    setThinkingStage('searching');
    setShouldAutoScroll(true);

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

      // Change to thinking stage after 2 seconds
      const thinkingTimer = setTimeout(() => setThinkingStage('thinking'), 2000);

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          clearTimeout(thinkingTimer);
          const cleanedText = cleanResponse(text);
          setMessages(prev => [...prev, { text: cleanedText, isBot: true }]);
          setStreamContent('');
          break;
        }

        const chunk = decoder.decode(value);
        if (chunk) {
          setThinkingStage(null);
          text += chunk;
          const cleanedText = cleanResponse(text);
          setStreamContent(cleanedText);
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { text: `Error: ${error.message}`, isBot: true }]);
    } finally {
      setIsLoading(false);
      setThinkingStage(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-900 text-white font-sans antialiased">
      {/* Header - Hidden on iPhone */}
      {!isIPhoneDevice && (
        <div className="w-full border-b border-gray-800">
          <div className="max-w-screen-xl mx-auto p-4">
            <h1 className="text-4xl font-bold text-[#A855F7] tracking-tight">PEST-AI</h1>
            <p className="text-gray-300 mt-2">Your expert assistant for PEST documentation</p>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div 
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className={`w-full flex justify-center ${isIPhoneDevice ? 'h-[calc(100vh-10rem)]' : 'flex-grow'} overflow-y-auto pt-3`}
      >
        <div className={`${isIPhoneDevice ? 'w-full' : 'max-w-screen-xl w-full px-4'} space-y-4 relative`}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end px-4'} w-full`}>
              <pre className={`text-left inline-block whitespace-pre-wrap break-words font-sans leading-relaxed ${
                msg.isBot 
                  ? `w-full text-gray-200 ${isIPhoneDevice ? 'text-base px-8' : 'text-lg px-4'}` 
                  : `${isIPhoneDevice ? 'text-base px-4 py-2' : 'px-8 py-2'} rounded-lg bg-purple-600`
              }`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            </div>
          ))}
          
          {isLoading && (
            <div className={`w-full relative`}>
              {!streamContent && <ThinkingAnimation stage={thinkingStage} isIPhoneDevice={isIPhoneDevice} />}
              {streamContent && (
                <pre className={`text-left inline-block whitespace-pre-wrap break-words w-full font-sans leading-relaxed text-gray-200 ${isIPhoneDevice ? 'text-base px-8 py-2' : 'text-lg px-4'}`}
                  dangerouslySetInnerHTML={{ __html: streamContent }}
                />
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Floating scroll button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className={`fixed bottom-24 right-4 bg-purple-600 text-white rounded-full p-3 shadow-lg hover:bg-purple-700 transition-all transform hover:scale-110 ${
            isIPhoneDevice ? 'mb-20 right-2' : ''
          }`}
          aria-label="Scroll to bottom"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      )}

      {/* Input Area */}
      <div className={`border-t border-gray-800 ${isIPhoneDevice ? 'pb-8' : ''} w-full`}>
        <div className={`${isIPhoneDevice ? 'w-full p-1' : 'max-w-screen-xl mx-auto p-2'}`}>
          <div className="flex gap-1 px-4">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about PEST..."
              className={`w-full p-2 bg-gray-800 rounded-lg resize-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none font-sans ${
                isIPhoneDevice ? 'text-base' : 'text-lg'
              }`}
              rows={isIPhoneDevice ? 1 : 2}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim() || isLoading}
              className={`${
                isIPhoneDevice 
                  ? 'px-3 py-2 text-base shrink-0' 
                  : 'px-6 py-3 shrink-0'
              } bg-purple-600 rounded-lg disabled:opacity-50 hover:bg-purple-700 transition-colors`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 