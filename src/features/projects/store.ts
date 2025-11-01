import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Project, SortType } from "./types";

interface ProjectState {
  projects: Project[]
  setAll: (projects: Project[]) => void
  add: (p: Project) => void
  update: (id: string, updated: Partial<Project>) => void
  remove: (id: string) => void
  getById: (id: string) => Project | undefined
}

export const useProjectStore = create<ProjectState>()(
  devtools(
    (set, get) => ({
      projects: [],
      setAll: (projects) => set({ projects }),
      add: (p) =>
        set((s) => ({
          projects: [
            { ...p, lastUpdated: new Date(p.lastUpdated) },
            ...s.projects,
          ],
        })),
      getById: (id) => get().projects.find((p) => p.id === id),
      update: (id, updated) =>
        set((state) => ({
          projects: state.projects.map((proj) =>
            proj.id === id
              ? ({
                  ...proj,
                  ...updated,
                  lastUpdated: new Date(),
                } as Project)
              : proj
          ),
        })),
      remove: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),
    }),
    { name: "ProjectStore" }
  )
);

interface FilterState {
  search: string;
  projectTypes: string[];
  sort: SortType;
  set: <K extends keyof FilterState>(k: K, v: FilterState[K]) => void;
  toggleType: (t: string) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      search: "",
      projectTypes: [],
      sort: "downloads",
      set: (k, v) => set({ [k]: v }),
      toggleType: (t) => {
        const list = get().projectTypes;
        set({
          projectTypes: list.includes(t) ? [] : [t],
        });
      },
      reset: () => set({ search: "", projectTypes: [], sort: "downloads" }),
    }),
    { name: "FilterStore" }
  )
);
