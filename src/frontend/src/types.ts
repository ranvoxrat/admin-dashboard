export type UserRole = "admin" | "editor" | "viewer";
export type UserStatus = "active" | "inactive" | "suspended";
export type ContentType = "Blog" | "Page" | "Resource";
export type ContentStatus = "draft" | "published" | "archived";
export type Timestamp = bigint;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinDate: Timestamp;
}

export interface ContentItem {
  id: string;
  title: string;
  contentType: ContentType;
  author: string;
  status: ContentStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Metrics {
  totalUsers: bigint;
  activeSessions: bigint;
  contentItems: bigint;
  sevenDayChange: number;
}

export interface SearchResults {
  userResults: User[];
  contentResults: ContentItem[];
}
