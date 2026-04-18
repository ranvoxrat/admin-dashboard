import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  FilePlus,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useContent,
  useCreateContent,
  useDeleteContent,
  useTogglePublish,
  useUpdateContent,
} from "../hooks/useApi";
import type { ContentItem, ContentStatus, ContentType } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

const TYPE_LABELS: Record<ContentType, string> = {
  Blog: "Blog",
  Page: "Page",
  Resource: "Resource",
};

const TYPE_COLORS: Record<ContentType, string> = {
  Blog: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  Page: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Resource: "bg-orange-500/15 text-orange-400 border-orange-500/30",
};

const STATUS_COLORS: Record<ContentStatus, string> = {
  published: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  draft: "bg-muted text-muted-foreground border-border",
  archived: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

const CONTENT_TYPES: ContentType[] = [
  "Blog",
  "Page",
  "Resource",
] as ContentType[];
const CONTENT_STATUSES: ContentStatus[] = ["draft", "published", "archived"];

type SortKey = "title" | "author" | "updatedAt";
type SortDir = "asc" | "desc";
type TypeFilter = "all" | ContentType;
type StatusFilter = "all" | ContentStatus;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  const ms = Number(ts) > 1e15 ? Number(ts) / 1_000_000 : Number(ts);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(ms));
}

