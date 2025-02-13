import React, { useState, useRef, useEffect } from 'react';
import { ThinkingAnimation } from './ThinkingAnimation';
import { RetroText } from './RetroText';

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
  const [messages, setMessages] = useState<{
    text: string, 
    isBot: boolean,
    followUpQuestions?: { question: string; source: { file: string; section: string; } }[]
  }[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamContent, setStreamContent] = useState('');
  const [thinkingStage, setThinkingStage] = useState<'searching' | 'thinking' | null>(null);
  const [isIPhoneDevice] = useState(isIPhone());
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState(52);

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

  useEffect(() => {
    // Process existing messages to extract follow-up questions
    setMessages(prev => prev.map(msg => {
      if (msg.isBot && !msg.followUpQuestions) {
        const { followUpQuestions } = cleanResponse(msg.text);
        return { ...msg, followUpQuestions };
      }
      return msg;
    }));
  }, []); // Run once on component mount

  const cleanResponse = (text: string) => {
    // Extract follow-up questions if they exist in the new format
    const followUpQuestions: { question: string; source: { file: string; section: string; } }[] = [];
    const questionsRegex = /Follow-up Questions:\s*((?:-[^\n]+\([^)]+\)\s*)+)/;
    const questionsMatch = text.match(questionsRegex);

    let processedText = text;
    if (questionsMatch) {
      try {
        // Extract individual questions with their sources
        const questionLines = questionsMatch[1].match(/-\s*([^(]+)\s*\(Source:\s*File:\s*([^,]+),\s*Section:\s*([^)]+)\)/g);
        
        if (questionLines) {
          questionLines.forEach(line => {
            const questionMatch = line.match(/-\s*([^(]+)\s*\(Source:\s*File:\s*([^,]+),\s*Section:\s*([^)]+)\)/);
            if (questionMatch) {
              followUpQuestions.push({
                question: questionMatch[1].trim(),
                source: {
                  file: questionMatch[2].trim(),
                  section: questionMatch[3].trim()
                }
              });
            }
          });
        }

        // Remove the questions section from the text
        processedText = text.replace(/(?:4\.)?\s*\*\*Follow-up Questions:\*\*[\s\S]*?(?=\n\n|$)/, '');
      } catch (e) {
        console.error('Error parsing follow-up questions:', e);
      }
    }

    // Clean up any remaining markdown and extra whitespace
    const cleanedText = processedText
      .replace(/\*\*/g, '')
      .replace(/```[^`]*```/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return {
      cleanedText,
      followUpQuestions
    };
  };

  const handleStreamChunk = React.useCallback((text: string) => {
    // Buscar el inicio y fin del bloque JSON
    const jsonStartIndex = text.indexOf('```json');
    const jsonEndIndex = text.indexOf('```', jsonStartIndex + 6);
    
    // Si encontramos el inicio del JSON pero no el final, no procesar aún
    if (jsonStartIndex !== -1 && jsonEndIndex === -1) {
      // Solo procesar el texto hasta el inicio del JSON
      const cleanText = text.slice(0, jsonStartIndex).trim();
      const { cleanedText } = cleanResponse(cleanText);
      setStreamContent(cleanedText);
      return;
    }
    
    // Si tenemos un bloque JSON completo
    if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
      try {
        // Extraer y procesar el JSON, limpiando espacios extra y caracteres no deseados
        const jsonBlock = text.slice(jsonStartIndex + 6, jsonEndIndex)
          .trim()
          .replace(/^\s+|\s+$/g, '') // Eliminar espacios al inicio y final
          .replace(/\n\s*/g, ''); // Eliminar saltos de línea y espacios después de ellos
        
        // Verificar que el JSON comienza y termina correctamente
        if (!jsonBlock.startsWith('{') || !jsonBlock.endsWith('}')) {
          throw new Error('Invalid JSON format');
        }
        
        const jsonData = JSON.parse(jsonBlock);
        
        if (jsonData.follow_up_questions && Array.isArray(jsonData.follow_up_questions)) {
          setMessages(prev => {
            const newMessages = [...prev];
            if (newMessages.length > 0) {
              const lastMessage = newMessages[newMessages.length - 1];
              lastMessage.followUpQuestions = jsonData.follow_up_questions;
            }
            return newMessages;
          });
        }
        
        // Limpiar el texto eliminando el bloque JSON y su encabezado
        const beforeJson = text.slice(0, jsonStartIndex);
        const afterJson = text.slice(jsonEndIndex + 3);
        const cleanText = (beforeJson + afterJson)
          .replace(/(?:4\.)?\s*\*\*Follow-up Questions:\*\*\s*$/, '')
          .trim();
          
        const { cleanedText } = cleanResponse(cleanText);
        setStreamContent(cleanedText);
      } catch (e) {
        console.error('Error parsing follow-up questions JSON:', e);
        // En caso de error, mostrar el texto sin el JSON
        const cleanText = text.slice(0, jsonStartIndex).trim();
        const { cleanedText } = cleanResponse(cleanText);
        setStreamContent(cleanedText);
      }
    } else {
      // Si no hay JSON, procesar todo el texto normalmente
      const { cleanedText } = cleanResponse(text);
      setStreamContent(cleanedText);
    }
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
      const response = await fetch(`${API_BASE_URL}/api/search/search_gemini`, {
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
          const { cleanedText, followUpQuestions } = cleanResponse(text);
          setMessages(prev => [...prev, { 
            text: cleanedText, 
            isBot: true,
            followUpQuestions 
          }]);
          setStreamContent('');
          break;
        }

        const chunk = decoder.decode(value);
        if (chunk) {
          setThinkingStage(null);
          text += chunk;
          handleStreamChunk(text);
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

  const updateTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = '52px'; // Reset height to recalculate
    const scrollHeight = element.scrollHeight;
    const newHeight = Math.min(scrollHeight, 200);
    setTextareaHeight(newHeight);
  };

  return (
    <div className="min-h-screen bg-[#1e1e2f] text-white flex justify-center font-sans antialiased relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e2f] via-[#1e1e2f] to-[#1e2330] opacity-80" />

      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img 
          src="/icon.png" 
          alt="" 
          className={`select-none opacity-[0.02] ${
            isIPhoneDevice ? 'w-[20rem] h-[20rem]' : 'w-[40rem] h-[40rem]'
          }`}
          style={{ filter: 'grayscale(100%)' }}
        />
      </div>

      {/* Main centered container */}
      <div className="w-[896px] flex flex-col relative z-10">
        {/* Back button - Only show when there are messages */}
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="fixed top-4 left-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-300 transition-all z-30 backdrop-blur-sm"
            aria-label="Back to terminal"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        )}

        {/* Header - Hidden on iPhone */}
        {!isIPhoneDevice && (
          <header className="fixed top-0 left-0 right-0 border-b border-white/10 bg-white/5 backdrop-blur-sm z-20">
            <div className="flex items-center justify-center h-20">
              <div className="flex items-center gap-4">
                <img src="/icon.png" alt="PEST-AI Logo" className="w-16 h-16" />
                <div>
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">PEST-AI</h1>
                  <p className="text-gray-300 text-base">Your expert assistant for PEST documentation</p>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Add padding to account for fixed header */}
        {!isIPhoneDevice && <div className="h-20" />}

        {/* Messages Area */}
        <div 
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className={`flex-grow overflow-y-auto ${
            isIPhoneDevice ? 'h-[calc(100vh-20rem)]' : 'h-[calc(100vh-12.5rem)]'
          } scrollbar-thin scrollbar-thumb-purple-600/50 scrollbar-track-transparent`}
        >
          <div className="px-4 py-4 space-y-4 min-h-full">
            {messages.length === 0 && !isLoading && (
              <div className="h-full flex flex-col items-center justify-center space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-semibold text-gray-200">Welcome to PEST-AI Assistant</h2>
                  <p className="text-gray-400 text-sm">Ask me anything about PEST software and documentation</p>
                </div>
                
                {/* Popular questions */}
                <div className="w-full max-w-lg">
                  <div className="text-sm text-gray-400 mb-2">Popular questions:</div>
                  <button 
                    onClick={() => setMessageInput("What is PEST?")}
                    className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-colors"
                  >
                    <div className="text-purple-400 font-medium">What is PEST?</div>
                    <div className="text-sm text-gray-400 mt-1">Learn about PEST's core functionality and purpose</div>
                  </button>
                </div>
                
                {/* Terminal section */}
                <div className="w-full max-w-lg">
                  <div className="text-sm text-gray-400 mb-2">Why don't you try a keyword?</div>
                  <div className="bg-[#1a1b23]/95 backdrop-blur-sm rounded-xl border border-[#2a2b3d] shadow-2xl overflow-hidden">
                    {/* Terminal header */}
                    <div className="bg-[#2a2b3d] px-2 py-1.5 flex items-center justify-end">
                      <div className="flex gap-0.5">
                        <button className="w-8 h-5 flex items-center justify-center hover:bg-white/5">
                          <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"/>
                          </svg>
                        </button>
                        <button className="w-8 h-5 flex items-center justify-center hover:bg-white/5">
                          <svg className="w-2.5 h-2.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="4" y="4" width="16" height="16" rx="1"/>
                          </svg>
                        </button>
                        <button className="w-8 h-5 flex items-center justify-center hover:bg-red-500">
                          <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Terminal content */}
                    <div className="p-4 space-y-1 font-mono text-base relative text-left">
                      {/* Scanline effect */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.02] to-transparent animate-scan" />
                      {/* CRT flicker */}
                      <div className="absolute inset-0 pointer-events-none bg-white/[0.02] animate-flicker" />
                      
                      <div className="text-green-500 text-left flex items-center">
                        <span>C:\Users\gwm{`>`} pest calibrated</span>
                        <span className="ml-0.5 animate-cursor">|</span>
                      </div>
                      <RetroText 
                        words={[
                          "pcf",
                          "* control data",
                          "RSTFLE PESTMODE",
                          "NPAR NOBS NPARGP NPRIOR NOBSGP",
                          "NTPLFLE NINSFLE PRECIS DPOINT",
                          "RLAMBDA1 RLAMFAC PHIRATSUF PHIREDLAM NUMLAM",
                          "RELPARMAX FACPARMAX FACORIG",
                          "PHIREDSWH",
                          "NOPTMAX PHIREDSTP NPHISTP NPHINORED RELPARSTP NRELPAR",
                          "ICOV ICOR IEIG"
                        ]}
                        className="flex flex-col items-start"
                        onWordClick={(word) => setMessageInput(`What is ${word}?`)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className="space-y-3">
                <div className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} w-full`}>
                  <div className={`max-w-[95%] ${
                    msg.isBot 
                      ? 'bg-white/5 backdrop-blur-sm rounded-2xl rounded-tl-sm text-gray-200' 
                      : 'bg-purple-600 rounded-2xl rounded-tr-sm'
                  } px-6 py-4 shadow-lg`}>
                    <pre className="text-left whitespace-pre-wrap break-words font-sans leading-relaxed text-[15px]"
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                    />
                  </div>
                </div>

                {/* Follow-up questions and feedback for bot messages */}
                {msg.isBot && (
                  <div className="space-y-3 pl-4">
                    {/* Feedback buttons - Always show for bot messages */}
                    <div className="flex gap-2">
                      <button 
                        className="text-sm px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-300 transition-colors"
                        onClick={() => console.log('Helpful')}
                      >
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                          </svg>
                          Helpful
                        </span>
                      </button>
                      <button 
                        className="text-sm px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-300 transition-colors"
                        onClick={() => console.log('Not helpful')}
                      >
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                          </svg>
                          Not helpful
                        </span>
                      </button>
                    </div>

                    {/* Follow-up questions - Only show when they exist */}
                    {msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm text-gray-400">Follow-up questions:</div>
                        <div className="grid gap-2">
                          {msg.followUpQuestions.map((question, qIdx) => (
                            <button 
                              key={qIdx}
                              onClick={() => setMessageInput(question.question)}
                              className="text-left px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-colors group"
                            >
                              <div className="text-purple-400 text-sm group-hover:text-purple-300">{question.question}</div>
                              <div className="text-xs text-gray-500 mt-1 group-hover:text-gray-400">
                                Source: {question.source.section}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start w-full">
                <div className="max-w-[95%] bg-white/5 backdrop-blur-sm rounded-2xl rounded-tl-sm text-gray-200 px-6 py-4 shadow-lg">
                  {!streamContent && <ThinkingAnimation stage={thinkingStage} isIPhoneDevice={isIPhoneDevice} />}
                  {streamContent && (
                    <pre className="text-left whitespace-pre-wrap break-words font-sans leading-relaxed text-[15px]"
                      dangerouslySetInnerHTML={{ __html: streamContent }}
                    />
                  )}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
            {/* Padding div to prevent overlap with input */}
            <div className={isIPhoneDevice ? 'h-40' : 'h-16'} />
          </div>
        </div>

        {/* Input Area */}
        <div className={`${
          isIPhoneDevice 
            ? 'fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#1e1e2f]/80 backdrop-blur-sm pb-5' 
            : 'fixed bottom-0 left-0 right-0 border-t border-white/10 bg-white/5 backdrop-blur-sm z-20'
        }`}>
          <div className={isIPhoneDevice ? 'px-4 pt-4' : 'flex justify-center'}>
            <div className={isIPhoneDevice ? '' : 'w-[896px] px-4 py-4'}>
              <div className="relative h-[52px]">
                <textarea
                  value={messageInput}
                  onChange={(e) => {
                    setMessageInput(e.target.value);
                    updateTextareaHeight(e.target);
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about PEST..."
                  className="w-full p-4 bg-[#1e1e2f]/50 backdrop-blur-sm rounded-2xl resize-none border border-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 outline-none font-sans text-[15px] text-white placeholder-gray-400 absolute bottom-0 left-0 right-0 transition-all overflow-hidden"
                  style={{ 
                    height: `${textareaHeight}px`,
                    transform: `translateY(${-(textareaHeight - 52)}px)`,
                    overflowY: textareaHeight >= 200 ? 'auto' : 'hidden'
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !messageInput.trim()}
                  className="absolute right-3 bottom-1.5 p-2 text-purple-400 hover:text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add padding to account for fixed input area in desktop */}
        {!isIPhoneDevice && <div className="h-24" />}
      </div>

      {/* Floating scroll button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className={`fixed bg-purple-600/90 backdrop-blur-sm text-white rounded-full p-3 shadow-lg hover:bg-purple-700 transition-all transform hover:scale-110 z-20 ${
            isIPhoneDevice ? 'bottom-32 right-2' : 'bottom-24 right-4'
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

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2">
          <div className="w-full h-full bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2">
          <div className="w-full h-full bg-purple-500/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}; 