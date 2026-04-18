import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronLeft,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import { useAppStore } from "../store";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/users", label: "Users", icon: Users },
  { to: "/content", label: "Content", icon: FileText },
];

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ElementType;
  collapsed: boolean;
}

function NavItem({ to, label, icon: Icon, collapsed }: NavItemProps) {
  const routerState = useRouterState();
  const isActive = routerState.location.pathname.startsWith(to);

  const linkContent = (
    <Link
      to={to}
      data-ocid={`sidebar.${label.toLowerCase()}_link`}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive
          ? "bg-sidebar-primary/15 text-sidebar-primary border-l-2 border-sidebar-primary pl-[10px]"
          : "text-sidebar-foreground/70 border-l-2 border-transparent pl-[10px]",
        collapsed && "justify-center px-2 pl-2 border-l-0",
      )}
    >
      <Icon
        className={cn(
          "shrink-0 transition-colors",
          collapsed ? "h-5 w-5" : "h-4 w-4",
          isActive ? "text-sidebar-primary" : "text-sidebar-foreground/60",
        )}
      />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return linkContent;
}

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <TooltipProvider delayDuration={200}>
      <aside
        data-ocid="sidebar.panel"
        className={cn(
          "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-16" : "w-60",
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "flex items-center h-16 border-b border-sidebar-border px-4 shrink-0",
            sidebarCollapsed ? "justify-center px-0" : "gap-3",
          )}
        >
          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-sidebar-primary shrink-0">
            <Zap className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          {!sidebarCollapsed && (
            <span className="font-display font-semibold text-sidebar-foreground text-sm tracking-tight">
              AdminPanel
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              collapsed={sidebarCollapsed}
            />
          ))}
        </nav>

        <Separator className="bg-sidebar-border" />

        {/* Settings + Collapse */}
        <div className="p-2 space-y-0.5">
          {sidebarCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  data-ocid="sidebar.settings_button"
                  className="flex w-full items-center justify-center rounded-md px-2 py-2.5 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
                >
                  <Settings className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          ) : (
            <button
              type="button"
              data-ocid="sidebar.settings_button"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 border-l-2 border-transparent pl-[10px] text-sm font-medium text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
            >
              <Settings className="h-4 w-4 shrink-0" />
              <span>Settings</span>
            </button>
          )}

          <button
            type="button"
            data-ocid="sidebar.collapse_toggle"
            onClick={toggleSidebar}
            className={cn(
              "flex w-full items-center rounded-md px-2 py-2 text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200",
              sidebarCollapsed ? "justify-center" : "gap-3 px-3",
            )}
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                sidebarCollapsed && "rotate-180",
              )}
            />
            {!sidebarCollapsed && <span className="text-xs">Collapse</span>}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
