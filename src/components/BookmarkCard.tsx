import type { Bookmark } from "../types/bookmark";
import BookmarkCardHeader from "./BookmarkCardHeader";
import BookmarkTags from "./BookmarkTags";
import BookmarkCardFooter from "./BookmarkCardFooter";
import BookmarkCardActions from "./BookmarkCardActions";

type BookmarkCardProps = {
  bookmark: Bookmark;
};

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <div className="rounded-2xl border bg-card shadow-sm">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <BookmarkCardHeader bookmark={bookmark} />
          {/* DROPDOWN */}
          <BookmarkCardActions bookmark={bookmark} />
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-border" />

        {/* Description */}
        <p className="line-clamp-3 leading-7 text-muted-foreground">
          {bookmark.description}
        </p>

        {/* Tags */}
        <BookmarkTags tags={bookmark.tags} />
      </div>

      {/* Footer */}
      <BookmarkCardFooter bookmark={bookmark} />
    </div>
  );
}
