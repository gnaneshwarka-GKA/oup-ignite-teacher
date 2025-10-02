import { useState } from "react";
import { FileText, ClipboardList, BookOpen, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BookOpen },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "assessments", label: "Assessments", icon: ClipboardList },
  { id: "lesson-plans", label: "Lesson Plans", icon: BookOpen },
];

const Sidebar = ({ activeMenu, onMenuChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-card border-r border-border transition-all duration-300 flex flex-col h-full",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hover:bg-muted"
        >
          <ChevronLeft
            className={cn(
              "w-5 h-5 transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onMenuChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-muted text-foreground"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
