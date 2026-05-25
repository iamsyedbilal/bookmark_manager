import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

import { useBookmarkStore } from "../store/bookmarkstore";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function BookmarkModal() {
  const { isModalOpen, closeModal, modalMode, selectedBookmark } =
    useBookmarkStore();

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {modalMode === "add" ? "Add Bookmark" : "Edit Bookmark"}
          </DialogTitle>
        </DialogHeader>

        {/* TEMP FORM */}
        <div>
          <p className="text-sm">
            {modalMode === "add"
              ? "Save a link with details to keep your collection organized. We extract the favicon automatically from the URL."
              : "Update your saved link details — change the title, description, URL, or tags anytime."}
          </p>
        </div>
        <div className="space-y-3">
          <Label>Title *</Label>
          <Input
            className="w-full border p-2"
            placeholder="Title"
            defaultValue={selectedBookmark?.title}
          />

          <Label>Description *</Label>
          <Textarea
            className="w-full border p-2"
            placeholder="Description"
            defaultValue={selectedBookmark?.description}
          />

          <Label>Website URL *</Label>
          <Input
            className="w-full border p-2"
            placeholder="URL"
            defaultValue={selectedBookmark?.url}
          />

          <Label>Tags *</Label>
          <Input
            className="w-full border p-2"
            placeholder="e.g. Design, Learning, Tools"
            defaultValue={selectedBookmark?.tags}
          />

          <div className="flex justify-end gap-2 py-2">
            <Button className="py-2 rounded" onClick={closeModal}>
              Cancel
            </Button>
            <Button className="py-2 rounded">
              {modalMode === "add" ? "Add Bookmark" : "Edit Bookmark"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
