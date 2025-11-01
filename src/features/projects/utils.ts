import type { SortType, Project } from "./types";

export const SORTERS: Record<SortType, (a: Project, b: Project) => number> = {
  downloads: (a, b) => b.downloads - a.downloads,
  favorites: (a, b) => b.favorites - a.favorites,
  updated: (a, b) =>
    new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(),
};
