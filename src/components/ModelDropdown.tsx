import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Sparkles, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelDropdownProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const models = [
  { id: "new", label: "New me", icon: Sparkles, description: "Current version with all skills" },
  { id: "old", label: "Old me", icon: Clock, description: "My journey and experience" },
];

export function ModelDropdown({ selectedModel, onModelChange }: ModelDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentModel = models.find((m) => m.id === selectedModel) || models[0];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="model-dropdown"
      >
        <currentModel.icon className="w-4 h-4 text-primary" />
        <span className="font-semibold">{currentModel.label}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 py-2 bg-popover border border-border rounded-xl shadow-xl z-50 animate-fade-in">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => {
                onModelChange(model.id);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors",
                selectedModel === model.id && "bg-accent"
              )}
            >
              <model.icon className="w-5 h-5 text-primary" />
              <div className="flex-1 text-left">
                <div className="font-medium text-foreground">{model.label}</div>
                <div className="text-xs text-muted-foreground">{model.description}</div>
              </div>
              {selectedModel === model.id && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
