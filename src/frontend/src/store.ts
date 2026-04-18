import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppStore {
  theme: "dark" | "light";
  sidebarCollapsed: boolean;
  setTheme: (theme: "dark" | "light") => void;
  toggleTheme: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      theme: "dark",
      sidebarCollapsed: false,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    {
      name: "admin-app-store",
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
