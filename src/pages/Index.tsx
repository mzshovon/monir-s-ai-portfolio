import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatContainer } from "@/components/ChatContainer";
import { MobileHeader } from "@/components/MobileHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("me");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen w-full bg-background">
      {isMobile ? (
        <>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar
                collapsed={false}
                onToggle={() => setMobileMenuOpen(false)}
                activeSection={activeSection}
                onSectionChange={(section) => {
                  setActiveSection(section);
                  setMobileMenuOpen(false);
                }}
              />
            </SheetContent>
          </Sheet>
          <div className="flex-1 flex flex-col">
            <MobileHeader onMenuClick={() => setMobileMenuOpen(true)} />
            <ChatContainer
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </>
      ) : (
        <>
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <ChatContainer
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </>
      )}
    </div>
  );
};

export default Index;
