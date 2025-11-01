import { useNavigate } from '@tanstack/react-router';
import ProjectForm from '@/features/projects/forms/ProjectForm';
import type { Project } from '@/features/projects/types';

export default function AddProjectPage() {
  const navigate = useNavigate();
  const handleSubmit = (project: Project) => navigate({ to: `/project/${project.id}` });

  return (
    <>
      <ProjectForm onSubmit={handleSubmit} />
    </>
  );
}
