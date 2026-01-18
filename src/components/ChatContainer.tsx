import { useState, useRef, useEffect } from "react";
import { ModelDropdown } from "./ModelDropdown";
import { ChatInput } from "./ChatInput";
import { SuggestionPills } from "./SuggestionPills";
import { ChatMessage } from "./ChatMessage";
import { ExpertiseBar } from "./ExpertiseBar";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  showLinkedIn?: boolean;
  showExpertise?: boolean;
}

const expertiseData = [
  { skill: "PHP", percentage: 100 },
  { skill: "Laravel", percentage: 100 },
  { skill: "Node.js", percentage: 90, creditsLeft: 10 },
  { skill: "Python", percentage: 90, creditsLeft: 10 },
  { skill: "Golang", percentage: 80, creditsLeft: 20 },
  { skill: "MySQL", percentage: 90, creditsLeft: 10 },
];

const responses: Record<string, string[]> = {
  me: [
    "LANDING",
  ],
  about: [
    "As a Full Stack Lead Web Developer with over 6 years of experience, I excel in both front-end and back-end development. I am dedicated to maximizing development efficiency through continuous innovation and strategic adoption of new technologies. I thrive in collaborative team environments while also adeptly managing independent tasks to successful completion.",
  ],
  doing: [
    "EXPERTISE",
  ],
  hire: [
    "LINKEDIN_REDIRECT",
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
    
    // Handle "hire" - redirect to LinkedIn
    if (section === "hire") {
      window.open("https://www.linkedin.com/in/zamanshovon/", "_blank");
      return;
    }
    
    // Handle "me" - reset to landing page
    if (section === "me") {
      setMessages([]);
      return;
    }
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: section === "about" ? "Tell me about you?"
        : "What are you working on?",
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const responseContent = getRandomResponse(section);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent === "EXPERTISE" ? "Here's my expertise and current skill levels:" : responseContent,
        showExpertise: responseContent === "EXPERTISE",
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
              <div key={message.id}>
                <ChatMessage
                  role={message.role}
                  content={message.content}
                  showLinkedIn={message.showLinkedIn}
                />
                {message.showExpertise && (
                  <div className="mt-4 ml-12 space-y-3 p-4 bg-card rounded-xl border border-border">
                    {expertiseData.map((item) => (
                      <ExpertiseBar
                        key={item.skill}
                        skill={item.skill}
                        percentage={item.percentage}
                        creditsLeft={item.creditsLeft}
                      />
                    ))}
                  </div>
                )}
              </div>
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
