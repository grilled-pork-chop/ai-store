export const PROJECT_TYPES = [
  "Model",
  "App",
  "Dataset",
  "MCP Tool",
] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export const SORT_TYPES = ["downloads", "favorites", "updated"] as const;
export type SortType = (typeof SORT_TYPES)[number];

export interface BaseProject {
  id: string
  name: string
  author: string
  description: string
  detailedDescription?: string
  projectType: ProjectType
  lastUpdated: Date
  favorites: number
  downloads: number
  tags?: string[]
  license?: string
  framework?: string
  links?: Record<string, string>
  uploadedFiles?: UploadedFile[]
  metrics?: Metrics
}

export interface Metrics {
  downloadsHistory: number[]
}

export interface UploadedFile {
  name: string
  size: number
  type: "weights" | "config" | "dataset" | "archive" | "other"
  displayName?: string
  description?: string
  ref?: string
}

/** === Specialized types === */

export interface ModelProject extends BaseProject {
  projectType: "Model"
  technicalSpecs: {
    architecture?: string
    parameters?: string
    baseModel?: string
    contextLength?: string
    task?: string
    backend?: string
  }
}

export interface ApplicationProject extends BaseProject {
  projectType: "App"
  technicalSpecs: {
    backend?: string
    frontend?: string
    runtime?: string
    demoUrl?: string
  }
}

export interface MCPToolProject extends BaseProject {
  projectType: "MCP Tool"
  technicalSpecs: {
    protocolVersion?: string
    entryCommand?: string
    compatibleFrameworks?: string[]
  }
}

export interface DatasetProject extends BaseProject {
  projectType: "Dataset"
  technicalSpecs: {
    sizeGB?: string
    numSamples?: string
    format?: string
    source?: string
    labeling?: string
  }
}

export type Project =
  | ModelProject
  | ApplicationProject
  | MCPToolProject
  | DatasetProject