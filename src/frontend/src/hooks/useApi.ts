import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ContentItem,
  ContentStatus,
  ContentType,
  Metrics,
  SearchResults,
  User,
  UserRole,
  UserStatus,
} from "../types";

// ─── Mock data (used until backend has real implementations) ─────────────────

const MOCK_USERS: User[] = [
  {
    id: "u1",
    name: "Alice Chen",
    email: "alice@example.com",
    role: "admin",
    status: "active",
    joinDate: BigInt(Date.now()),
  },
  {
    id: "u2",
    name: "Marcus Webb",
    email: "marcus@example.com",
    role: "editor",
    status: "active",
    joinDate: BigInt(Date.now() - 86400000 * 5),
  },
  {
    id: "u3",
    name: "Sofia Torres",
    email: "sofia@example.com",
    role: "viewer",
    status: "inactive",
    joinDate: BigInt(Date.now() - 86400000 * 30),
  },
  {
    id: "u4",
    name: "James Okafor",
    email: "james@example.com",
    role: "editor",
    status: "active",
    joinDate: BigInt(Date.now() - 86400000 * 10),
  },
  {
    id: "u5",
    name: "Priya Nair",
    email: "priya@example.com",
    role: "viewer",
    status: "suspended",
    joinDate: BigInt(Date.now() - 86400000 * 60),
  },
];

const MOCK_CONTENT: ContentItem[] = [
  {
    id: "c1",
    title: "Getting Started with the Platform",
    contentType: "Blog",
    author: "Alice Chen",
    status: "published",
    createdAt: BigInt(Date.now() - 86400000 * 2),
    updatedAt: BigInt(Date.now()),
  },
  {
    id: "c2",
    title: "Q2 Product Roadmap Update",
    contentType: "Blog",
    author: "Marcus Webb",
    status: "published",
    createdAt: BigInt(Date.now() - 86400000 * 7),
    updatedAt: BigInt(Date.now() - 86400000),
  },
  {
    id: "c3",
    title: "API Reference Documentation",
    contentType: "Page",
    author: "Sofia Torres",
    status: "draft",
    createdAt: BigInt(Date.now() - 86400000 * 3),
    updatedAt: BigInt(Date.now() - 86400000 * 2),
  },
  {
    id: "c4",
    title: "System Architecture Deep Dive",
    contentType: "Resource",
    author: "James Okafor",
    status: "published",
    createdAt: BigInt(Date.now() - 86400000 * 14),
    updatedAt: BigInt(Date.now() - 86400000 * 3),
  },
  {
    id: "c5",
    title: "Security Best Practices",
    contentType: "Resource",
    author: "Priya Nair",
    status: "archived",
    createdAt: BigInt(Date.now() - 86400000 * 90),
    updatedAt: BigInt(Date.now() - 86400000 * 30),
  },
  {
    id: "c6",
    title: "Onboarding Checklist for New Users",
    contentType: "Page",
    author: "Alice Chen",
    status: "draft",
    createdAt: BigInt(Date.now() - 86400000 * 1),
    updatedAt: BigInt(Date.now() - 86400000 * 1),
  },
  {
    id: "c7",
    title: "Infrastructure Cost Optimization Guide",
    contentType: "Resource",
    author: "Marcus Webb",
    status: "draft",
    createdAt: BigInt(Date.now() - 86400000 * 5),
    updatedAt: BigInt(Date.now() - 86400000 * 4),
  },
  {
    id: "c8",
    title: "Deploying to Production: Step-by-Step",
    contentType: "Blog",
    author: "James Okafor",
    status: "published",
    createdAt: BigInt(Date.now() - 86400000 * 20),
    updatedAt: BigInt(Date.now() - 86400000 * 8),
  },
];

const MOCK_METRICS: Metrics = {
  totalUsers: BigInt(1284),
  activeSessions: BigInt(47),
  contentItems: BigInt(312),
  sevenDayChange: 12.4,
};

// ─── Query Keys ──────────────────────────────────────────────────────────────

