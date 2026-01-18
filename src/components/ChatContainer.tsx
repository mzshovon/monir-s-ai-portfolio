import { useState, useRef, useEffect } from "react";
import { ModelDropdown } from "./ModelDropdown";
import { ChatInput } from "./ChatInput";
import { SuggestionPills } from "./SuggestionPills";
import { ChatMessage } from "./ChatMessage";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  showLinkedIn?: boolean;
}

const responses: Record<string, string[]> = {
  me: [
    "Hi! 👋 I'm Md. Moniruzzaman, a Senior Software Engineer L-2 at Brain Station 23 PLC. I'm passionate about building scalable web applications and solving complex problems with elegant code.",
    "Hello there! I'm Moniruzzaman, and I craft digital experiences as a Senior Software Engineer. Currently shaping the future at Brain Station 23 PLC.",
  ],
  about: [
    "With years of experience in software development, I've honed my skills in full-stack development, system design, and team leadership. I believe in writing clean, maintainable code that makes a difference.",
    "My journey in tech has been exciting! From learning my first programming language to leading development teams, every step has been a learning experience.",
  ],
  doing: [
    "Currently, I'm working on enterprise-level applications, microservices architecture, and mentoring junior developers. I'm also exploring AI/ML integrations in web applications.",
    "Right now, I'm focused on building robust backend systems, optimizing application performance, and contributing to open-source projects.",
  ],
  hire: [
    "Interested in working together? I'm always open to discussing exciting opportunities! Feel free to reach out through LinkedIn or email.",
    "Looking for a dedicated engineer? Let's connect! I bring experience, passion, and a commitment to excellence to every project.",
  ],
  default: [
    "Hi! I'm Md. Moniruzzaman, Senior Software Engineer L-2 at Brain Station 23 PLC. Want to connect with me? Click the LinkedIn button below!",
    "Great question! I'm Moniruzzaman, a passionate engineer who loves building things. Let's connect on LinkedIn to discuss more!",
    "Thanks for reaching out! I'm a Senior Software Engineer who enjoys tackling challenging problems. Connect with me on LinkedIn!",
  ],
};

interface ChatContainerProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function ChatContainer({ activeSection, onSectionChange }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedModel, setSelectedModel] = useState("new");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRandomResponse = (section: string): string => {
    const sectionResponses = responses[section] || responses.default;
    return sectionResponses[Math.floor(Math.random() * sectionResponses.length)];
  };

  const handleSend = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getRandomResponse("default"),
        showLinkedIn: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (section: string) => {
    onSectionChange(section);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: section === "me" ? "Tell me about yourself" 
        : section === "about" ? "What's your background?"
        : section === "doing" ? "What are you working on?"
        : "How can I hire you?",
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getRandomResponse(section),
        showLinkedIn: section === "hire",
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center px-4 py-3 border-b border-border">
        <ModelDropdown selectedModel={selectedModel} onModelChange={setSelectedModel} />
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <div className="w-16 h-16 mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-3xl">👋</span>
              </div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Hi, I'm Md. Moniruzzaman
              </h1>
              <p className="text-muted-foreground max-w-md mb-8">
                Senior Software Engineer L-2 at Brain Station 23 PLC. 
                Ask me anything about my work, experience, or how we can collaborate!
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                showLinkedIn={message.showLinkedIn}
              />
            ))
          )}
          {isTyping && (
            <div className="chat-message flex gap-4 py-6 px-4 rounded-2xl bg-card">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-sm">M</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-subtle" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-subtle delay-75" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-subtle delay-150" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 pb-6">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 && (
            <SuggestionPills onSelect={handleSuggestionClick} />
          )}
          <ChatInput onSend={handleSend} disabled={isTyping} />
          <p className="text-center text-xs text-muted-foreground mt-3">
            This is an interactive portfolio. Feel free to explore!
          </p>
        </div>
      </div>
    </div>
  );
}
