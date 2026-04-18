import { c as createLucideIcon, r as reactExports, p as useContent, s as useTogglePublish, t as useDeleteContent, j as jsxRuntimeExports, B as Button, n as Search, I as Input, v as Separator, e as cn, C as ChevronLeft, o as ue, S as Skeleton, w as useUpdateContent, x as useCreateContent } from "./index-CXdAsnTn.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, T as Table, e as TableHeader, f as TableRow, g as TableHead, h as TableBody, i as TableCell, C as ChevronRight, x as ArrowUpDown, A as AlertDialog, B as AlertDialogTrigger, j as Trash2, q as AlertDialogContent, r as AlertDialogHeader, s as AlertDialogTitle, t as AlertDialogDescription, u as AlertDialogFooter, v as AlertDialogCancel, w as AlertDialogAction, k as Sheet, l as SheetContent, m as SheetHeader, n as SheetTitle, L as Label } from "./table-DHzQ6iRV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M9 15h6", key: "cctwl0" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }]
];
const FilePlus = createLucideIcon("file-plus", __iconNode);
const PAGE_SIZE = 10;
const TYPE_LABELS = {
  Blog: "Blog",
  Page: "Page",
  Resource: "Resource"
};
const TYPE_COLORS = {
  Blog: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  Page: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Resource: "bg-orange-500/15 text-orange-400 border-orange-500/30"
};
const STATUS_COLORS = {
  published: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  draft: "bg-muted text-muted-foreground border-border",
  archived: "bg-amber-500/15 text-amber-400 border-amber-500/30"
};
const CONTENT_TYPES = [
  "Blog",
  "Page",
  "Resource"
];
const CONTENT_STATUSES = ["draft", "published", "archived"];
function formatDate(ts) {
  const ms = Number(ts) > 1e15 ? Number(ts) / 1e6 : Number(ts);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(ms));
}
function getTypeLabel(ct) {
  return TYPE_LABELS[ct] ?? ct;
}
function SkeletonRows() {
  const keys = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: keys.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { className: "border-border", children: ["a", "b", "c", "d", "e", "f"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Skeleton,
    {
      className: cn(
        "h-4",
        c === "a" ? "w-48" : c === "f" ? "w-20" : "w-20"
      )
    }
  ) }, c)) }, k)) });
}
function TypeBadge({ type }) {
  const colorClass = TYPE_COLORS[type] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center text-xs px-2 py-0.5 rounded-full border font-medium",
        colorClass
      ),
      children: getTypeLabel(type)
    }
  );
}
function StatusBadge({ status }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center text-xs px-2 py-0.5 rounded-full border capitalize font-medium",
        STATUS_COLORS[status]
      ),
      children: status
    }
  );
}
function SortableHead({
  label,
  sortKey,
  activeKey,
  dir,
  onSort,
  className
}) {
  const isActive = activeKey === sortKey;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TableHead,
    {
      className: cn(
        "text-muted-foreground text-xs uppercase tracking-wider font-semibold",
        className
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onSort(sortKey),
          "data-ocid": `content.sort_${sortKey}`,
          className: cn(
            "flex items-center gap-1.5 hover:text-foreground transition-colors",
            isActive && "text-foreground"
          ),
          children: [
            label,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ArrowUpDown,
              {
                className: cn(
                  "h-3 w-3 transition-opacity",
                  isActive ? "opacity-100" : "opacity-40",
                  isActive && dir === "asc" ? "rotate-180" : ""
                )
              }
            )
          ]
        }
      )
    }
  );
}
function ContentForm({
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: "cf-title",
          className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
          children: "Title"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "cf-title",
          "data-ocid": "content.form.title_input",
          value: value.title,
          onChange: (e) => onChange({ ...value, title: e.target.value }),
          placeholder: "Enter a title…",
          className: "bg-background"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: "cf-type",
          className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
          children: "Type"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: value.contentType,
          onValueChange: (v) => onChange({ ...value, contentType: v }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                id: "cf-type",
                "data-ocid": "content.form.type_select",
                className: "bg-background",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CONTENT_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: getTypeLabel(t) }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: "cf-author",
          className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
          children: "Author"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "cf-author",
          "data-ocid": "content.form.author_input",
          value: value.author,
          onChange: (e) => onChange({ ...value, author: e.target.value }),
          placeholder: "Author name…",
          className: "bg-background"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: "cf-status",
          className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
          children: "Status"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: value.status,
          onValueChange: (v) => onChange({ ...value, status: v }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                id: "cf-status",
                "data-ocid": "content.form.status_select",
                className: "bg-background",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CONTENT_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, className: "capitalize", children: s.charAt(0).toUpperCase() + s.slice(1) }, s)) })
          ]
        }
      )
    ] })
  ] });
}
function ContentDetailSheet({
  item,
  open,
  onClose
}) {
  const updateContent = useUpdateContent();
  const togglePublish = useTogglePublish();
  const [form, setForm] = reactExports.useState({
    title: item.title,
    contentType: item.contentType,
    author: item.author,
    status: item.status
  });
  const isDraft = item.status !== "published";
  const handleSave = () => {
    updateContent.mutate(
      { id: item.id, ...form },
      {
        onSuccess: () => {
          ue.success("Content updated");
          onClose();
        },
        onError: () => ue.error("Failed to save changes")
      }
    );
  };
  const handleTogglePublish = () => {
    togglePublish.mutate(item.id, {
      onSuccess: () => ue.success(isDraft ? "Published successfully" : "Moved to draft"),
      onError: () => ue.error("Failed to update status")
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      "data-ocid": "content.detail_sheet",
      className: "w-full sm:max-w-md flex flex-col gap-0 p-0 bg-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "px-6 pt-6 pb-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display text-lg font-bold text-foreground line-clamp-2", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TypeBadge, { type: item.contentType }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: item.status })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-6 py-5 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-4 gap-y-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-0.5", children: "Created" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: formatDate(item.createdAt) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-0.5", children: "Last Updated" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: formatDate(item.updatedAt) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-0.5", children: "Author" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: item.author })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4", children: "Edit Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ContentForm, { value: form, onChange: setForm })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-t border-border flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "content.sheet.save_button",
              onClick: handleSave,
              disabled: updateContent.isPending,
              className: "w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
              children: updateContent.isPending ? "Saving…" : "Save Changes"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "content.sheet.toggle_publish_button",
              variant: "outline",
              onClick: handleTogglePublish,
              disabled: togglePublish.isPending,
              className: cn(
                "w-full",
                isDraft ? "border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10" : "border-amber-500/40 text-amber-400 hover:bg-amber-500/10"
              ),
              children: togglePublish.isPending ? "Updating…" : isDraft ? "Publish" : "Unpublish"
            }
          )
        ] })
      ]
    }
  ) });
}
function AddContentSheet({
  open,
  onClose
}) {
  const createContent = useCreateContent();
  const [form, setForm] = reactExports.useState({
    title: "",
    contentType: "Blog",
    author: "",
    status: "draft"
  });
  const handleCreate = () => {
    if (!form.title.trim()) {
      ue.error("Title is required");
      return;
    }
    createContent.mutate(form, {
      onSuccess: () => {
        ue.success("Content created");
        onClose();
        setForm({
          title: "",
          contentType: "Blog",
          author: "",
          status: "draft"
        });
      },
      onError: () => ue.error("Failed to create content")
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      "data-ocid": "content.add_sheet",
      className: "w-full sm:max-w-md flex flex-col gap-0 p-0 bg-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "px-6 pt-6 pb-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display text-lg font-bold text-foreground", children: "New Content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Fill in the details to create a new content item." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContentForm, { value: form, onChange: setForm }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "content.add_sheet.submit_button",
            onClick: handleCreate,
            disabled: createContent.isPending,
            className: "w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
            children: createContent.isPending ? "Creating…" : "Create Content"
          }
        ) })
      ]
    }
  ) });
}
function DeleteDialog({
  item,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ghost",
        size: "icon",
        "data-ocid": "content.delete_button",
        className: "h-8 w-8 text-muted-foreground hover:text-destructive",
        "aria-label": `Delete ${item.title}`,
        onClick: (e) => e.stopPropagation(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "content.delete_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete content?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Permanently delete",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
            '"',
            item.title,
            '"'
          ] }),
          ". This action cannot be undone."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "content.delete_cancel_button", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            "data-ocid": "content.delete_confirm_button",
            onClick: () => onDelete(item.id),
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            children: "Delete"
          }
        )
      ] })
    ] })
  ] });
}
function ContentPage() {
  const [search, setSearch] = reactExports.useState("");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [sortKey, setSortKey] = reactExports.useState("updatedAt");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const [page, setPage] = reactExports.useState(1);
  const [selectedItem, setSelectedItem] = reactExports.useState(null);
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const { data: content, isLoading } = useContent();
  const togglePublish = useTogglePublish();
  const deleteContent = useDeleteContent();
  const filtered = (content ?? []).filter((item) => {
    const q = search.toLowerCase();
    const matchSearch = !q || item.title.toLowerCase().includes(q) || item.author.toLowerCase().includes(q);
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
    safePage * PAGE_SIZE
  );
  const handleSort = (key) => {
    if (key === sortKey) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };
  const handleFilterChange = () => setPage(1);
  const handleTogglePublish = (e, item) => {
    e.stopPropagation();
    togglePublish.mutate(item.id, {
      onSuccess: () => ue.success(
        item.status === "published" ? "Moved to draft" : "Published successfully"
      ),
      onError: () => ue.error("Failed to update status")
    });
  };
  const handleDelete = (id) => {
    deleteContent.mutate(id, {
      onSuccess: () => ue.success("Content deleted"),
      onError: () => ue.error("Failed to delete content")
    });
  };
  const total = (content == null ? void 0 : content.length) ?? 0;
  const published = (content == null ? void 0 : content.filter((c) => c.status === "published").length) ?? 0;
  const drafts = (content == null ? void 0 : content.filter((c) => c.status === "draft").length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground tracking-tight", children: "Content" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          total,
          " items · ",
          published,
          " published · ",
          drafts,
          " draft"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "content.add_button",
          onClick: () => setAddOpen(true),
          className: "shrink-0 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 h-9",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FilePlus, { className: "h-4 w-4 mr-2" }),
            "Add Content"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 p-4 bg-card rounded-lg border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px] max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "content.search_input",
            placeholder: "Search by title or author…",
            value: search,
            onChange: (e) => {
              setSearch(e.target.value);
              handleFilterChange();
            },
            className: "pl-9 h-9 bg-background"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-7 hidden sm:block" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: typeFilter,
          onValueChange: (v) => {
            setTypeFilter(v);
            handleFilterChange();
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                "data-ocid": "content.type_filter",
                className: "h-9 w-36 bg-background text-sm",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Types" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Types" }),
              CONTENT_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: getTypeLabel(t) }, t))
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
            handleFilterChange();
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                "data-ocid": "content.status_filter",
                className: "h-9 w-36 bg-background text-sm",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Statuses" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Statuses" }),
              CONTENT_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, className: "capitalize", children: s.charAt(0).toUpperCase() + s.slice(1) }, s))
            ] })
          ]
        }
      ),
      (typeFilter !== "all" || statusFilter !== "all" || search) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          "data-ocid": "content.clear_filters_button",
          onClick: () => {
            setSearch("");
            setTypeFilter("all");
            setStatusFilter("all");
            setPage(1);
          },
          className: "h-9 text-muted-foreground hover:text-foreground text-xs",
          children: "Clear filters"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground tabular-nums", children: [
        filtered.length,
        " result",
        filtered.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SortableHead,
            {
              label: "Title",
              sortKey: "title",
              activeKey: sortKey,
              dir: sortDir,
              onSort: handleSort
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground text-xs uppercase tracking-wider font-semibold w-24", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SortableHead,
            {
              label: "Author",
              sortKey: "author",
              activeKey: sortKey,
              dir: sortDir,
              onSort: handleSort,
              className: "w-36"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground text-xs uppercase tracking-wider font-semibold w-28", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SortableHead,
            {
              label: "Last Updated",
              sortKey: "updatedAt",
              activeKey: sortKey,
              dir: sortDir,
              onSort: handleSort,
              className: "w-36"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-muted-foreground text-xs uppercase tracking-wider font-semibold text-right w-28", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRows, {}) : paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            colSpan: 6,
            "data-ocid": "content.empty_state",
            className: "text-center py-16 text-muted-foreground text-sm",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilePlus, { className: "h-5 w-5 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-base", children: "No content found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: search || typeFilter !== "all" || statusFilter !== "all" ? "Try adjusting your filters or search query." : "Create your first content item to get started." }),
              !search && typeFilter === "all" && statusFilter === "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "content.empty_state_add_button",
                  size: "sm",
                  className: "mt-2 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                  onClick: () => setAddOpen(true),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FilePlus, { className: "h-4 w-4 mr-1.5" }),
                    "Add Content"
                  ]
                }
              )
            ] })
          }
        ) }) : paginated.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `content.item.${(safePage - 1) * PAGE_SIZE + i + 1}`,
            className: "border-border hover:bg-muted/30 transition-colors cursor-pointer",
            onClick: () => setSelectedItem(item),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground line-clamp-1 max-w-xs min-w-0", children: item.title }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypeBadge, { type: item.contentType }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground whitespace-nowrap", children: item.author }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: item.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground tabular-nums whitespace-nowrap", children: formatDate(item.updatedAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TableCell,
                {
                  className: "text-right",
                  onClick: (e) => e.stopPropagation(),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        "data-ocid": `content.toggle_publish_button.${(safePage - 1) * PAGE_SIZE + i + 1}`,
                        onClick: (e) => handleTogglePublish(e, item),
                        className: cn(
                          "h-8 w-8",
                          item.status === "published" ? "text-emerald-400 hover:text-amber-400" : "text-muted-foreground hover:text-emerald-400"
                        ),
                        "aria-label": item.status === "published" ? "Unpublish" : "Publish",
                        children: item.status === "published" ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteDialog, { item, onDelete: handleDelete })
                  ] })
                }
              )
            ]
          },
          item.id
        )) })
      ] }),
      !isLoading && sorted.length > PAGE_SIZE && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground tabular-nums", children: [
          "Showing ",
          (safePage - 1) * PAGE_SIZE + 1,
          "–",
          Math.min(safePage * PAGE_SIZE, sorted.length),
          " of ",
          sorted.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              "data-ocid": "content.pagination_prev",
              disabled: safePage <= 1,
              onClick: () => setPage((p) => p - 1),
              className: "h-8 w-8 text-muted-foreground disabled:opacity-30",
              "aria-label": "Previous page",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground px-2 tabular-nums", children: [
            safePage,
            " / ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              "data-ocid": "content.pagination_next",
              disabled: safePage >= totalPages,
              onClick: () => setPage((p) => p + 1),
              className: "h-8 w-8 text-muted-foreground disabled:opacity-30",
              "aria-label": "Next page",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
            }
          )
        ] })
      ] })
    ] }),
    selectedItem && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ContentDetailSheet,
      {
        item: selectedItem,
        open: !!selectedItem,
        onClose: () => setSelectedItem(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddContentSheet, { open: addOpen, onClose: () => setAddOpen(false) })
  ] });
}
export {
  ContentPage as default
};
