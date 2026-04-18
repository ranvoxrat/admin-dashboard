import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { BarChart3, Shield, Users, Zap } from "lucide-react";
import { useEffect } from "react";
import { useAppStore } from "../store";

const features = [
  {
    icon: BarChart3,
    title: "Real-time metrics",
    desc: "Live session counts and 7-day change tracking",
  },
  {
    icon: Users,
    title: "User management",
    desc: "Full CRUD with role and status controls",
  },
  {
    icon: Shield,
    title: "Secure by default",
    desc: "Internet Identity — no passwords, no data breaches",
  },
];

export default function LoginPage() {
  const { login, isAuthenticated, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();
  const theme = useAppStore((s) => s.theme);

  // Sync theme on login page
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] shrink-0 bg-card border-r border-border p-12">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-sidebar-primary">
            <Zap className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-foreground text-lg tracking-tight">
            AdminPanel
          </span>
        </div>

        <div className="space-y-10">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground leading-tight">
              The control center
              <br />
              <span className="text-sidebar-primary">for your platform</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-base leading-relaxed">
              Manage users, publish content, and monitor system health — all
              from a single, refined interface.
            </p>
          </div>

          <div className="space-y-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-sidebar-primary/15 shrink-0">
                  <Icon className="h-5 w-5 text-sidebar-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} AdminPanel. Built with{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sidebar-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>

      {/* Right panel — login */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-sidebar-primary">
              <Zap className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-foreground text-lg">
              AdminPanel
            </span>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in with your Internet Identity to access the dashboard.
            </p>
          </div>

          {/* Login card */}
          <div
            data-ocid="login.card"
            className="rounded-xl border border-border bg-card p-8 space-y-6 shadow-md"
          >
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border">
              <Shield className="h-5 w-5 text-sidebar-primary shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-foreground">Internet Identity</p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Cryptographic login — no email or password required.
                </p>
              </div>
            </div>

            <Button
              data-ocid="login.submit_button"
              className={cn(
                "w-full h-11 font-semibold text-sm",
                "bg-sidebar-primary text-sidebar-primary-foreground",
                "hover:bg-sidebar-primary/90 transition-all duration-200",
              )}
              onClick={() => login()}
              disabled={isInitializing}
            >
              {isInitializing ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-sidebar-primary-foreground/30 border-t-sidebar-primary-foreground animate-spin" />
                  Connecting…
                </span>
              ) : (
                "Sign in with Internet Identity"
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              First time?{" "}
              <a
                href="https://identity.ic0.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sidebar-primary hover:underline"
              >
                Create an identity
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
