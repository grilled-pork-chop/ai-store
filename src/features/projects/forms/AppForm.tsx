import { Input } from '@/components/ui/input';

export default function AppForm({ formData, set }: { formData: any; set: (patch: any) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Backend</label>
          <Input
            value={String(formData.technicalSpecs?.backend || '')}
            onChange={(e) => set({ technicalSpecs: { ...formData.technicalSpecs, backend: e.target.value } })}
            placeholder="FastAPI / Node / Go"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Frontend</label>
          <Input
            value={String(formData.technicalSpecs?.frontend || '')}
            onChange={(e) => set({ technicalSpecs: { ...formData.technicalSpecs, frontend: e.target.value } })}
            placeholder="React / Svelte / Vue"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Demo URL</label>
          <Input
            value={formData.links?.demo || ''}
            onChange={(e) => set({ links: { ...formData.links, demo: e.target.value } })}
            placeholder="https://demo.example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">API URL</label>
          <Input
            value={formData.links?.api || ''}
            onChange={(e) => set({ links: { ...formData.links, api: e.target.value } })}
            placeholder="https://api.example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Repository</label>
          <Input
            value={formData.links?.github || ''}
            onChange={(e) => set({ links: { ...formData.links, github: e.target.value } })}
            placeholder="https://github.com/..."
          />
        </div>
      </div>
    </div>
  );
}
