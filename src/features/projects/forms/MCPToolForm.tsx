import { Input } from '@/components/ui/input';

export default function MCPToolForm({ formData, set }: { formData: any; set: (patch: any) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="grid w-full max-w-sm items-center gap-3">
          <label className="mb-1 block text-sm font-medium">Protocol</label>
          <Input
            value={String(formData.technicalSpecs?.protocol || '')}
            onChange={(e) => set({ technicalSpecs: { ...formData.technicalSpecs, protocol: e.target.value } })}
            placeholder="MCP vX.Y"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <label className="mb-1 block text-sm font-medium">Version</label>
          <Input
            value={String(formData.technicalSpecs?.version || '')}
            onChange={(e) => set({ technicalSpecs: { ...formData.technicalSpecs, version: e.target.value } })}
            placeholder="e.g., 0.2.1"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <label className="mb-1 block text-sm font-medium">Entry Command</label>
          <Input
            value={String(formData.technicalSpecs?.entry || '')}
            onChange={(e) => set({ technicalSpecs: { ...formData.technicalSpecs, entry: e.target.value } })}
            placeholder="npx mcp-server ..."
          />
        </div>
              <div className="grid w-full max-w-sm items-center gap-3">
        <label className="mb-1 block text-sm font-medium">Compatible Frameworks</label>
        <Input
          value={String(formData.technicalSpecs?.compatible || '')}
          onChange={(e) => set({ technicalSpecs: { ...formData.technicalSpecs, compatible: e.target.value } })}
          placeholder="LangGraph, Pydantic-AI, AG2…"
        />
      </div>
      </div>

    </div>
  );
}