function getTypeLabel(ct: string): string {
  return TYPE_LABELS[ct as ContentType] ?? ct;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkeletonRows() {
  const keys = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"];
  return (
    <>
      {keys.map((k) => (
        <TableRow key={k} className="border-border">
          {["a", "b", "c", "d", "e", "f"].map((c) => (
            <TableCell key={c}>
              <Skeleton
                className={cn(
                  "h-4",
                  c === "a" ? "w-48" : c === "f" ? "w-20" : "w-20",
                )}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

function TypeBadge({ type }: { type: string }) {
  const colorClass =
    TYPE_COLORS[type as ContentType] ??
    "bg-muted text-muted-foreground border-border";
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs px-2 py-0.5 rounded-full border font-medium",
        colorClass,
      )}
    >
      {getTypeLabel(type)}
    </span>
  );
}

function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs px-2 py-0.5 rounded-full border capitalize font-medium",
        STATUS_COLORS[status],
      )}
    >
      {status}
    </span>
  );
}

function SortableHead({
  label,
  sortKey,
  activeKey,
  dir,
  onSort,
  className,
}: {
  label: string;
  sortKey: SortKey;
  activeKey: SortKey;
  dir: SortDir;
  onSort: (k: SortKey) => void;
  className?: string;
}) {
  const isActive = activeKey === sortKey;
  return (
    <TableHead
      className={cn(
        "text-muted-foreground text-xs uppercase tracking-wider font-semibold",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        data-ocid={`content.sort_${sortKey}`}
        className={cn(
          "flex items-center gap-1.5 hover:text-foreground transition-colors",
          isActive && "text-foreground",
        )}
      >
        {label}
        <ArrowUpDown
          className={cn(
            "h-3 w-3 transition-opacity",
            isActive ? "opacity-100" : "opacity-40",
            isActive && dir === "asc" ? "rotate-180" : "",
          )}
        />
      </button>
    </TableHead>
  );
}

// ─── Content Form (shared for add & edit) ────────────────────────────────────

interface ContentFormState {
  title: string;
  contentType: ContentType;
  author: string;
  status: ContentStatus;
}

function ContentForm({
  value,
  onChange,
}: {
  value: ContentFormState;
  onChange: (v: ContentFormState) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label
          htmlFor="cf-title"
          className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
        >
          Title
        </Label>
        <Input
          id="cf-title"
          data-ocid="content.form.title_input"
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
          placeholder="Enter a title…"
          className="bg-background"
        />
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="cf-type"
          className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
        >
          Type
        </Label>
        <Select
          value={value.contentType}
          onValueChange={(v) =>
            onChange({ ...value, contentType: v as ContentType })
          }
        >
          <SelectTrigger
            id="cf-type"
            data-ocid="content.form.type_select"
            className="bg-background"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CONTENT_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {getTypeLabel(t)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="cf-author"
          className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
        >
          Author
        </Label>
        <Input
          id="cf-author"
          data-ocid="content.form.author_input"
          value={value.author}
          onChange={(e) => onChange({ ...value, author: e.target.value })}
          placeholder="Author name…"
          className="bg-background"
        />
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="cf-status"
          className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
        >
          Status
        </Label>
        <Select
          value={value.status}
          onValueChange={(v) =>
            onChange({ ...value, status: v as ContentStatus })
          }
        >
          <SelectTrigger
            id="cf-status"
            data-ocid="content.form.status_select"
            className="bg-background"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CONTENT_STATUSES.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// ─── Detail / Edit Sheet ──────────────────────────────────────────────────────

function ContentDetailSheet({
  item,
  open,
  onClose,
}: {
  item: ContentItem;
  open: boolean;
  onClose: () => void;
}) {
  const updateContent = useUpdateContent();
  const togglePublish = useTogglePublish();

  const [form, setForm] = useState<ContentFormState>({
    title: item.title,
    contentType: item.contentType,
    author: item.author,
    status: item.status,
  });

  const isDraft = item.status !== "published";

  const handleSave = () => {
    updateContent.mutate(
      { id: item.id, ...form },
      {
        onSuccess: () => {
          toast.success("Content updated");
          onClose();
        },
        onError: () => toast.error("Failed to save changes"),
      },
    );
  };

  const handleTogglePublish = () => {
    togglePublish.mutate(item.id, {
      onSuccess: () =>
        toast.success(isDraft ? "Published successfully" : "Moved to draft"),
      onError: () => toast.error("Failed to update status"),
    });
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        data-ocid="content.detail_sheet"
        className="w-full sm:max-w-md flex flex-col gap-0 p-0 bg-card"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle className="font-display text-lg font-bold text-foreground line-clamp-2">
            {item.title}
          </SheetTitle>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <TypeBadge type={item.contentType} />
            <StatusBadge status={item.status} />
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Meta */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                Created
              </p>
              <p className="text-foreground font-medium">
                {formatDate(item.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                Last Updated
              </p>
              <p className="text-foreground font-medium">
                {formatDate(item.updatedAt)}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                Author
              </p>
              <p className="text-foreground font-medium">{item.author}</p>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Edit form */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Edit Details
            </p>
            <ContentForm value={form} onChange={setForm} />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border flex flex-col gap-2">
          <Button
            data-ocid="content.sheet.save_button"
            onClick={handleSave}
            disabled={updateContent.isPending}
            className="w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
          >
            {updateContent.isPending ? "Saving…" : "Save Changes"}
          </Button>
          <Button
            data-ocid="content.sheet.toggle_publish_button"
            variant="outline"
            onClick={handleTogglePublish}
            disabled={togglePublish.isPending}
            className={cn(
              "w-full",
              isDraft
                ? "border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
                : "border-amber-500/40 text-amber-400 hover:bg-amber-500/10",
            )}
          >
            {togglePublish.isPending
              ? "Updating…"
              : isDraft
                ? "Publish"
                : "Unpublish"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Add Content Sheet ────────────────────────────────────────────────────────

function AddContentSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const createContent = useCreateContent();
  const [form, setForm] = useState<ContentFormState>({
    title: "",
    contentType: "Blog" as ContentType,
    author: "",
    status: "draft",
  });

  const handleCreate = () => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    createContent.mutate(form, {
      onSuccess: () => {
        toast.success("Content created");
        onClose();
        setForm({
          title: "",
          contentType: "Blog" as ContentType,
          author: "",
          status: "draft",
        });
      },
      onError: () => toast.error("Failed to create content"),
    });
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        data-ocid="content.add_sheet"
        className="w-full sm:max-w-md flex flex-col gap-0 p-0 bg-card"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle className="font-display text-lg font-bold text-foreground">
            New Content
          </SheetTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Fill in the details to create a new content item.
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <ContentForm value={form} onChange={setForm} />
        </div>

        <div className="px-6 py-4 border-t border-border">
          <Button
            data-ocid="content.add_sheet.submit_button"
            onClick={handleCreate}
            disabled={createContent.isPending}
            className="w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
          >
            {createContent.isPending ? "Creating…" : "Create Content"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Delete Dialog ────────────────────────────────────────────────────────────

function DeleteDialog({
  item,
  onDelete,
}: {
  item: ContentItem;
  onDelete: (id: string) => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          data-ocid="content.delete_button"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          aria-label={`Delete ${item.title}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent data-ocid="content.delete_dialog">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete content?</AlertDialogTitle>
          <AlertDialogDescription>
            Permanently delete{" "}
            <span className="font-semibold text-foreground">
              "{item.title}"
            </span>
            . This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-ocid="content.delete_cancel_button">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            data-ocid="content.delete_confirm_button"
            onClick={() => onDelete(item.id)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ContentPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("updatedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const { data: content, isLoading } = useContent();
  const togglePublish = useTogglePublish();
  const deleteContent = useDeleteContent();

  // ── Filter + sort ──────────────────────────────────────────────────────────
  const filtered = (content ?? []).filter((item) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q);
    const matchType = typeFilter === "all" || item.contentType === typeFilter;
    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "title") cmp = a.title.localeCompare(b.title);
    else if (sortKey === "author") cmp = a.author.localeCompare(b.author);
    else cmp = Number(a.updatedAt) - Number(b.updatedAt);
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = sorted.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const handleFilterChange = () => setPage(1);

  const handleTogglePublish = (e: React.MouseEvent, item: ContentItem) => {
    e.stopPropagation();
    togglePublish.mutate(item.id, {
      onSuccess: () =>
        toast.success(
          item.status === "published"
            ? "Moved to draft"
            : "Published successfully",
        ),
      onError: () => toast.error("Failed to update status"),
    });
  };

  const handleDelete = (id: string) => {
    deleteContent.mutate(id, {
      onSuccess: () => toast.success("Content deleted"),
      onError: () => toast.error("Failed to delete content"),
    });
  };

  // ── Counts ─────────────────────────────────────────────────────────────────
  const total = content?.length ?? 0;
  const published =
    content?.filter((c) => c.status === "published").length ?? 0;
  const drafts = content?.filter((c) => c.status === "draft").length ?? 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
            Content
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {total} items · {published} published · {drafts} draft
          </p>
        </div>
        <Button
          data-ocid="content.add_button"
          onClick={() => setAddOpen(true)}
          className="shrink-0 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 h-9"
        >
          <FilePlus className="h-4 w-4 mr-2" />
          Add Content
        </Button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-card rounded-lg border border-border">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            data-ocid="content.search_input"
            placeholder="Search by title or author…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleFilterChange();
            }}
            className="pl-9 h-9 bg-background"
          />
        </div>

        <Separator orientation="vertical" className="h-7 hidden sm:block" />

        {/* Type filter */}
        <Select
          value={typeFilter}
          onValueChange={(v) => {
            setTypeFilter(v as TypeFilter);
            handleFilterChange();
          }}
        >
          <SelectTrigger
            data-ocid="content.type_filter"
            className="h-9 w-36 bg-background text-sm"
          >
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {CONTENT_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {getTypeLabel(t)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status filter */}
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v as StatusFilter);
            handleFilterChange();
          }}
        >
          <SelectTrigger
            data-ocid="content.status_filter"
            className="h-9 w-36 bg-background text-sm"
          >
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {CONTENT_STATUSES.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(typeFilter !== "all" || statusFilter !== "all" || search) && (
          <Button
            variant="ghost"
            size="sm"
            data-ocid="content.clear_filters_button"
            onClick={() => {
              setSearch("");
              setTypeFilter("all");
              setStatusFilter("all");
              setPage(1);
            }}
            className="h-9 text-muted-foreground hover:text-foreground text-xs"
          >
            Clear filters
          </Button>
        )}

        <span className="ml-auto text-xs text-muted-foreground tabular-nums">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <SortableHead
                label="Title"
                sortKey="title"
                activeKey={sortKey}
                dir={sortDir}
                onSort={handleSort}
              />
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-semibold w-24">
                Type
              </TableHead>
              <SortableHead
                label="Author"
                sortKey="author"
                activeKey={sortKey}
                dir={sortDir}
                onSort={handleSort}
                className="w-36"
              />
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-semibold w-28">
                Status
              </TableHead>
              <SortableHead
                label="Last Updated"
                sortKey="updatedAt"
                activeKey={sortKey}
                dir={sortDir}
                onSort={handleSort}
                className="w-36"
              />
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-semibold text-right w-28">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <SkeletonRows />
            ) : paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  data-ocid="content.empty_state"
                  className="text-center py-16 text-muted-foreground text-sm"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-1">
                      <FilePlus className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-foreground text-base">
                      No content found
                    </p>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      {search || typeFilter !== "all" || statusFilter !== "all"
                        ? "Try adjusting your filters or search query."
                        : "Create your first content item to get started."}
                    </p>
                    {!search &&
                      typeFilter === "all" &&
                      statusFilter === "all" && (
                        <Button
                          data-ocid="content.empty_state_add_button"
                          size="sm"
                          className="mt-2 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                          onClick={() => setAddOpen(true)}
                        >
                          <FilePlus className="h-4 w-4 mr-1.5" />
                          Add Content
                        </Button>
                      )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((item, i) => (
                <TableRow
                  key={item.id}
                  data-ocid={`content.item.${(safePage - 1) * PAGE_SIZE + i + 1}`}
                  className="border-border hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <TableCell>
                    <p className="font-medium text-sm text-foreground line-clamp-1 max-w-xs min-w-0">
                      {item.title}
                    </p>
                  </TableCell>
                  <TableCell>
                    <TypeBadge type={item.contentType} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {item.author}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground tabular-nums whitespace-nowrap">
                    {formatDate(item.updatedAt)}
                  </TableCell>
                  <TableCell
                    className="text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        data-ocid={`content.toggle_publish_button.${(safePage - 1) * PAGE_SIZE + i + 1}`}
                        onClick={(e) => handleTogglePublish(e, item)}
                        className={cn(
                          "h-8 w-8",
                          item.status === "published"
                            ? "text-emerald-400 hover:text-amber-400"
                            : "text-muted-foreground hover:text-emerald-400",
                        )}
                        aria-label={
                          item.status === "published" ? "Unpublish" : "Publish"
                        }
                      >
                        {item.status === "published" ? (
                          <EyeOff className="h-3.5 w-3.5" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" />
                        )}
                      </Button>
                      <DeleteDialog item={item} onDelete={handleDelete} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {!isLoading && sorted.length > PAGE_SIZE && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
            <p className="text-xs text-muted-foreground tabular-nums">
              Showing {(safePage - 1) * PAGE_SIZE + 1}–
              {Math.min(safePage * PAGE_SIZE, sorted.length)} of {sorted.length}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                data-ocid="content.pagination_prev"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="h-8 w-8 text-muted-foreground disabled:opacity-30"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground px-2 tabular-nums">
                {safePage} / {totalPages}
              </span>
              <Button
                variant="ghost"
                size="icon"
                data-ocid="content.pagination_next"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="h-8 w-8 text-muted-foreground disabled:opacity-30"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Detail / Edit sheet */}
      {selectedItem && (
        <ContentDetailSheet
          item={selectedItem}
          open={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* Add content sheet */}
      <AddContentSheet open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
