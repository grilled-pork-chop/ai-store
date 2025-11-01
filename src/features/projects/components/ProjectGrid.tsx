import { useProjects } from '../hooks';
import ProjectCard from './ProjectCard';


export default function ProjectGrid() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading)
    return <p className="text-center text-muted-foreground py-10">Loading projects…</p>;
  if (error)
    return <p className="text-center text-red-900 py-10">Failed to load projects.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
      {projects.length === 0 && (
        <p className="text-center text-muted-foreground text-sm col-span-full py-8">
          No projects found.
        </p>
      )}
    </div>
  );
}
