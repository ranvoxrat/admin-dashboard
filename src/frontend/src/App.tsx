import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Outlet,
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { useEffect } from "react";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import { useAppStore } from "./store";

import { Skeleton } from "@/components/ui/skeleton";
// ─── Lazy page imports ────────────────────────────────────────────────────────
import { Suspense, lazy } from "react";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));
const ContentPage = lazy(() => import("./pages/ContentPage"));

function PageLoader() {
  return (
    <div className="p-8 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
      <div className="grid grid-cols-4 gap-4 mt-6">
        {["a", "b", "c", "d"].map((k) => (
          <Skeleton key={k} className="h-32 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// ─── Theme synchronizer ───────────────────────────────────────────────────────
function ThemeSync() {
  const theme = useAppStore((s) => s.theme);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return null;
}

// ─── Auth guard ───────────────────────────────────────────────────────────────
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitializing } = useInternetIdentity();

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.navigate({ to: "/login" });
    }
  }, [isAuthenticated, isInitializing]);

  if (isInitializing) {
    return <PageLoader />;
  }
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

// ─── Routes ───────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <>
      <ThemeSync />
      <Outlet />
    </>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app-layout",
  component: () => (
    <AuthGuard>
      <Layout>
        <Outlet />
      </Layout>
    </AuthGuard>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
  component: () => null,
});

const dashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  ),
});

const usersRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/users",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <UsersPage />
    </Suspense>
  ),
});

const contentRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/content",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ContentPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  appLayoutRoute.addChildren([
    indexRoute,
    dashboardRoute,
    usersRoute,
    contentRoute,
  ]),
]);

const history = createHashHistory();

const router = createRouter({ routeTree, history });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
