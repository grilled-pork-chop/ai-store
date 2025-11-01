import type { ProjectType } from "../types"
import { Button } from "@/components/ui/button"
import { ProjectIcon } from "../components/ProjectIcon"

const TYPE_HINT: Record<ProjectType, string> = {
  Model: "Trainable or pre-trained AI model.",
  App: "Deployed app or demo using AI models.",
  "MCP Tool": "Tool following the MCP protocol for agents.",
  Dataset: "Curated dataset for training or benchmarking.",
}

interface Props {
  selectedType: ProjectType
  setSelectedType: (type: ProjectType) => void
  onNext: () => void
}

export default function ProjectTypeStep({ selectedType, setSelectedType, onNext }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.keys(TYPE_HINT) as ProjectType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            type="button"
            className={`rounded-lg border p-4 text-left transition-colors ${
              selectedType === type ? "border-primary bg-muted/40" : "hover:bg-muted"
            }`}
          >
            <ProjectIcon type={type} size={24} className="mb-2 text-muted-foreground" />
            <div className="font-medium">{type}</div>
            <p className="text-xs text-muted-foreground">{TYPE_HINT[type]}</p>
          </button>
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={onNext}>Continue</Button>
      </div>
    </div>
  )
}