export const queryKeys = {
  users: ["users"] as const,
  user: (id: string) => ["users", id] as const,
  content: ["content"] as const,
  contentItem: (id: string) => ["content", id] as const,
  metrics: ["metrics"] as const,
  search: (query: string) => ["search", query] as const,
};

// ─── Queries ─────────────────────────────────────────────────────────────────

export function useUsers() {
  return useQuery<User[]>({
    queryKey: queryKeys.users,
    queryFn: async () => MOCK_USERS,
    staleTime: 30_000,
  });
}

export function useUser(id: string) {
  return useQuery<User | undefined>({
    queryKey: queryKeys.user(id),
    queryFn: async () => MOCK_USERS.find((u) => u.id === id),
    enabled: !!id,
  });
}

export function useContent() {
  return useQuery<ContentItem[]>({
    queryKey: queryKeys.content,
    queryFn: async () => MOCK_CONTENT,
    staleTime: 30_000,
  });
}

export function useContentItem(id: string) {
  return useQuery<ContentItem | undefined>({
    queryKey: queryKeys.contentItem(id),
    queryFn: async () => MOCK_CONTENT.find((c) => c.id === id),
    enabled: !!id,
  });
}

export function useMetrics() {
  return useQuery<Metrics>({
    queryKey: queryKeys.metrics,
    queryFn: async () => MOCK_METRICS,
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
}

export function useSearch(query: string) {
  return useQuery<SearchResults>({
    queryKey: queryKeys.search(query),
    queryFn: async () => {
      const q = query.toLowerCase();
      return {
        userResults: MOCK_USERS.filter(
          (u) =>
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q),
        ),
        contentResults: MOCK_CONTENT.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.author.toLowerCase().includes(q),
        ),
      };
    },
    enabled: query.length >= 3,
    staleTime: 10_000,
  });
}

// ─── Mutations ───────────────────────────────────────────────────────────────

interface CreateUserInput {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation<User, Error, CreateUserInput>({
    mutationFn: async (input) => ({
      id: `u${Date.now()}`,
      joinDate: BigInt(Date.now()),
      ...input,
    }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.users }),
  });
}

interface UpdateUserInput {
  id: string;
  name?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation<User, Error, UpdateUserInput>({
    mutationFn: async (input) => {
      const existing = MOCK_USERS.find((u) => u.id === input.id);
      if (!existing) throw new Error("User not found");
      return { ...existing, ...input };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async () => undefined,
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.users }),
  });
}

interface CreateContentInput {
  title: string;
  contentType: ContentType;
  author: string;
  status: ContentStatus;
}

export function useCreateContent() {
  const qc = useQueryClient();
  return useMutation<ContentItem, Error, CreateContentInput>({
    mutationFn: async (input) => ({
      id: `c${Date.now()}`,
      createdAt: BigInt(Date.now()),
      updatedAt: BigInt(Date.now()),
      ...input,
    }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.content }),
  });
}

interface UpdateContentInput {
  id: string;
  title?: string;
  contentType?: ContentType;
  status?: ContentStatus;
}

export function useUpdateContent() {
  const qc = useQueryClient();
  return useMutation<ContentItem, Error, UpdateContentInput>({
    mutationFn: async (input) => {
      const existing = MOCK_CONTENT.find((c) => c.id === input.id);
      if (!existing) throw new Error("Content not found");
      return { ...existing, ...input, updatedAt: BigInt(Date.now()) };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.content }),
  });
}

export function useDeleteContent() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async () => undefined,
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.content }),
  });
}

export function useTogglePublish() {
  const qc = useQueryClient();
  return useMutation<ContentItem, Error, string>({
    mutationFn: async (id) => {
      const existing = MOCK_CONTENT.find((c) => c.id === id);
      if (!existing) throw new Error("Content not found");
      const newStatus: ContentStatus =
        existing.status === "published" ? "draft" : "published";
      return { ...existing, status: newStatus, updatedAt: BigInt(Date.now()) };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.content }),
  });
}
