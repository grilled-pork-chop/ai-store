import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useProjectStore } from "../store"
import type { Project, ProjectType } from "../types"

import ProjectTypeStep from "./ProjectTypeStep"
import BaseInfoStep from "./BaseInfoStep"
import TypeSpecificStep from "./TypeSpecificStep"
import UploadFilesSection from "./UploadFilesSection"

type Step = 1 | 2 | 3

interface Props {
  initialProject?: Project
  onSubmit?: (project: Project) => void
  isEditing?: boolean
}

export default function ProjectForm({ initialProject, onSubmit, isEditing }: Props) {
  const add = useProjectStore((s) => s.add)
  const update = useProjectStore((s) => s.update)
  const [step, setStep] = useState<Step>(1)

  const [selectedType, setSelectedType] = useState<ProjectType>(
    initialProject?.projectType ?? "Model"
  )

  const [formData, setFormData] = useState<Partial<Project>>(
    initialProject ?? {
      name: "",
      author: "",
      description: "",
      detailedDescription: "",
      projectType: selectedType,
      technicalSpecs: {},
      links: {},
      uploadedFiles: [],
    }
  )

  const set = (patch: Partial<Project>) =>
    setFormData((prev) => ({ ...prev, ...patch } as Project))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const project = {
      ...(formData as Project),
      id: initialProject?.id ?? crypto.randomUUID(),
      projectType: selectedType,
      lastUpdated: new Date(),
      favorites: initialProject?.favorites ?? 0,
      downloads: initialProject?.downloads ?? 0,
    } as Project

    isEditing ? update(project.id, project) : add(project)
    onSubmit?.(project)
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center gap-2 text-sm mx-auto">
        <span className={step >= 1 ? "font-semibold" : "text-muted-foreground"}>1. Select the project type</span>
        <span>›</span>
        <span className={step >= 2 ? "font-semibold" : "text-muted-foreground"}>2. Add information</span>
        <span>›</span>
        <span className={step >= 3 ? "font-semibold" : "text-muted-foreground"}>3. Define specific details</span>
      </div>

      {step === 1 && (
        <ProjectTypeStep
          selectedType={selectedType}
          setSelectedType={(t) => {
            setSelectedType(t)
            set({ projectType: t })
          }}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <BaseInfoStep
          formData={formData}
          set={set}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <TypeSpecificStep type={selectedType} formData={formData} set={set} />
          <UploadFilesSection formData={formData} set={set} />
          <div className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button type="submit">
              {isEditing ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
