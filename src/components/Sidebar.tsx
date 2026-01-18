import { useState } from "react";
import { User, Info, Briefcase, Mail, ChevronLeft, ChevronRight, Linkedin, Github } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: "me", label: "Me", icon: User },
  { id: "about", label: "About", icon: Info },
  { id: "doing", label: "What I am doing", icon: Briefcase },
  { id: "hire", label: "Hire me", icon: Mail },
];

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function Sidebar({ collapsed, onToggle, activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside
      className={cn(
        "h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-sidebar-border">
        {!collapsed && (
          <span className="text-lg font-semibold text-foreground tracking-tight">
            Portfolio
          </span>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-thin">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "sidebar-item w-full",
              activeSection === item.id && "sidebar-item-active"
            )}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer with Social Links */}
      <div className={cn(
        "p-3 border-t border-sidebar-border",
        collapsed ? "flex flex-col items-center gap-2" : "flex items-center justify-center gap-2"
      )}>
        <a
          href="https://www.linkedin.com/in/zamanshovon/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          title="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="https://x.com/zamanshovon"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          title="X (Twitter)"
        >
          <XIcon />
        </a>
        <a
          href="https://github.com/zamanshovon"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          title="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
    </aside>
  );
}
