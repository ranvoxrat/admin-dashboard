import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
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
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Search,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUsers,
} from "../hooks/useApi";
import type { User, UserRole, UserStatus } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;
const SKELETON_KEYS = [
  "s1",
  "s2",
  "s3",
  "s4",
  "s5",
  "s6",
  "s7",
  "s8",
  "s9",
  "s10",
];

type SortField = "name" | "email" | "joinDate";
type SortDir = "asc" | "desc";

// ─── Style maps ───────────────────────────────────────────────────────────────

const roleStyles: Record<UserRole, string> = {
  admin: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  editor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  viewer: "bg-muted text-muted-foreground border-border",
};

const statusStyles: Record<UserStatus, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  inactive: "bg-destructive/15 text-destructive border-destructive/30",
  suspended: "bg-orange-500/15 text-orange-400 border-orange-500/30",
};

function formatDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function avatarInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// ─── Sort icon ────────────────────────────────────────────────────────────────

function SortIcon({
  field,
  active,
  dir,
}: { field: SortField; active: SortField; dir: SortDir }) {
  if (field !== active)
    return <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />;
  return dir === "asc" ? (
    <ChevronUp className="h-3.5 w-3.5 text-primary" />
  ) : (
    <ChevronDown className="h-3.5 w-3.5 text-primary" />
  );
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <TableRow className="border-border">
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full shrink-0" />
          <Skeleton className="h-4 w-32" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-40" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-16 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-16 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-7 w-16 ml-auto" />
      </TableCell>
    </TableRow>
  );
}

// ─── User form (used in sheet) ────────────────────────────────────────────────

