
import type { ProjectType } from "@/features/projects/types";
import { Cpu, AppWindow, Database, Plug, Globe } from "lucide-react";

const ICONS: Record<ProjectType, React.ElementType> = {
  Model: Cpu,
  App: AppWindow,
  Dataset: Database,
  "MCP Tool": Plug
};

interface ProjectIconProps {
  type: ProjectType;
  className?: string;
  size?: number;
}

export function ProjectIcon({ type, className = "", size = 14 }: ProjectIconProps) {
  const Icon = ICONS[type] ?? Globe;
  return <Icon size={size} className={className} />;
}
