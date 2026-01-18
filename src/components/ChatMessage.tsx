import { User, Bot, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  showLinkedIn?: boolean;
}

export function ChatMessage({ role, content, showLinkedIn }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "chat-message flex gap-4 py-6 px-4 rounded-2xl",
        role === "assistant" && "bg-card"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
          role === "user" ? "bg-primary/20" : "bg-primary"
        )}
      >
        {role === "user" ? (
          <User className="w-5 h-5 text-primary" />
        ) : (
          <Bot className="w-5 h-5 text-primary-foreground" />
        )}
      </div>
      <div className="flex-1 space-y-3">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">{content}</p>
        {showLinkedIn && (
          <a
            href="https://linkedin.com/in/moniruzzaman"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077B5] hover:bg-[#006699] text-white rounded-lg transition-colors text-sm font-medium"
          >
            <Linkedin className="w-4 h-4" />
            Connect on LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}
