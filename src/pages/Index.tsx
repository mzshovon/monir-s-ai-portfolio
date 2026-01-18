import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatContainer } from "@/components/ChatContainer";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("me");

  return (
    <div className="flex min-h-screen w-full bg-background">
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
    </div>
  );
};

export default Index;
