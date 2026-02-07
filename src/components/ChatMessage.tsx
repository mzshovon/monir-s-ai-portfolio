import { User, Bot, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import SocialComponent from "./SocialComponent";


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
        <ReactMarkdown
          components={{
            // Bold (**text**)
            strong: ({ children }) => (
              <strong className="font-semibold text-foreground">
                {children}
              </strong>
            ),

            // Bullet points
            ul: ({ children }) => (
              <ul className="list-disc pl-5 space-y-1">
                {children}
              </ul>
            ),

            li: ({ children }) => (
              <li className="leading-relaxed">
                {children}
              </li>
            ),

            // Paragraph spacing
            p: ({ children }) => (
              <p className="leading-relaxed">
                {children}
              </p>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
        <div className="flex items-center gap-2 mt-4">
          {showLinkedIn && (
            <SocialComponent />
          )}
      </div>
      </div>
    </div>
  );
}
