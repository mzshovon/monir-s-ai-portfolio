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
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-3 mb-6">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          onClick={() => onSelect(suggestion.id)}
          className="suggestion-pill flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2.5"
        >
          <suggestion.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
          <span className="truncate">{suggestion.label}</span>
        </button>
      ))}
    </div>
  );
}