interface UserFormState {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

function UserForm({
  value,
  onChange,
  isNew,
}: {
  value: UserFormState;
  onChange: (v: UserFormState) => void;
  isNew: boolean;
}) {
  return (
    <div className="space-y-5 py-4">
      <div className="space-y-1.5">
        <Label htmlFor="user-name" className="text-sm font-medium">
          Full name
        </Label>
        <Input
          id="user-name"
          data-ocid={isNew ? "users.add_name_input" : "users.edit_name_input"}
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          placeholder="Jane Smith"
          className="bg-background h-9"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="user-email" className="text-sm font-medium">
          Email address
        </Label>
        <Input
          id="user-email"
          type="email"
          data-ocid={isNew ? "users.add_email_input" : "users.edit_email_input"}
          value={value.email}
          onChange={(e) => onChange({ ...value, email: e.target.value })}
          placeholder="jane@example.com"
          className="bg-background h-9"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="user-role" className="text-sm font-medium">
            Role
          </Label>
          <Select
            value={value.role}
            onValueChange={(v) => onChange({ ...value, role: v as UserRole })}
          >
            <SelectTrigger
              id="user-role"
              data-ocid={
                isNew ? "users.add_role_select" : "users.edit_role_select"
              }
              className="bg-background h-9"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="user-status" className="text-sm font-medium">
            Status
          </Label>
          <Select
            value={value.status}
            onValueChange={(v) =>
              onChange({ ...value, status: v as UserStatus })
            }
          >
            <SelectTrigger
              id="user-status"
              data-ocid={
                isNew ? "users.add_status_select" : "users.edit_status_select"
              }
              className="bg-background h-9"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const { data: users, isLoading } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  // Filter state
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");

  // Sort state
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // Pagination
  const [page, setPage] = useState(1);

  // Sheet state
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<UserFormState>({
    name: "",
    email: "",
    role: "viewer",
    status: "active",
  });

  // Delete confirm state
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  // ─── Derived data ───────────────────────────────────────────────────────────

  const filtered = (users ?? [])
    .filter((u) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);
      const matchRole = roleFilter === "all" || u.role === roleFilter;
      const matchStatus = statusFilter === "all" || u.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") cmp = a.name.localeCompare(b.name);
      else if (sortField === "email") cmp = a.email.localeCompare(b.email);
      else if (sortField === "joinDate") cmp = Number(a.joinDate - b.joinDate);
      return sortDir === "asc" ? cmp : -cmp;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // ─── Handlers ───────────────────────────────────────────────────────────────

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  }

  function openAddSheet() {
    setEditingUser(null);
    setForm({ name: "", email: "", role: "viewer", status: "active" });
    setSheetOpen(true);
  }

  function openEditSheet(user: User) {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setSheetOpen(true);
  }

  function handleSave() {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required.");
      return;
    }
    if (editingUser) {
      updateUser.mutate(
        { id: editingUser.id, ...form },
        {
          onSuccess: () => {
            toast.success("User updated successfully.");
            setSheetOpen(false);
          },
          onError: () => toast.error("Failed to update user."),
        },
      );
    } else {
      createUser.mutate(form, {
        onSuccess: () => {
          toast.success("User created successfully.");
          setSheetOpen(false);
        },
        onError: () => toast.error("Failed to create user."),
      });
    }
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    deleteUser.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success(`${deleteTarget.name} has been deleted.`);
        setDeleteTarget(null);
      },
      onError: () => toast.error("Failed to delete user."),
    });
  }

  function clearFilters() {
    setSearch("");
    setRoleFilter("all");
    setStatusFilter("all");
    setPage(1);
  }

  const hasActiveFilters =
    search !== "" || roleFilter !== "all" || statusFilter !== "all";
  const isSaving = createUser.isPending || updateUser.isPending;

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6" data-ocid="users.page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
            Users
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isLoading ? (
              <Skeleton className="h-4 w-28 inline-block" />
            ) : (
              `${users?.length ?? 0} total member${users?.length !== 1 ? "s" : ""}`
            )}
          </p>
        </div>
        <Button
          data-ocid="users.add_button"
          onClick={openAddSheet}
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-card rounded-lg border border-border">
        <div className="relative flex-1 min-w-[180px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            data-ocid="users.search_input"
            placeholder="Search name or email…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9 h-9 bg-background text-sm"
          />
        </div>

        <Select
          value={roleFilter}
          onValueChange={(v) => {
            setRoleFilter(v as UserRole | "all");
            setPage(1);
          }}
        >
          <SelectTrigger
            data-ocid="users.role_filter.select"
            className="h-9 w-[130px] bg-background text-sm"
          >
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v as UserStatus | "all");
            setPage(1);
          }}
        >
          <SelectTrigger
            data-ocid="users.status_filter.select"
            className="h-9 w-[140px] bg-background text-sm"
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            data-ocid="users.clear_filters_button"
            onClick={clearFilters}
            className="h-9 text-muted-foreground hover:text-foreground gap-1.5"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </Button>
        )}

        {hasActiveFilters && !isLoading && (
          <p className="text-xs text-muted-foreground ml-auto">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              {/* Sortable: Name */}
              <TableHead className="w-56">
                <button
                  type="button"
                  data-ocid="users.sort_name.toggle"
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Name
                  <SortIcon field="name" active={sortField} dir={sortDir} />
                </button>
              </TableHead>
              {/* Sortable: Email */}
              <TableHead>
                <button
                  type="button"
                  data-ocid="users.sort_email.toggle"
                  onClick={() => handleSort("email")}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Email
                  <SortIcon field="email" active={sortField} dir={sortDir} />
                </button>
              </TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                Role
              </TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                Status
              </TableHead>
              {/* Sortable: Join Date */}
              <TableHead>
                <button
                  type="button"
                  data-ocid="users.sort_joindate.toggle"
                  onClick={() => handleSort("joinDate")}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Joined
                  <SortIcon field="joinDate" active={sortField} dir={sortDir} />
                </button>
              </TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-semibold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              SKELETON_KEYS.map((k) => <SkeletonRow key={k} />)
            ) : pageRows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  data-ocid="users.empty_state"
                  className="text-center py-16"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <Search className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {hasActiveFilters
                        ? "No users match your filters"
                        : "No users yet"}
                    </p>
                    <p className="text-xs text-muted-foreground max-w-xs">
                      {hasActiveFilters
                        ? "Try adjusting your search or filter criteria."
                        : "Add your first user to get started."}
                    </p>
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-xs"
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              pageRows.map((user, i) => {
                const rowIndex = (currentPage - 1) * PAGE_SIZE + i + 1;
                return (
                  <TableRow
                    key={user.id}
                    data-ocid={`users.item.${rowIndex}`}
                    onClick={() => openEditSheet(user)}
                    className="border-border hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
                          {avatarInitials(user.name)}
                        </div>
                        <span className="font-medium text-sm text-foreground truncate">
                          {user.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex text-xs px-2 py-0.5 rounded-full border capitalize font-medium",
                          roleStyles[user.role],
                        )}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex text-xs px-2 py-0.5 rounded-full border capitalize font-medium",
                          statusStyles[user.status],
                        )}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(user.joinDate)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div
                        className="flex items-center justify-end gap-1"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          data-ocid={`users.edit_button.${rowIndex}`}
                          onClick={() => openEditSheet(user)}
                          className="h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground"
                          aria-label={`Edit ${user.name}`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          data-ocid={`users.delete_button.${rowIndex}`}
                          onClick={() => setDeleteTarget(user)}
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          aria-label={`Delete ${user.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!isLoading && filtered.length > PAGE_SIZE && (
        <div className="flex items-center justify-between px-1">
          <p className="text-xs text-muted-foreground">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–
            {Math.min(currentPage * PAGE_SIZE, filtered.length)} of{" "}
            {filtered.length} users
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              data-ocid="users.pagination_prev"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 bg-card"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground px-3">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              data-ocid="users.pagination_next"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 bg-card"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Add / Edit Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          className="w-full sm:max-w-md bg-card border-l border-border"
          data-ocid="users.sheet"
        >
          <SheetHeader className="pb-2">
            <SheetTitle className="font-display text-lg font-bold">
              {editingUser ? "Edit user" : "Add new user"}
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              {editingUser
                ? `Update details for ${editingUser.name}.`
                : "Fill in the details to create a new user account."}
            </SheetDescription>
          </SheetHeader>

          {/* User details when editing */}
          {editingUser && (
            <div className="flex items-center gap-3 py-4 border-b border-border">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-sm font-bold">
                {avatarInitials(editingUser.name)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">
                  {editingUser.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Member since {formatDate(editingUser.joinDate)}
                </p>
              </div>
            </div>
          )}

          <UserForm
            value={form}
            onChange={setForm}
            isNew={editingUser === null}
          />

          <SheetFooter className="pt-2 gap-2">
            <Button
              variant="outline"
              data-ocid="users.sheet_cancel_button"
              onClick={() => setSheetOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              data-ocid="users.sheet_save_button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSaving
                ? "Saving…"
                : editingUser
                  ? "Save changes"
                  : "Create user"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent data-ocid="users.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete user?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove{" "}
              <span className="font-semibold text-foreground">
                {deleteTarget?.name}
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="users.delete_cancel_button"
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="users.delete_confirm_button"
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteUser.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
