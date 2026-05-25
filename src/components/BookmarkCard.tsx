import { useLocation } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  Copy,
  EllipsisVertical,
  Eye,
  Pencil,
  PinOff,
  Archive,
  Pin,
  Delete,
  ArchiveRestore,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useBookmarkStore } from "../store/bookmarkstore";
import { toast } from "sonner";

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

type BookmarkCardProps = {
  bookmark: Bookmark;
};

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const location = useLocation();
  const isArchivedPage = location.pathname === "/archived";
  const { openEditModal, archivedBookmarks, openConfirm } = useBookmarkStore();
  const {
    title,
    url,
    favicon,
    description,
    tags,
    visitCount,
    createdAt,
    pinned,
    lastVisited,
  } = bookmark;

  const isArchived = archivedBookmarks.some((b) => b.id === bookmark.id);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);

      toast(`Copied! ${url}`);
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };

  return (
    <div className="rounded-2xl border bg-card shadow-sm">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <img
              src={favicon}
              alt={title}
              className="
                h-12 w-12 rounded-xl
                border object-cover
              "
            />

            <div>
              <h2 className="text-xl font-bold">{title}</h2>

              <p className="text-sm text-muted-foreground">
                {new URL(url).hostname}
              </p>
            </div>
          </div>

          {/* DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className=" rounded-xl border p-2 hover:bg-muted ">
                <EllipsisVertical className="h-5 w-5" />{" "}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {/* COMMON */}
              <DropdownMenuItem onSelect={() => window.open(url, "_blank")}>
                <Eye className="mr-2 h-4 w-4" /> Visit{" "}
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleCopyUrl}>
                <Copy className="mr-2 h-4 w-4" /> Copy URL{" "}
              </DropdownMenuItem>

              {/* NORMAL PAGE ACTIONS */}
              {!isArchivedPage && (
                <>
                  <DropdownMenuItem
                    onClick={() =>
                      openConfirm(
                        isArchived ? "unarchive" : "archive",
                        bookmark,
                      )
                    }>
                    <Archive className="mr-2 h-4 w-4" />
                    {isArchived ? "Unarchive" : "Archive"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openEditModal(bookmark)}>
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {pinned ? (
                      <PinOff className="mr-2 h-4 w-4" />
                    ) : (
                      <Pin className="mr-2 h-4 w-4" />
                    )}
                    {pinned ? "Unpin" : "Pin"}
                  </DropdownMenuItem>
                </>
              )}

              {/* ARCHIVED PAGE ACTIONS */}
              {isArchivedPage && (
                <>
                  <DropdownMenuItem
                    onClick={() => openConfirm("unarchive", bookmark)}>
                    <ArchiveRestore className="mr-2 h-4 w-4" />
                    Unarchive
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => openConfirm("delete", bookmark)}>
                    <Delete className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-border" />

        {/* Description */}
        <p className="line-clamp-3 leading-7 text-muted-foreground">
          {description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="
                rounded-md bg-muted
                px-2 py-1 text-sm
              ">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="
          flex items-center gap-6
          border-t px-4 py-3
          text-sm text-muted-foreground
        ">
        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          {visitCount}
        </div>

        <div className="flex items-center gap-1">
          <Clock3 className="h-4 w-4" />
          {lastVisited
            ? new Date(lastVisited).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })
            : "Never"}
        </div>

        <div className="flex items-center gap-1">
          <CalendarDays className="h-4 w-4" />
          {new Date(createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })}
        </div>
      </div>
    </div>
  );
}
