import { Menu } from "lucide-react";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-sidebar md:hidden">
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
      >
        <Menu className="w-5 h-5 text-muted-foreground" />
      </button>
      <span className="text-lg font-semibold text-foreground tracking-tight">
        Portfolio
      </span>
    </header>
  );
}
