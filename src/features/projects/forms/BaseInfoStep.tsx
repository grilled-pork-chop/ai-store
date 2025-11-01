import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import MarkdownViewer from "@/components/common/MarkdownViewer"

export default function BaseInfoStep({ formData, set, onNext, onBack }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            value={formData.name || ""}
            onChange={(e) => set({ name: e.target.value })}
            placeholder="My awesome project"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <Input
            value={formData.author || ""}
            onChange={(e) => set({ author: e.target.value })}
            placeholder="Your name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Short Description</label>
        <Textarea
          value={formData.description || ""}
          onChange={(e) => set({ description: e.target.value })}
          placeholder="A quick summary for cards…"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Detailed Description (Markdown)</label>
        <Tabs defaultValue="write">
          <TabsList>
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="write">
            <Textarea
              value={formData.detailedDescription || ""}
              onChange={(e) => set({ detailedDescription: e.target.value })}
              className="h-64"
            />
          </TabsContent>
          <TabsContent value="preview">
            <MarkdownViewer content={formData.detailedDescription || "*Nothing yet…*"} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" type="button" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  )
}
