import { useState, useRef } from "react";
import { Send, Paperclip, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (message.trim() || file) {
      onSend(message.trim());
      setMessage("");
      setFile(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="chat-input-container">
        {file && (
          <div className="absolute -top-12 left-3 flex items-center gap-2 px-3 py-1.5 bg-accent rounded-lg text-sm">
            <Paperclip className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground truncate max-w-[200px]">{file.name}</span>
            <button
              onClick={() => setFile(null)}
              className="p-0.5 hover:bg-muted rounded"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        )}
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            adjustTextareaHeight();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about my work..."
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground py-2 scrollbar-thin"
        />
        
        <button
          onClick={handleSubmit}
          disabled={!message.trim() && !file}
          className={cn(
            "p-2 rounded-lg transition-all duration-200",
            message.trim() || file
              ? "bg-primary text-primary-foreground hover:opacity-90"
              : "text-muted-foreground cursor-not-allowed"
          )}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
