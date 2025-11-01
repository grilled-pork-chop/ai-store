import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props {
  formData: any
  set: (patch: any) => void
}

export default function DatasetForm({ formData, set }: Props) {
  const t = formData.technicalSpecs ?? {}
  const update = (patch: Partial<typeof t>) =>
    set({ technicalSpecs: { ...t, ...patch } })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label>Format</Label>
          <Input
            value={t.format || ""}
            onChange={(e) => update({ format: e.target.value })}
            placeholder="CSV, JSON, TFRecord, etc."
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label>Size (GB)</Label>
          <Input
            type="number"
            value={t.sizeGB || ""}
            onChange={(e) => update({ sizeGB: e.target.value })}
            placeholder="e.g. 12.5"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label>Number of Samples</Label>
          <Input
            type="number"
            value={t.numSamples || ""}
            onChange={(e) => update({ numSamples: e.target.value })}
            placeholder="e.g. 10000"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label>Source</Label>
          <Input
            value={t.source || ""}
            onChange={(e) => update({ source: e.target.value })}
            placeholder="Kaggle, Common Crawl, etc."
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
        <Label>Labeling Details</Label>
        <Input
          value={t.labeling || ""}
          onChange={(e) => update({ labeling: e.target.value })}
          placeholder="Annotation format or process"
        />
      </div>
      </div>
    </div>
  )
}
