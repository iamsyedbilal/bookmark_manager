import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getBookmarks,
  getArchivedBookmarks,
  createBookmark,
  updateBookmark,
  archiveBookmark,
  unarchiveBookmark,
  deleteBookmark,
} from "./bookmark.service";
import { useBookmarkStore } from "../../store/bookmarkstore";
import type { BookmarkFormValues } from "../../components/bookmark.schema";

export function useBookmarks() {
  const {
    data = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
  });

  return {
    bookmarks: data,
    isPending,
    isError,
  };
}

export function useArchivedBookmarks() {
  return useQuery({
    queryKey: ["bookmarks", "archived"],
    queryFn: getArchivedBookmarks,
  });
}

export function useCreateBookmark() {
  const queryClient = useQueryClient();
  const { closeModal } = useBookmarkStore();

  return useMutation({
    mutationFn: createBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      toast.success("Bookmark added successfully");
      closeModal();
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateBookmark() {
  const queryClient = useQueryClient();
  const { closeModal } = useBookmarkStore();

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: BookmarkFormValues }) =>
      updateBookmark(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      toast.success("Bookmark updated successfully");
      closeModal();
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useArchiveBookmark() {
  const queryClient = useQueryClient();
  const { closeConfirm } = useBookmarkStore();

  return useMutation({
    mutationFn: archiveBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      toast.success("Bookmark archived");
      closeConfirm();
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUnarchiveBookmark() {
  const queryClient = useQueryClient();
  const { closeConfirm } = useBookmarkStore();

  return useMutation({
    mutationFn: unarchiveBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarks", "archived"] });
      toast.success("Bookmark unarchived");
      closeConfirm();
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteBookmark() {
  const queryClient = useQueryClient();
  const { closeConfirm } = useBookmarkStore();

  return useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks", "archived"] });
      toast.success("Bookmark deleted permanently");
      closeConfirm();
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
