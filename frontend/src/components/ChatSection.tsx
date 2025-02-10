import { ScrollArea } from "@/components/ui/scroll-area";
import { BrainCircuit, Send } from "lucide-react";
import { ChatMessage } from "@/components/ChatMessage";
import { LoadingDots } from "@/components/LoadingDots";
import { ThinkingAnimation } from "@/components/ThinkingAnimation";
import { Input } from "@/components/ui/input";

interface ChatSectionProps {
  messages: Array<{ text: string; isBot: boolean }>;
  isLoading: boolean;
  isThinking: boolean;
  onSend: (message: string) => void;
}

const ChatSection: React.FC<ChatSectionProps> = ({ messages, isLoading, isThinking, onSend }) => {
  console.log('🎯 ChatSection rendered with:', {
    messageCount: messages.length,
    messages,  // Log the actual messages array
    isLoading,
    isThinking
  });
  
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.length === 0 ? (
        <div className="h-[calc(100vh-120px)] flex items-center justify-center">
          <div className="flex flex-col items-center max-w-xl w-full px-4">
            <div className="flex items-center gap-6 mb-6">
              <a 
                href="https://marketplace.visualstudio.com/items?itemName=DanielLopezMella.pestd3code"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <img 
                  src="/lovable-uploads/d02bdeeb-e715-4b99-b179-c1d1a6f54eff.png" 
                  alt="Logo" 
                  className="h-11 w-auto"
                />
              </a>
              <h1 className="text-3xl font-semibold text-white">What can I help you with?</h1>
            </div>
            <div className="w-full relative">
              <Input
                className="w-full bg-[#2a2f3c] border-0 focus-visible:ring-0 text-white pl-4 pr-10 py-4 rounded-lg"
                placeholder="Message PestAI..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    const target = e.target as HTMLInputElement;
                    if (target.value.trim()) {
                      onSend(target.value.trim());
                      target.value = '';
                    }
                  }
                }}
              />
              <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => {
                  const input = document.querySelector('input') as HTMLInputElement;
                  if (input.value.trim()) {
                    onSend(input.value.trim());
                    input.value = '';
                  }
                }}
              >
                <Send className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col p-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message.text} isBot={message.isBot} />
          ))}
          {isThinking && (
            <div className="flex justify-start mb-3 px-12">
              <ThinkingAnimation stage={isThinking ? 'thinking' : null} isIPhoneDevice={false} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatSection;