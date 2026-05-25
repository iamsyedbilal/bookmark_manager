import { useBookmarkStore } from "../store/bookmarkstore";
import { Button } from "./ui/button";

export default function ConfirmModal() {
  const { confirmAction, confirmBookmark, closeConfirm, executeConfirm } =
    useBookmarkStore();

  if (!confirmAction || !confirmBookmark) return null;

  const titleMap = {
    archive: "Archive Bookmark?",
    unarchive: "Unarchive Bookmark?",
    delete: "Delete Permanently?",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-96 rounded-xl bg-background dark:bg-card p-6 ">
        <h2 className="text-lg font-bold">{titleMap[confirmAction]}</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Are you sure you want to
          <span className="font-semibold">{confirmAction}</span> "
          {confirmBookmark.title}"?
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            onClick={closeConfirm}
            className="rounded-lg border px-4 py-2">
            Cancel
          </Button>

          <Button onClick={executeConfirm} className="rounded-lg  px-4 py-2 ">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
