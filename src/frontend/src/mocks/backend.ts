import type { backendInterface } from "../backend";
import {
  ContentStatus,
  ContentType,
  UserRole,
  UserStatus,
} from "../backend";

const sampleUsers = [
  {
    id: "u1",
    name: "Alice Chen",
    email: "alice@example.com",
    role: UserRole.Admin,
    status: UserStatus.Active,
    joinDate: BigInt(1700000000000),
  },
  {
    id: "u2",
    name: "Bob Martinez",
    email: "bob@example.com",
    role: UserRole.Editor,
    status: UserStatus.Active,
    joinDate: BigInt(1710000000000),
  },
  {
    id: "u3",
    name: "Carol Kim",
    email: "carol@example.com",
    role: UserRole.Viewer,
    status: UserStatus.Inactive,
    joinDate: BigInt(1715000000000),
  },
];

const sampleContent = [
  {
    id: "c1",
    title: "Getting Started with the Platform",
    contentType: ContentType.Blog,
    author: "Alice Chen",
    status: ContentStatus.Published,
    createdAt: BigInt(1718000000000),
    updatedAt: BigInt(1718500000000),
  },
  {
    id: "c2",
    title: "Architecture Overview",
    contentType: ContentType.Page,
    author: "Bob Martinez",
    status: ContentStatus.Published,
    createdAt: BigInt(1719000000000),
    updatedAt: BigInt(1719200000000),
  },
  {
    id: "c3",
    title: "Q3 Resource Planning",
    contentType: ContentType.Resource,
    author: "Carol Kim",
    status: ContentStatus.Draft,
    createdAt: BigInt(1720000000000),
    updatedAt: BigInt(1720100000000),
  },
];

export const mockBackend: backendInterface = {
  getMetrics: async () => ({
    totalUsers: BigInt(2847),
    activeSessions: BigInt(134),
    contentItems: BigInt(512),
    sevenDayChange: 12.4,
  }),

  getUsers: async () => sampleUsers,

  getUser: async (id: string) =>
    sampleUsers.find((u) => u.id === id) ?? null,

  createUser: async (name, email, role, status) => ({
    id: "u_new",
    name,
    email,
    role,
    status,
    joinDate: BigInt(Date.now()),
  }),

  updateUser: async (id, name, email, role, status) => {
    const user = sampleUsers.find((u) => u.id === id);
    if (!user) return null;
    return {
      ...user,
      name: name ?? user.name,
      email: email ?? user.email,
      role: role ?? user.role,
      status: status ?? user.status,
    };
  },

  deleteUser: async () => true,

  getContent: async () => sampleContent,

  getContentItem: async (id: string) =>
    sampleContent.find((c) => c.id === id) ?? null,

  createContent: async (title, contentType, author, status) => ({
    id: "c_new",
    title,
    contentType,
    author,
    status,
    createdAt: BigInt(Date.now()),
    updatedAt: BigInt(Date.now()),
  }),

  updateContent: async (id, title, contentType, author, status) => {
    const item = sampleContent.find((c) => c.id === id);
    if (!item) return null;
    return {
      ...item,
      title: title ?? item.title,
      contentType: contentType ?? item.contentType,
      author: author ?? item.author,
      status: status ?? item.status,
      updatedAt: BigInt(Date.now()),
    };
  },

  deleteContent: async () => true,

  togglePublish: async (id: string) => {
    const item = sampleContent.find((c) => c.id === id);
    if (!item) return null;
    return {
      ...item,
      status:
        item.status === ContentStatus.Published
          ? ContentStatus.Draft
          : ContentStatus.Published,
      updatedAt: BigInt(Date.now()),
    };
  },

  searchAll: async (searchTerm: string) => ({
    userResults: sampleUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    contentResults: sampleContent.filter((c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }),
};
