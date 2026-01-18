import { cn } from "@/lib/utils";

interface ExpertiseBarProps {
  skill: string;
  percentage: number;
  creditsLeft?: number;
}

export function ExpertiseBar({ skill, percentage, creditsLeft }: ExpertiseBarProps) {
  const isMaxed = percentage === 100;
  
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{skill}</span>
        <span className={cn(
          "text-xs",
          isMaxed ? "text-red-400" : "text-muted-foreground"
        )}>
          {isMaxed ? "No credits left" : `${creditsLeft} credits left`}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-500",
            isMaxed ? "bg-red-500" : "bg-primary"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
