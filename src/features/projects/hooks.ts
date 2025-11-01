import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/features/projects/api";
import { SORTERS } from "./utils";
import { useProjectStore, useFilterStore } from "./store";
import { useEffect } from "react";

export function useProjects() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5,
  });

  const { projects, setAll } = useProjectStore();
  const { search, projectTypes, sort } = useFilterStore();

  useEffect(() => {
    if (data && projects.length === 0) {
      setAll(data);
    }
  }, [data, projects.length, setAll]);

  let list = [...projects];

  if (search) {
    const q = search.toLowerCase();
    list = list.filter((p) =>
      [p.name, p.author, p.description, p.projectType].some((s) =>
        s?.toLowerCase().includes(q)
      )
    );
  }
  if (projectTypes.length)
    list = list.filter((p) => projectTypes.includes(p.projectType));

  list.sort(SORTERS[sort]);

  return { projects: list, isLoading, error };
}

export const useFilters = () => useFilterStore();
