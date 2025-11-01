import SearchBar from '@/features/projects/components/SearchBar';
import TopFilterBar from '@/features/projects/components/TopFilterBar';
import ResultsHeader from '@/features/projects/components/ResultsHeader';
import ProjectGrid from '@/features/projects/components/ProjectGrid';

export default function HomePage() {
  return (
    <>
      <SearchBar />
      <TopFilterBar />
      <ResultsHeader />
      <ProjectGrid />
    </>
  );
}