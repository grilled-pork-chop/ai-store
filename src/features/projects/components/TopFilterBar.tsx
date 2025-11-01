import { Button } from "@/components/ui/button";
import { useFilters } from "../hooks";
import { PROJECT_TYPES } from "../types";
import { ProjectIcon } from "@/features/projects/components/ProjectIcon";



export default function TopFilterBar() {
  const { projectTypes, toggleType, reset } = useFilters();

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {PROJECT_TYPES.map((type) => {
        const active = projectTypes.includes(type);
        return (
          <Button
            key={type}
            size="sm"
            variant={active ? "default" : "outline"}
            onClick={() => toggleType(type)}
            className={`rounded-full px-4 font-medium transition ${
              active ? "shadow-sm" : "hover:bg-accent"
            }`}
          >
        <ProjectIcon type={type} className="mr-1" size={14} />
          {type}
        </Button>
        );
      })}

      {projectTypes.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          className="text-muted-foreground hover:text-foreground ml-1"
        >
          Clear
        </Button>
      )}
    </div>
  );
}
