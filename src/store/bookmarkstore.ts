import { create } from "zustand";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags: string[];
  visitCount: number;
  createdAt: string;
  pinned: boolean;
  lastVisited: string | null;
};

type ConfirmAction = "archive" | "unarchive" | "delete" | null;

interface BookmarkStore {
  // UI
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;

  // category
  activeCategory: string[];
  toggleCategory: (category: string) => void;

  // modal
  isModalOpen: boolean;
  modalMode: "add" | "edit";
  selectedBookmark: Bookmark | null;

  openAddModal: () => void;
  openEditModal: (bookmark: Bookmark) => void;
  closeModal: () => void;

  // search
  searchQuery: string;
  setSearchQuery: (value: string) => void;

  // data
  archivedBookmarks: Bookmark[];

  archiveBookmark: (bookmark: Bookmark) => void;
  unarchiveBookmark: (id: string) => void;
  deleteBookmark: (id: string) => void;

  // confirm modal
  confirmAction: ConfirmAction;
  confirmBookmark: Bookmark | null;

  openConfirm: (
    action: Exclude<ConfirmAction, null>,
    bookmark: Bookmark,
  ) => void;
  closeConfirm: () => void;
  executeConfirm: () => void;

  sortBy: "recently-added" | "recently-visited" | "most-visited" | "";

  setSortBy: (
    value: "recently-added" | "recently-visited" | "most-visited",
  ) => void;
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  // UI
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),

  // category
  activeCategory: [],
  toggleCategory: (category) => {
    const current = get().activeCategory;
    const exists = current.includes(category);

    set({
      activeCategory: exists
        ? current.filter((c) => c !== category)
        : [...current, category],
    });
  },

  // modal
  isModalOpen: false,
  modalMode: "add",
  selectedBookmark: null,

  openAddModal: () =>
    set({ isModalOpen: true, modalMode: "add", selectedBookmark: null }),

  openEditModal: (bookmark) =>
    set({ isModalOpen: true, modalMode: "edit", selectedBookmark: bookmark }),

  closeModal: () => set({ isModalOpen: false, selectedBookmark: null }),

  // search
  searchQuery: "",
  setSearchQuery: (value) => set({ searchQuery: value }),

  // archive state
  archivedBookmarks: [],

  archiveBookmark: (bookmark) =>
    set((state) => {
      if (state.archivedBookmarks.some((b) => b.id === bookmark.id)) {
        return state;
      }
      return {
        archivedBookmarks: [...state.archivedBookmarks, bookmark],
      };
    }),

  unarchiveBookmark: (id) =>
    set((state) => ({
      archivedBookmarks: state.archivedBookmarks.filter((b) => b.id !== id),
    })),

  deleteBookmark: (id) =>
    set((state) => ({
      archivedBookmarks: state.archivedBookmarks.filter((b) => b.id !== id),
    })),

  // confirm modal
  confirmAction: null,
  confirmBookmark: null,

  openConfirm: (action, bookmark) =>
    set({
      confirmAction: action,
      confirmBookmark: bookmark,
    }),

  closeConfirm: () =>
    set({
      confirmAction: null,
      confirmBookmark: null,
    }),

  executeConfirm: () => {
    const { confirmAction, confirmBookmark } = get();

    if (!confirmBookmark || !confirmAction) return;

    if (confirmAction === "archive") {
      get().archiveBookmark(confirmBookmark);
    }

    if (confirmAction === "unarchive") {
      get().unarchiveBookmark(confirmBookmark.id);
    }

    if (confirmAction === "delete") {
      get().deleteBookmark(confirmBookmark.id);
    }

    set({ confirmAction: null, confirmBookmark: null });
  },

  sortBy: "",

  setSortBy: (value) => set({ sortBy: value }),
}));
