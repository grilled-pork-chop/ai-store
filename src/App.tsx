import { useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';
import { useThemeStore } from '@/stores/theme';
import { Header } from '@/components/layout';
import DynamicBreadcrumb from "@/components/layout/DynamicBreadcrumb"
import { useProjects } from "@/features/projects/hooks"

export default function App() {
  const theme = useThemeStore((state) => state.theme);
  useProjects()

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [theme]);


  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 space-y-4">
          <DynamicBreadcrumb/>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
