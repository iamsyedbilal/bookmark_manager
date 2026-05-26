import { useBookmarkStore } from "../store/bookmarkstore";
import { Button } from "./ui/button";
import {
  useArchiveBookmark,
  useUnarchiveBookmark,
  useDeleteBookmark,
} from "../features/bookmarks/bookmark.queries";

export default function ConfirmModal() {
  const { confirmAction, confirmBookmark, closeConfirm } = useBookmarkStore();
  const { mutate: archive, isPending: archiving } = useArchiveBookmark();
  const { mutate: unarchive, isPending: unarchiving } = useUnarchiveBookmark();
  const { mutate: deleteB, isPending: deleting } = useDeleteBookmark();

  if (!confirmAction || !confirmBookmark) return null;

  const isPending = archiving || unarchiving || deleting;

  const titleMap = {
    archive: "Archive Bookmark?",
    unarchive: "Unarchive Bookmark?",
    delete: "Delete Permanently?",
  };

  function handleConfirm() {
    if (confirmAction === "archive") archive(confirmBookmark!.id);
    if (confirmAction === "unarchive") unarchive(confirmBookmark!.id);
    if (confirmAction === "delete") deleteB(confirmBookmark!.id);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-96 rounded-xl bg-background dark:bg-card p-6">
        <h2 className="text-lg font-bold">{titleMap[confirmAction]}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Are you sure you want to{" "}
          <span className="font-semibold">{confirmAction}</span> "
          {confirmBookmark.title}"?
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={closeConfirm} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Processing..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
}
