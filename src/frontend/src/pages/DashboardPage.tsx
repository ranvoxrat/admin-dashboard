import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  FileText,
  RefreshCw,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { queryKeys, useMetrics } from "../hooks/useApi";

// ─── Weekly mock activity data ─────────────────────────────────────────────────

const WEEKLY_ACTIVITY = [
  { day: "Mon", sessions: 38, content: 12 },
  { day: "Tue", sessions: 52, content: 18 },
  { day: "Wed", sessions: 47, content: 9 },
  { day: "Thu", sessions: 61, content: 22 },
  { day: "Fri", sessions: 55, content: 16 },
  { day: "Sat", sessions: 29, content: 7 },
  { day: "Sun", sessions: 34, content: 11 },
];

// ─── Accent config ─────────────────────────────────────────────────────────────

const accentClasses: Record<"teal" | "orange" | "blue" | "purple", string> = {
  teal: "border-l-[var(--sidebar-primary)]",
  orange: "border-l-accent",
  blue: "border-l-sidebar-primary",
  purple: "border-l-[var(--accent)]",
};

// ─── MetricCard ────────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string;
  change?: number;
  icon: React.ElementType;
  accentColor: "teal" | "orange" | "blue" | "purple";
  href?: string;
}

function MetricCard({
  label,
  value,
  change,
  icon: Icon,
  accentColor,
  href,
}: MetricCardProps) {
  const isPositive = (change ?? 0) >= 0;

  const inner = (
    <div
      className={cn(
        "metric-card border-l-4 group",
        accentClasses[accentColor],
        href && "cursor-pointer hover:border-opacity-100",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            {label}
          </p>
          <p className="text-3xl font-display font-bold text-foreground">
            {value}
          </p>
        </div>
        <div
          className={cn(
            "flex items-center justify-center h-10 w-10 rounded-lg bg-muted/60 transition-colors",
            href && "group-hover:bg-muted",
          )}
        >
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      {change !== undefined && (
        <div className="flex items-center gap-1.5 mt-3">
          {isPositive ? (
            <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
          )}
          <span
            className={cn(
              "text-xs font-medium",
              isPositive ? "text-emerald-400" : "text-destructive",
            )}
          >
            {isPositive ? "+" : ""}
            {Math.abs(change).toFixed(1)}% vs last week
          </span>
        </div>
      )}
      {href && (
        <p className="text-xs text-muted-foreground/60 mt-3 group-hover:text-muted-foreground transition-colors">
          View details →
        </p>
      )}
    </div>
  );

  if (href) {
    return (
      <Link to={href} className="block">
        {inner}
      </Link>
    );
  }
  return inner;
}

function MetricCardSkeleton() {
  return (
    <div className="metric-card border-l-4 border-l-border space-y-3">
      <div className="flex justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

// ─── Error state ───────────────────────────────────────────────────────────────

function MetricsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      data-ocid="dashboard.metrics_error_state"
      className="col-span-full flex flex-col items-center justify-center gap-4 py-12 rounded-lg border border-destructive/30 bg-destructive/5"
    >
      <AlertCircle className="h-8 w-8 text-destructive" />
      <div className="text-center">
        <p className="font-medium text-foreground">Failed to load metrics</p>
        <p className="text-sm text-muted-foreground mt-1">
          Unable to fetch system metrics. Check your connection and try again.
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onRetry}
        data-ocid="dashboard.metrics_retry_button"
      >
        <RefreshCw className="h-3.5 w-3.5 mr-2" />
        Retry
      </Button>
    </div>
  );
}

// ─── Custom tooltip for chart ──────────────────────────────────────────────────

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg text-xs">
      <p className="font-medium text-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

// ─── DashboardPage ─────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const qc = useQueryClient();
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: metrics,
    isLoading: metricsLoading,
    isError: metricsError,
  } = useMetrics();

  function handleRefresh() {
    setIsRefreshing(true);
    qc.invalidateQueries({ queryKey: queryKeys.metrics }).then(() => {
      setLastRefreshed(new Date());
      setIsRefreshing(false);
    });
  }

  const sevenDayChange = metrics?.sevenDayChange ?? 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            System overview and recent activity
          </p>
        </div>

        {/* Quick stats row */}
        <div
          data-ocid="dashboard.quick_stats_row"
          className="flex items-center gap-3 flex-shrink-0"
        >
          <span className="text-xs text-muted-foreground hidden sm:block">
            Last updated:{" "}
            <span className="text-foreground font-medium">
              {lastRefreshed.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            data-ocid="dashboard.refresh_button"
            className="gap-2"
          >
            <RefreshCw
              className={cn("h-3.5 w-3.5", isRefreshing && "animate-spin")}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Metric cards */}
      <div
        data-ocid="dashboard.metrics_section"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {metricsLoading ? (
          ["a", "b", "c", "d"].map((k) => <MetricCardSkeleton key={k} />)
        ) : metricsError ? (
          <MetricsError onRetry={handleRefresh} />
        ) : (
          <>
            <div data-ocid="dashboard.metric_card.1">
              <MetricCard
                label="Total Users"
                value={Number(metrics?.totalUsers ?? 0).toLocaleString()}
                change={sevenDayChange > 0 ? sevenDayChange : undefined}
                icon={Users}
                accentColor="teal"
                href="/users"
              />
            </div>
            <div data-ocid="dashboard.metric_card.2">
              <MetricCard
                label="Active Sessions"
                value={Number(metrics?.activeSessions ?? 0).toLocaleString()}
                icon={Activity}
                accentColor="blue"
              />
            </div>
            <div data-ocid="dashboard.metric_card.3">
              <MetricCard
                label="Content Items"
                value={Number(metrics?.contentItems ?? 0).toLocaleString()}
                icon={FileText}
                accentColor="orange"
                href="/content"
              />
            </div>
            <div data-ocid="dashboard.metric_card.4">
              <MetricCard
                label="7-Day Change"
                value={`${sevenDayChange >= 0 ? "+" : ""}${sevenDayChange.toFixed(1)}%`}
                change={sevenDayChange}
                icon={TrendingUp}
                accentColor={sevenDayChange >= 0 ? "teal" : "orange"}
              />
            </div>
          </>
        )}
      </div>

      {/* Weekly activity chart */}
      <div
        data-ocid="dashboard.activity_chart"
        className="rounded-lg border border-border bg-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-semibold text-foreground">
              Weekly Activity
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Sessions and content items over the past 7 days
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-sidebar-primary" />
              Sessions
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-accent" />
              Content
            </span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={WEEKLY_ACTIVITY} barCategoryGap="30%" barGap={4}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="oklch(var(--border))"
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ fill: "oklch(var(--muted) / 0.4)" }}
            />
            <Bar
              dataKey="sessions"
              name="Sessions"
              fill="oklch(var(--sidebar-primary))"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="content"
              name="Content"
              fill="oklch(var(--accent))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary badges */}
      <div
        data-ocid="dashboard.summary_row"
        className="flex items-center gap-3 flex-wrap"
      >
        <Badge variant="secondary" className="gap-1.5 text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
          {Number(metrics?.activeSessions ?? 0)} active sessions
        </Badge>
        <Badge variant="secondary" className="gap-1.5 text-xs">
          <Users className="h-3 w-3" />
          {Number(metrics?.totalUsers ?? 0).toLocaleString()} total users
        </Badge>
        <Badge variant="secondary" className="gap-1.5 text-xs">
          <FileText className="h-3 w-3" />
          {Number(metrics?.contentItems ?? 0)} content items
        </Badge>
        <span className="ml-auto text-xs text-muted-foreground sm:hidden">
          Updated{" "}
          {lastRefreshed.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
