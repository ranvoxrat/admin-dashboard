import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { FileText, Loader2, User } from "lucide-react";
import { useEffect, useRef } from "react";
import { useSearch } from "../hooks/useApi";
import type { ContentStatus } from "../types";

const statusColors: Record<ContentStatus, string> = {
  published: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  draft: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  archived: "bg-muted text-muted-foreground border-border",
};

interface SearchDropdownProps {
  query: string;
  onClose: () => void;
}

export default function SearchDropdown({
  query,
  onClose,
}: SearchDropdownProps) {
  const { data, isFetching } = useSearch(query);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const hasResults =
    (data?.userResults?.length ?? 0) > 0 ||
    (data?.contentResults?.length ?? 0) > 0;

  return (
    <div
      ref={ref}
      data-ocid="search.dropdown"
      className={cn(
        "absolute top-full left-0 right-0 mt-1.5 rounded-lg border border-border",
        "bg-popover shadow-lg z-50 overflow-hidden",
        "animate-fade-in",
      )}
    >
      {isFetching ? (
        <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Searching…
        </div>
      ) : !hasResults ? (
        <div className="px-4 py-3 text-sm text-muted-foreground">
          No results for{" "}
          <span className="font-medium text-foreground">"{query}"</span>
        </div>
      ) : (
        <div className="max-h-[380px] overflow-y-auto divide-y divide-border/50">
          {(data?.userResults?.length ?? 0) > 0 && (
            <section className="py-2">
              <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Users
              </p>
              {data?.userResults.slice(0, 4).map((user, i) => (
                <button
                  type="button"
                  key={user.id}
                  data-ocid={`search.user_result.${i + 1}`}
                  className="flex w-full items-center gap-3 px-3 py-2 text-sm hover:bg-muted/60 transition-colors"
                  onClick={() => {
                    navigate({ to: "/users" });
                    onClose();
                  }}
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sidebar-primary/20 shrink-0">
                    <User className="h-3.5 w-3.5 text-sidebar-primary" />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="truncate font-medium text-foreground">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="ml-auto shrink-0 text-xs capitalize"
                  >
                    {user.role}
                  </Badge>
                </button>
              ))}
            </section>
          )}

          {(data?.contentResults?.length ?? 0) > 0 && (
            <section className="py-2">
              <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Content
              </p>
              {data?.contentResults.slice(0, 4).map((item, i) => (
                <button
                  type="button"
                  key={item.id}
                  data-ocid={`search.content_result.${i + 1}`}
                  className="flex w-full items-center gap-3 px-3 py-2 text-sm hover:bg-muted/60 transition-colors"
                  onClick={() => {
                    navigate({ to: "/content" });
                    onClose();
                  }}
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 shrink-0">
                    <FileText className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <div className="min-w-0 text-left flex-1">
                    <p className="truncate font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      by {item.author}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "ml-auto shrink-0 text-xs px-2 py-0.5 rounded-full border capitalize",
                      statusColors[item.status],
                    )}
                  >
                    {item.status}
                  </span>
                </button>
              ))}
            </section>
          )}
        </div>
      )}
    </div>
  );
}
