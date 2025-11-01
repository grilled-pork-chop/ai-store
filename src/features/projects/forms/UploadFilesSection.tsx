import { useState, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload, Trash2 } from "lucide-react"
import type { UploadedFile } from "../types"

interface Props {
  formData: any
  set: (patch: any) => void
}

export default function UploadFilesSection({ formData, set }: Props) {
  const [files, setFiles] = useState<UploadedFile[]>(formData.uploadedFiles || [])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    if (!selected.length) return

    const newUploads: UploadedFile[] = selected.map((f) => ({
      name: f.name,
      size: f.size,
      type: detectFileType(f.name),
      displayName: f.name,
      description: "",
    }))

    const merged = [...files, ...newUploads]
    setFiles(merged)
    set({ uploadedFiles: merged })
  }

  const handleRemove = (index: number) => {
    const updated = files.filter((_, i) => i !== index)
    setFiles(updated)
    set({ uploadedFiles: updated })
  }

  const handleFieldChange = (index: number, field: keyof UploadedFile, value: string) => {
    const updated = [...files]
    updated[index] = { ...updated[index], [field]: value }
    setFiles(updated)
    set({ uploadedFiles: updated })
  }

  const detectFileType = (name: string): UploadedFile["type"] => {
    const ext = name.split(".").pop()?.toLowerCase()
    if (!ext) return "other"
    if (["pt", "onnx", "bin"].includes(ext)) return "weights"
    if (["json", "csv", "parquet"].includes(ext)) return "dataset"
    if (["yaml", "yml", "cfg"].includes(ext)) return "config"
    if (["zip", "tar", "gz"].includes(ext)) return "archive"
    return "other"
  }

  return (
    <section className="space-y-4">
      <Label className="text-base font-medium">Upload Files</Label>

      <Card className="border-dashed border-muted-foreground/30 bg-muted/30">
        <CardContent className="p-6 flex flex-col items-center justify-center space-y-3">
          <Upload className="h-6 w-6 text-muted-foreground" />
          <Label
            htmlFor="file-upload"
            className="cursor-pointer text-sm text-primary hover:underline"
          >
            Choose files
          </Label>
          <Input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-xs text-muted-foreground">
            You can select multiple files
          </p>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <ul className="divide-y rounded-md border bg-card">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex flex-col gap-2 p-3 hover:bg-muted/40 transition-colors"
            >
              {/* Header: filename + actions */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">{f.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(f.size / 1024 / 1024).toFixed(2)} MB • {f.type}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-destructive shrink-0"
                  onClick={() => handleRemove(i)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Inline editable fields */}
              <div className="grid sm:grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs text-muted-foreground">Display Name</Label>
                  <Input
                    value={f.displayName ?? ""}
                    placeholder="Friendly name"
                    onChange={(e) =>
                      handleFieldChange(i, "displayName", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-1">
                  <Label className="text-xs text-muted-foreground">Description</Label>
                  <Input
                    value={f.description ?? ""}
                    placeholder="Short note..."
                    onChange={(e) =>
                      handleFieldChange(i, "description", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

    </section>
  )
}
