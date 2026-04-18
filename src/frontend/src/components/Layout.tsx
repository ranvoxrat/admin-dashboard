import { Toaster } from "@/components/ui/sonner";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content */}
        <main
          data-ocid="layout.main"
          className="flex-1 overflow-y-auto bg-background transition-all duration-300"
        >
          <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">{children}</div>
        </main>

        {/* Footer */}
        <footer className="shrink-0 border-t border-border bg-card/50 px-6 py-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AdminPanel. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sidebar-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>

      <Toaster richColors position="top-right" />
    </div>
  );
}
