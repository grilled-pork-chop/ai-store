import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeStoreState {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStoreState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'light',
        toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
      }),
      { name: 'theme-store' }
    ),
    { name: 'ThemeStore' }
  )
);