import { create } from "zustand";

interface BookmarkStore {
  isSidebarOpen: boolean;
  activeCategory: string | null;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  setActiveCategory: (category: string | null) => void;
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  isSidebarOpen: false,
  activeCategory: null,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  setActiveCategory: (category) => set({ activeCategory: category }),
}));
