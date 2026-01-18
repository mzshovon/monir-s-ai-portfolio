import { User, Info, Briefcase, Mail } from "lucide-react";

interface SuggestionPillsProps {
  onSelect: (section: string) => void;
}

const suggestions = [
  { id: "me", label: "Tell me about yourself", icon: User },
  { id: "about", label: "Your background", icon: Info },
  { id: "doing", label: "What are you working on?", icon: Briefcase },
  { id: "hire", label: "How can I hire you?", icon: Mail },
];

export function SuggestionPills({ onSelect }: SuggestionPillsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          onClick={() => onSelect(suggestion.id)}
          className="suggestion-pill flex items-center gap-2"
        >
          <suggestion.icon className="w-4 h-4 text-primary" />
          <span>{suggestion.label}</span>
        </button>
      ))}
    </div>
  );
}
