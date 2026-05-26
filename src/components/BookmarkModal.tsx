import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { bookmarkSchema, type BookmarkFormValues } from "./bookmark.schema";
import {
  useCreateBookmark,
  useUpdateBookmark,
} from "../features/bookmarks/bookmark.queries";

import { useBookmarkStore } from "../store/bookmarkstore";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { toast } from "sonner";

export default function BookmarkModal() {
  const createMutation = useCreateBookmark();
  const updateMutation = useUpdateBookmark();

  const { isModalOpen, closeModal, modalMode, selectedBookmark } =
    useBookmarkStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookmarkFormValues>({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
      tags: "",
    },
  });

  useEffect(() => {
    if (selectedBookmark && modalMode === "edit") {
      reset({
        title: selectedBookmark.title,
        description: selectedBookmark.description,
        url: selectedBookmark.url,
        tags: Array.isArray(selectedBookmark.tags)
          ? selectedBookmark.tags.join(", ")
          : "",
      });
    } else {
      reset({
        title: "",
        description: "",
        url: "",
        tags: "",
      });
    }
  }, [selectedBookmark, modalMode, reset]);

  async function onSubmit(values: BookmarkFormValues) {
    try {
      if (modalMode === "add") {
        await createMutation.mutateAsync(values);
        toast.success("Bookmark created");
      }

      if (modalMode === "edit" && selectedBookmark) {
        await updateMutation.mutateAsync({
          id: selectedBookmark.id,
          values,
        });

        toast.success("Bookmark updated");
      }

      closeModal();
      reset();
    } catch (error) {
      console.error(error);
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-lg rounded-2xl p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold">
            {modalMode === "add" ? "Add Bookmark" : "Edit Bookmark"}
          </DialogTitle>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {modalMode === "add"
              ? "Save and organize your favorite links with automatic favicon detection."
              : "Update your bookmark details including title, URL, description, and tags."}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-2">
          {/* Title */}
          <div className="space-y-1">
            <Label>Title *</Label>
            <Input
              placeholder="Enter title"
              className="h-11 rounded-lg"
              {...register("title")}
            />
            <p className="text-xs text-red-500">{errors.title?.message}</p>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label>Description *</Label>
            <Textarea
              placeholder="Enter description"
              className="min-h-22.5 rounded-lg"
              {...register("description")}
            />
            <p className="text-xs text-red-500">
              {errors.description?.message}
            </p>
          </div>

          {/* URL */}
          <div className="space-y-1">
            <Label>Website URL *</Label>
            <Input
              placeholder="https://example.com"
              className="h-11 rounded-lg"
              {...register("url")}
            />
            <p className="text-xs text-red-500">{errors.url?.message}</p>
          </div>

          {/* Tags */}
          <div className="space-y-1">
            <Label>Tags *</Label>
            <Input
              placeholder="Design, Learning, Tools"
              className="h-11 rounded-lg"
              {...register("tags")}
            />
            <p className="text-xs text-red-500">{errors.tags?.message}</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : modalMode === "add"
                  ? "Add Bookmark"
                  : "Update Bookmark"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
