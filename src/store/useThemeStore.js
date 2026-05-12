import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'dark',
      toggleTheme: () => {
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }));
      },
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'bassroads-theme',
    }
  )
);

export default useThemeStore;