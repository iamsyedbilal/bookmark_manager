import { create } from "zustand";
import type { Bookmark } from "../types/bookmark";

type ConfirmAction = "archive" | "unarchive" | "delete" | null;

interface BookmarkStore {
  // Sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;

  // Category filter
  activeCategory: string[];
  toggleCategory: (category: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (value: string) => void;

  // Sort
  sortBy: "recently-added" | "recently-visited" | "most-visited" | "";
  setSortBy: (
    value: "recently-added" | "recently-visited" | "most-visited",
  ) => void;

  // Modal
  isModalOpen: boolean;
  modalMode: "add" | "edit";
  selectedBookmark: Bookmark | null;
  openAddModal: () => void;
  openEditModal: (bookmark: Bookmark) => void;
  closeModal: () => void;

  // Confirm dialog
  confirmAction: ConfirmAction;
  confirmBookmark: Bookmark | null;
  openConfirm: (
    action: Exclude<ConfirmAction, null>,
    bookmark: Bookmark,
  ) => void;
  closeConfirm: () => void;
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  // Sidebar
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),

  // Category filter
  activeCategory: [],
  toggleCategory: (category) =>
    set((state) => ({
      activeCategory: state.activeCategory.includes(category)
        ? state.activeCategory.filter((c) => c !== category)
        : [...state.activeCategory, category],
    })),

  // Search
  searchQuery: "",
  setSearchQuery: (value) => set({ searchQuery: value }),

  // Sort
  sortBy: "",
  setSortBy: (value) => set({ sortBy: value }),

  // Modal
  isModalOpen: false,
  modalMode: "add",
  selectedBookmark: null,
  openAddModal: () =>
    set({ isModalOpen: true, modalMode: "add", selectedBookmark: null }),
  openEditModal: (bookmark) =>
    set({ isModalOpen: true, modalMode: "edit", selectedBookmark: bookmark }),
  closeModal: () => set({ isModalOpen: false, selectedBookmark: null }),

  // Confirm dialog
  confirmAction: null,
  confirmBookmark: null,
  openConfirm: (action, bookmark) =>
    set({ confirmAction: action, confirmBookmark: bookmark }),
  closeConfirm: () => set({ confirmAction: null, confirmBookmark: null }),
}));
