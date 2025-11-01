import { useParams, useNavigate } from '@tanstack/react-router';
import { useProjectStore } from "@/features/projects/store";
import { Button } from '@/components/ui/button';
import { Download, Heart, ExternalLink, Calendar } from 'lucide-react';
import { formatNumber, formatDate } from '@/lib/format';
import Sparkline from '@/components/common/Sparkline';
import MarkdownViewer from '@/components/common/MarkdownViewer';
import { ProjectIcon } from '@/features/projects/components/ProjectIcon';

export default function ProjectDetailPage() {
  const { projectId } = useParams({ from: '/project/$projectId' });
  const navigate = useNavigate();
  const project = useProjectStore((state) => state.getById(projectId));


  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project not found</h1>
        <Button onClick={() => navigate({ to: '/' })} className="mt-4">Go Home</Button>
      </div>
    );
  }

  const downloadsHistory = project?.metrics?.downloadsHistory as number[] | undefined;

  const getTechnicalValue = (key: string): string => {
    if (!project.technicalSpecs) return '';
    return (project.technicalSpecs as any)[key] || '';
  };

  const metadata: Record<string, string> = {
    Framework: project.framework || '',
    Architecture: getTechnicalValue('architecture'),
    Parameters: getTechnicalValue('parameters'),
    'Base Model': getTechnicalValue('baseModel'),
    Backend: getTechnicalValue('backend'),
    Frontend: getTechnicalValue('frontend'),
    Runtime: getTechnicalValue('runtime'),
    Task: getTechnicalValue('task'),
    Format: getTechnicalValue('format'),
    'Number of Samples': getTechnicalValue('numSamples'),
    Source: getTechnicalValue('source'),
    'Dataset Size (GB)': getTechnicalValue('sizeGB'),
    Labeling: getTechnicalValue('labeling'),
    'Protocol Version': getTechnicalValue('protocolVersion'),
    'Entry Command': getTechnicalValue('entryCommand'),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* LEFT: Main Markdown content */}
        <div className="flex-1">
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-muted p-3 shrink-0">
                <ProjectIcon type={project.projectType} size={24} />
              </div>
              <div className="min-w-0">
                <h1 className="text-4xl font-bold leading-tight wrap-break-word">
                  {project.name}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  by {project.author || "Anonymous"}
                </p>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                  <div className="inline-flex items-center gap-1">
                    <Calendar size={14} /> {formatDate(project.lastUpdated)}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Description */}
          {(project.detailedDescription || project.description) && (
            <article className="prose prose-lg dark:prose-invert w-full max-w-none leading-relaxed">
              <MarkdownViewer
                content={String(
                  project.detailedDescription || project.description
                )}
              />
            </article>
          )}
        </div>

        {/* RIGHT — Metadata sidebar */}
        <aside className="w-full md:w-80 shrink-0 md:sticky md:top-24">
          <div className="space-y-4 rounded-xl border bg-card p-4 text-sm shadow-sm">

            {/* Stats */}
            <section>
              <div className="grid grid-cols-2 gap-3">
                <Stat label="Likes" icon={Heart} value={project.favorites} />
                <Stat label="Downloads" icon={Download} value={project.downloads} />
              </div>
              {downloadsHistory && (
                <div className="mt-3">
                  <div className="text-muted-foreground text-xs mb-1">
                    Downloads (7d)
                  </div>
                  <Sparkline data={downloadsHistory} />
                </div>
              )}
            </section>

            {/* Author */}
            <section className="pt-3 border-t">
              <h2 className="text-sm font-medium text-muted-foreground mb-1">
                Author
              </h2>
              <div className="flex items-center justify-between">
                <span className="font-medium">{project.author}</span>
              </div>
            </section>

            {/* Metadata */}
            <section className="pt-3 border-t space-y-1">
              <h2 className="text-sm font-medium text-muted-foreground mb-1">
                Details
              </h2>
              {Object.entries(metadata)
                .filter(([_, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2 text-sm">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium text-right text-foreground truncate">
                      {v}
                    </span>
                  </div>
                ))}
            </section>

            {/* Uploaded Files */}
            {project.uploadedFiles && project.uploadedFiles.length > 0 && (
              <section className="pt-3 border-t">
                <h2 className="text-sm font-medium text-muted-foreground mb-1">
                  Files
                </h2>
                <ul className="space-y-2">
                  {project.uploadedFiles.map((file, i) => (
                    <li key={i} className="flex flex-col">
                      <span className="font-medium truncate">{file.name}</span>
                      {file.description && (
                        <span className="text-xs text-muted-foreground">
                          {file.description}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB · {file.type}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Links */}
            {project.links && Object.keys(project.links).length > 0 && (
              <section className="pt-3 border-t">
                <h2 className="text-sm font-medium text-muted-foreground mb-1">
                  Links
                </h2>
                <div className="flex flex-col gap-2">
                  {Object.entries(project.links).map(([key, url]) =>
                    url ? (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline capitalize"
                      >
                        {key} <ExternalLink size={12} />
                      </a>
                    ) : null
                  )}
                </div>
              </section>
            )}

          </div>
        </aside>
      </div>
    </div>
  );
}

/* Helper for consistent stat tiles */
function Stat({
  label,
  icon: Icon,
  value,
}: {
  label: string;
  icon: React.ElementType;
  value: number | undefined;
}) {
  return (
    <div>
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="flex items-center gap-1 font-semibold">
        <Icon size={14} className="text-muted-foreground" />
        {formatNumber(value ?? 0)}
      </div>
    </div>
  );
}