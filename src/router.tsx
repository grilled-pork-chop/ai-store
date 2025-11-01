import {
  createRootRoute,
  createRoute,
  createRouter,
  type AnyRouteMatch,
} from "@tanstack/react-router";
import App from '@/App';
import HomePage from "@/pages/HomePage";
import AddProjectPage from "@/pages/AddProjectPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import { useProjectStore } from "./features/projects/store";

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    breadcrumb?: string | ((match: AnyRouteMatch) => string)
    title?: string | ((match: AnyRouteMatch) => string)
  }
}

const basepath = import.meta.env.BASE_URL || "/";


const rootRoute = createRootRoute({
  component: App,
  staticData: { breadcrumb: "Home", title: "AI Store - Home" },
});
const home = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
  staticData: { breadcrumb: "Home", title: "AI Store - Home" },
})

const add = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add-project",
  component: AddProjectPage,
  staticData: { breadcrumb: "Add Project", title: "AI Store - Add Project" },
})

const detail = createRoute({
  getParentRoute: () => rootRoute,
  path: "/project/$projectId",
  component: ProjectDetailPage,
  staticData: {
    breadcrumb: (match: AnyRouteMatch) => {
      const id = match.params.projectId
      const project = useProjectStore.getState().getById(id)
      return project?.name ?? "Project"
    },
    title: (match: AnyRouteMatch) => {
      const id = match.params.projectId
      const project = useProjectStore.getState().getById(id)
      return `AI Store - ${project?.name ?? "Project"}`
    },
  },
})

const routeTree = rootRoute.addChildren([home, add, detail]);
const router = createRouter({ routeTree, basepath });

declare module "@tanstack/react-router" {
  interface Register { router: typeof router; }
}

export default router;