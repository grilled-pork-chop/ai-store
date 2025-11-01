import type { Project } from '@/features/projects/types';

// export async function fetchProjects(): Promise<Project[]> {
//   const res = await fetch('/api/projects');
//   if (!res.ok) throw new Error('Failed to fetch projects');
//   return res.json();
// }

/**
 * Simulate an API fetch.
 * In production, replace with a real API endpoint (e.g. /api/projects).
 */
export async function fetchProjects(): Promise<Project[]> {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const url = `${baseUrl}mock/projects.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch mock projects');
  const data = await res.json();
  return data.map((p: any) => ({
    ...p,
    lastUpdated: new Date(p.lastUpdated),
  }));
}
