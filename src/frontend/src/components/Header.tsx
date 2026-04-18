import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Bell, LogOut, Menu, Moon, Search, Sun, User } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useAppStore } from "../store";
import SearchDropdown from "./SearchDropdown";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { identity, isAuthenticated, clear } = useInternetIdentity();
  const { theme, toggleTheme, toggleSidebar } = useAppStore();

  const principalId = identity?.getPrincipal().toText() ?? "";
  const initials = principalId ? principalId.slice(0, 2).toUpperCase() : "AD";

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchQuery(val);
      setShowSearch(val.length >= 3);
    },
    [],
  );

  const handleLogout = useCallback(() => {
    clear();
    toast.success("Logged out successfully");
  }, [clear]);

  const closeSearch = useCallback(() => {
    setShowSearch(false);
    setSearchQuery("");
  }, []);

  return (
    <header
      data-ocid="header.panel"
      className="h-16 border-b border-border bg-card flex items-center gap-4 px-4 lg:px-6 shrink-0"
    >
      {/* Mobile hamburger */}
      <Button
        variant="ghost"
        size="icon"
        data-ocid="header.menu_toggle"
        className="lg:hidden shrink-0 h-9 w-9"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          data-ocid="header.search_input"
          type="search"
          placeholder="Search users, content… (3+ chars)"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => searchQuery.length >= 3 && setShowSearch(true)}
          className={cn(
            "pl-9 h-9 text-sm bg-background border-border",
            "placeholder:text-muted-foreground/60",
            "focus-visible:ring-sidebar-primary/50",
          )}
        />
        {showSearch && (
          <SearchDropdown query={searchQuery} onClose={closeSearch} />
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          data-ocid="header.notifications_button"
          className="h-9 w-9 text-muted-foreground hover:text-foreground relative"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
        </Button>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          data-ocid="header.theme_toggle"
          onClick={toggleTheme}
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

        {/* Avatar / User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              data-ocid="header.user_menu_button"
              className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="User menu"
            >
              <Avatar className="h-8 w-8 border border-border">
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold">Admin User</p>
                {isAuthenticated && (
                  <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                    {principalId}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-ocid="header.profile_button">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              data-ocid="header.logout_button"
              onClick={handleLogout}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
