import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = string;
export type Timestamp = bigint;
export type ContentId = string;
export interface User {
    id: UserId;
    status: UserStatus;
    joinDate: Timestamp;
    name: string;
    role: UserRole;
    email: string;
}
export interface ContentItem {
    id: ContentId;
    status: ContentStatus;
    title: string;
    contentType: ContentType;
    createdAt: Timestamp;
    author: string;
    updatedAt: Timestamp;
}
export interface SearchResults {
    userResults: Array<User>;
    contentResults: Array<ContentItem>;
}
export interface Metrics {
    sevenDayChange: number;
    contentItems: bigint;
    activeSessions: bigint;
    totalUsers: bigint;
}
export enum ContentStatus {
    Draft = "Draft",
    Published = "Published"
}
export enum ContentType {
    Blog = "Blog",
    Page = "Page",
    Resource = "Resource"
}
export enum UserRole {
    Viewer = "Viewer",
    Editor = "Editor",
    Admin = "Admin"
}
export enum UserStatus {
    Inactive = "Inactive",
    Active = "Active"
}
export interface backendInterface {
    createContent(title: string, contentType: ContentType, author: string, status: ContentStatus): Promise<ContentItem>;
    createUser(name: string, email: string, role: UserRole, status: UserStatus): Promise<User>;
    deleteContent(id: string): Promise<boolean>;
    deleteUser(id: string): Promise<boolean>;
    getContent(): Promise<Array<ContentItem>>;
    getContentItem(id: string): Promise<ContentItem | null>;
    getMetrics(): Promise<Metrics>;
    getUser(id: string): Promise<User | null>;
    getUsers(): Promise<Array<User>>;
    searchAll(searchTerm: string): Promise<SearchResults>;
    togglePublish(id: string): Promise<ContentItem | null>;
    updateContent(id: string, title: string | null, contentType: ContentType | null, author: string | null, status: ContentStatus | null): Promise<ContentItem | null>;
    updateUser(id: string, name: string | null, email: string | null, role: UserRole | null, status: UserStatus | null): Promise<User | null>;
}
