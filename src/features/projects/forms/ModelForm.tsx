import { Input } from '@/components/ui/input';

export default function ModelForm({ formData, set }: { formData: any; set: (patch: any) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Framework</label>
        <Input
          value={formData.framework || ''}
          onChange={(e) => set({ framework: e.target.value })}
          placeholder="PyTorch / TensorFlow / JAX / Transformers"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Architecture</label>
          <Input
            value={String(formData.technicalSpecs?.architecture || '')}
            onChange={(e) => set({ technicalSpecs: { ...formData.technicalSpecs, architecture: e.target.value } })}
            placeholder="e.g., Decoder-only Transformer"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Base Model</label>
          <Input
            value={String(formData.technicalSpecs?.baseModel || '')}
            onChange={(e) => set({ technicalSpecs: { ...formData.technicalSpecs, baseModel: e.target.value } })}
            placeholder="e.g., Llama-2-7B"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Parameters</label>
          <Input
            value={String(formData.technicalSpecs?.parameters || '')}
            onChange={(e) => set({ technicalSpecs: { ...formData.technicalSpecs, parameters: e.target.value } })}
            placeholder="e.g., 7B"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Context Length</label>
          <Input
            value={String(formData.technicalSpecs?.context || '')}
            onChange={(e) => set({ technicalSpecs: { ...formData.technicalSpecs, context: e.target.value } })}
            placeholder="e.g., 128k"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Tasks</label>
          <Input
            value={String(formData.technicalSpecs?.tasks || '')}
            onChange={(e) => set({ technicalSpecs: { ...formData.technicalSpecs, tasks: e.target.value } })}
            placeholder="e.g., chat, code, RAG"
          />
        </div>
      </div>
    </div>
  );
}
