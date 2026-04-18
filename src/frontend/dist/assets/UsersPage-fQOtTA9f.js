import { c as createLucideIcon, h as useUsers, k as useCreateUser, l as useUpdateUser, m as useDeleteUser, r as reactExports, j as jsxRuntimeExports, S as Skeleton, B as Button, n as Search, I as Input, e as cn, C as ChevronLeft, o as ue } from "./index-CXdAsnTn.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, X, T as Table, e as TableHeader, f as TableRow, g as TableHead, h as TableBody, i as TableCell, j as Trash2, C as ChevronRight, k as Sheet, l as SheetContent, m as SheetHeader, n as SheetTitle, o as SheetDescription, p as SheetFooter, A as AlertDialog, q as AlertDialogContent, r as AlertDialogHeader, s as AlertDialogTitle, t as AlertDialogDescription, u as AlertDialogFooter, v as AlertDialogCancel, w as AlertDialogAction, x as ArrowUpDown, y as ChevronUp, z as ChevronDown, L as Label } from "./table-DHzQ6iRV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
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
  "s10"
];
const roleStyles = {
  admin: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  editor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  viewer: "bg-muted text-muted-foreground border-border"
};
const statusStyles = {
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  inactive: "bg-destructive/15 text-destructive border-destructive/30",
  suspended: "bg-orange-500/15 text-orange-400 border-orange-500/30"
};
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function avatarInitials(name) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function SortIcon({
  field,
  active,
  dir
}) {
  if (field !== active)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-3.5 w-3.5 opacity-40" });
  return dir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3.5 w-3.5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 text-primary" });
}
function SkeletonRow() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16 ml-auto" }) })
  ] });
}
function UserForm({
  value,
  onChange,
  isNew
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "user-name", className: "text-sm font-medium", children: "Full name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "user-name",
          "data-ocid": isNew ? "users.add_name_input" : "users.edit_name_input",
          value: value.name,
          onChange: (e) => onChange({ ...value, name: e.target.value }),
          placeholder: "Jane Smith",
          className: "bg-background h-9"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "user-email", className: "text-sm font-medium", children: "Email address" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "user-email",
          type: "email",
          "data-ocid": isNew ? "users.add_email_input" : "users.edit_email_input",
          value: value.email,
          onChange: (e) => onChange({ ...value, email: e.target.value }),
          placeholder: "jane@example.com",
          className: "bg-background h-9"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "user-role", className: "text-sm font-medium", children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: value.role,
            onValueChange: (v) => onChange({ ...value, role: v }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "user-role",
                  "data-ocid": isNew ? "users.add_role_select" : "users.edit_role_select",
                  className: "bg-background h-9",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "admin", children: "Admin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "editor", children: "Editor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "viewer", children: "Viewer" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "user-status", className: "text-sm font-medium", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: value.status,
            onValueChange: (v) => onChange({ ...value, status: v }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "user-status",
                  "data-ocid": isNew ? "users.add_status_select" : "users.edit_status_select",
                  className: "bg-background h-9",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inactive", children: "Inactive" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "suspended", children: "Suspended" })
              ] })
            ]
          }
        )
      ] })
    ] })
  ] });
}
function UsersPage() {
  const { data: users, isLoading } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const [search, setSearch] = reactExports.useState("");
  const [roleFilter, setRoleFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [sortField, setSortField] = reactExports.useState("name");
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const [page, setPage] = reactExports.useState(1);
  const [sheetOpen, setSheetOpen] = reactExports.useState(false);
  const [editingUser, setEditingUser] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    role: "viewer",
    status: "active"
  });
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const filtered = (users ?? []).filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  }).sort((a, b) => {
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
    currentPage * PAGE_SIZE
  );
  function handleSort(field) {
    if (sortField === field) {
      setSortDir((d) => d === "asc" ? "desc" : "asc");
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
  function openEditSheet(user) {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setSheetOpen(true);
  }
  function handleSave() {
    if (!form.name.trim() || !form.email.trim()) {
      ue.error("Name and email are required.");
      return;
    }
    if (editingUser) {
      updateUser.mutate(
        { id: editingUser.id, ...form },
        {
          onSuccess: () => {
            ue.success("User updated successfully.");
            setSheetOpen(false);
          },
          onError: () => ue.error("Failed to update user.")
        }
      );
    } else {
      createUser.mutate(form, {
        onSuccess: () => {
          ue.success("User created successfully.");
          setSheetOpen(false);
        },
        onError: () => ue.error("Failed to create user.")
      });
    }
  }
  function handleConfirmDelete() {
    if (!deleteTarget) return;
    deleteUser.mutate(deleteTarget.id, {
      onSuccess: () => {
        ue.success(`${deleteTarget.name} has been deleted.`);
        setDeleteTarget(null);
      },
      onError: () => ue.error("Failed to delete user.")
    });
  }
  function clearFilters() {
    setSearch("");
    setRoleFilter("all");
    setStatusFilter("all");
    setPage(1);
  }
  const hasActiveFilters = search !== "" || roleFilter !== "all" || statusFilter !== "all";
  const isSaving = createUser.isPending || updateUser.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "users.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground tracking-tight", children: "Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28 inline-block" }) : `${(users == null ? void 0 : users.length) ?? 0} total member${(users == null ? void 0 : users.length) !== 1 ? "s" : ""}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "users.add_button",
          onClick: openAddSheet,
          className: "bg-primary text-primary-foreground hover:bg-primary/90 h-9 gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
            "Add User"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 p-4 bg-card rounded-lg border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px] max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "users.search_input",
            placeholder: "Search name or email…",
            value: search,
            onChange: (e) => {
              setSearch(e.target.value);
              setPage(1);
            },
            className: "pl-9 h-9 bg-background text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: roleFilter,
          onValueChange: (v) => {
            setRoleFilter(v);
            setPage(1);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                "data-ocid": "users.role_filter.select",
                className: "h-9 w-[130px] bg-background text-sm",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Role" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All roles" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "admin", children: "Admin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "editor", children: "Editor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "viewer", children: "Viewer" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: statusFilter,
          onValueChange: (v) => {
            setStatusFilter(v);
            setPage(1);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                "data-ocid": "users.status_filter.select",
                className: "h-9 w-[140px] bg-background text-sm",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All statuses" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inactive", children: "Inactive" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "suspended", children: "Suspended" })
            ] })
          ]
        }
      ),
      hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          "data-ocid": "users.clear_filters_button",
          onClick: clearFilters,
          className: "h-9 text-muted-foreground hover:text-foreground gap-1.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
            "Clear"
          ]
        }
      ),
      hasActiveFilters && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground ml-auto", children: [
        filtered.length,
        " result",
        filtered.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-56", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "users.sort_name.toggle",
            onClick: () => handleSort("name"),
            className: "flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-muted-foreground hover:text-foreground transition-colors",
            children: [
              "Name",
              /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { field: "name", active: sortField, dir: sortDir })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "users.sort_email.toggle",
            onClick: () => handleSort("email"),
            className: "flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-muted-foreground hover:text-foreground transition-colors",
            children: [
              "Email",
              /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { field: "email", active: sortField, dir: sortDir })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground text-xs uppercase tracking-wider font-semibold", children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground text-xs uppercase tracking-wider font-semibold", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "users.sort_joindate.toggle",
            onClick: () => handleSort("joinDate"),
            className: "flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-muted-foreground hover:text-foreground transition-colors",
            children: [
              "Joined",
              /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { field: "joinDate", active: sortField, dir: sortDir })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground text-xs uppercase tracking-wider font-semibold text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRow, {}, k)) : pageRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TableCell,
        {
          colSpan: 6,
          "data-ocid": "users.empty_state",
          className: "text-center py-16",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: hasActiveFilters ? "No users match your filters" : "No users yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs", children: hasActiveFilters ? "Try adjusting your search or filter criteria." : "Add your first user to get started." }),
            hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: clearFilters,
                className: "text-xs",
                children: "Clear filters"
              }
            )
          ] })
        }
      ) }) : pageRows.map((user, i) => {
        const rowIndex = (currentPage - 1) * PAGE_SIZE + i + 1;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `users.item.${rowIndex}`,
            onClick: () => openEditSheet(user),
            className: "border-border hover:bg-muted/30 transition-colors cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold", children: avatarInitials(user.name) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground truncate", children: user.name })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: user.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "inline-flex text-xs px-2 py-0.5 rounded-full border capitalize font-medium",
                    roleStyles[user.role]
                  ),
                  children: user.role
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "inline-flex text-xs px-2 py-0.5 rounded-full border capitalize font-medium",
                    statusStyles[user.status]
                  ),
                  children: user.status
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: formatDate(user.joinDate) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-end gap-1",
                  onClick: (e) => e.stopPropagation(),
                  onKeyDown: (e) => e.stopPropagation(),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        "data-ocid": `users.edit_button.${rowIndex}`,
                        onClick: () => openEditSheet(user),
                        className: "h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground",
                        "aria-label": `Edit ${user.name}`,
                        children: "Edit"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        "data-ocid": `users.delete_button.${rowIndex}`,
                        onClick: () => setDeleteTarget(user),
                        className: "h-7 w-7 text-muted-foreground hover:text-destructive",
                        "aria-label": `Delete ${user.name}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                      }
                    )
                  ]
                }
              ) })
            ]
          },
          user.id
        );
      }) })
    ] }) }),
    !isLoading && filtered.length > PAGE_SIZE && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Showing ",
        (currentPage - 1) * PAGE_SIZE + 1,
        "–",
        Math.min(currentPage * PAGE_SIZE, filtered.length),
        " of",
        " ",
        filtered.length,
        " users"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            "data-ocid": "users.pagination_prev",
            onClick: () => setPage((p) => Math.max(1, p - 1)),
            disabled: currentPage === 1,
            className: "h-8 w-8 bg-card",
            "aria-label": "Previous page",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground px-3", children: [
          currentPage,
          " / ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            "data-ocid": "users.pagination_next",
            onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
            disabled: currentPage === totalPages,
            className: "h-8 w-8 bg-card",
            "aria-label": "Next page",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: sheetOpen, onOpenChange: setSheetOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SheetContent,
      {
        className: "w-full sm:max-w-md bg-card border-l border-border",
        "data-ocid": "users.sheet",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display text-lg font-bold", children: editingUser ? "Edit user" : "Add new user" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { className: "text-sm text-muted-foreground", children: editingUser ? `Update details for ${editingUser.name}.` : "Fill in the details to create a new user account." })
          ] }),
          editingUser && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-4 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-sm font-bold", children: avatarInitials(editingUser.name) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: editingUser.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                "Member since ",
                formatDate(editingUser.joinDate)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            UserForm,
            {
              value: form,
              onChange: setForm,
              isNew: editingUser === null
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetFooter, { className: "pt-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                "data-ocid": "users.sheet_cancel_button",
                onClick: () => setSheetOpen(false),
                className: "flex-1",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "users.sheet_save_button",
                onClick: handleSave,
                disabled: isSaving,
                className: "flex-1 bg-primary text-primary-foreground hover:bg-primary/90",
                children: isSaving ? "Saving…" : editingUser ? "Save changes" : "Create user"
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: deleteTarget !== null,
        onOpenChange: (open) => {
          if (!open) setDeleteTarget(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "users.delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete user?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "This will permanently remove",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: deleteTarget == null ? void 0 : deleteTarget.name }),
              ". This action cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogCancel,
              {
                "data-ocid": "users.delete_cancel_button",
                onClick: () => setDeleteTarget(null),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                "data-ocid": "users.delete_confirm_button",
                onClick: handleConfirmDelete,
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                children: deleteUser.isPending ? "Deleting…" : "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  UsersPage as default
};
