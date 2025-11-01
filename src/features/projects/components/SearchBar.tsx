import { Input } from "@/components/ui/input";
import { useFilters } from "@/features/projects/hooks";

export default function SearchBar() {
  const { search, set } = useFilters();

  return (
    <div className="mb-6 w-full">
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => set("search", e.target.value)}
          className="h-14 px-4 py-3 "
        />
      </div>
  );
}
