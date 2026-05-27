import { CalendarDays, Clock3, Eye } from "lucide-react";
import type { Bookmark } from "../types/bookmark";

type Props = {
  bookmark: Bookmark;
};

export default function BookmarkCardFooter({ bookmark }: Props) {
  console.log(bookmark);
  return (
    <div
      className="
          flex items-center gap-6
          border-t px-4 py-3
          text-sm text-muted-foreground
        ">
      <div className="flex items-center gap-1">
        <Eye className="h-4 w-4" />
        {bookmark.visit_count}
      </div>

      <div className="flex items-center gap-1">
        <Clock3 className="h-4 w-4" />
        {bookmark.last_visited
          ? new Date(bookmark.last_visited).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })
          : "Never"}
      </div>

      <div className="flex items-center gap-1">
        <CalendarDays className="h-4 w-4" />
        {new Date(bookmark.created_at).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        })}
      </div>
    </div>
  );
}
