import { Link } from "@tanstack/react-router";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Heart } from "lucide-react";
import { formatDate, formatNumber } from "@/lib/format";
import type { Project } from "../types";
import { ProjectIcon } from "./ProjectIcon";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/project/$projectId"
      params={{ projectId: project.id }}
      className="block h-full"
    >
      <Card className="h-full flex flex-col transition hover:bg-accent/30 hover:shadow-sm">
        <CardHeader className="space-y-1 pb-2">
          <h3 className="font-semibold leading-tight line-clamp-1 flex items-center gap-1">
            <ProjectIcon
              type={project.projectType}
              className="text-muted-foreground"
              size={14}
            />
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {project.author}
          </p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between pb-3">
          <p className="text-sm text-foreground/90 line-clamp-2 mb-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1 mt-auto">
            <Badge>{project.projectType}</Badge>
            {project.framework && (
              <Badge variant="outline">{project.framework}</Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center border-t pt-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Heart size={13} className="text-pink-500" />
            {formatNumber(project.favorites ?? 0)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Download size={13} />
            {formatNumber(project.downloads ?? 0)}
          </span>
          <span>{formatDate(project.lastUpdated)}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
