import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="bg-muted/50 border-muted-foreground/20 py-1.5"
        disabled={disabled}
      />
      <Button 
        type="submit" 
        size="icon"
        disabled={disabled || !message.trim()}
        className="bg-primary hover:bg-primary/80 p-2.5"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}