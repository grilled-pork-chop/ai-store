import type { ProjectType } from "../types"
import ModelForm from "./ModelForm"
import AppForm from "./AppForm"
import MCPToolForm from "./MCPToolForm"
import DatasetForm from "./DatasetForm"

export default function TypeSpecificStep({ type, formData, set }: { type: ProjectType; formData: any; set: any }) {
  switch (type) {
    case "Model":
      return <ModelForm formData={formData} set={set} />
    case "App":
      return <AppForm formData={formData} set={set} />
    case "MCP Tool":
      return <MCPToolForm formData={formData} set={set} />
    case "Dataset":
      return <DatasetForm formData={formData} set={set} />
    default:
      return null
  }
}
