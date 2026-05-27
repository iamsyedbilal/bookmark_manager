import {
  Archive,
  ArchiveRestore,
  Copy,
  Delete,
  EllipsisVertical,
  Eye,
  Pencil,
} from "lucide-react";
import type { Bookmark } from "../types/bookmark";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { useBookmarkStore } from "../store/bookmarkstore";
import { useTrackVisit } from "../features/bookmarks/bookmark.queries";

type Props = {
  bookmark: Bookmark;
};

export default function BookmarkCardActions({ bookmark }: Props) {
  const location = useLocation();
  const isArchivedPage = location.pathname === "/archived";
  const { openEditModal, openConfirm } = useBookmarkStore();
  const { mutate: track } = useTrackVisit();

  function handleVisit() {
    window.open(bookmark.url, "_blank");
    track({ id: bookmark.id, currentCount: bookmark.visit_count });
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(bookmark.url);
      toast(`Copied! ${bookmark.url}`);
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-xl border p-2 hover:bg-muted">
          <EllipsisVertical className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={handleVisit}>
          <Eye className="mr-2 h-4 w-4" /> Visit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyUrl}>
          <Copy className="mr-2 h-4 w-4" /> Copy URL
        </DropdownMenuItem>

        {!isArchivedPage && (
          <>
            <DropdownMenuItem onClick={() => openConfirm("archive", bookmark)}>
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openEditModal(bookmark)}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
          </>
        )}

        {isArchivedPage && (
          <>
            <DropdownMenuItem
              onClick={() => openConfirm("unarchive", bookmark)}>
              <ArchiveRestore className="mr-2 h-4 w-4" />
              Unarchive
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openConfirm("delete", bookmark)}>
              <Delete className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
