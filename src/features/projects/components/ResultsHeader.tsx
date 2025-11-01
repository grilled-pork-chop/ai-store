import { useProjects, useFilters } from '@/features/projects/hooks';
import { SORT_TYPES, type SortType } from '@/features/projects/types';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export default function ResultsHeader() {
  const { projects } = useProjects();
  const { sort, set } = useFilters();

  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>{projects.length} projects found</span>
      <Select value={sort} onValueChange={(v: SortType) => set('sort', v)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          {SORT_TYPES.map((s) => (
            <SelectItem key={s} value={s}>
              {s === 'downloads'
                ? 'Most Downloaded'
                : s === 'favorites'
                  ? 'Most Starred'
                  : 'Recently Updated'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
