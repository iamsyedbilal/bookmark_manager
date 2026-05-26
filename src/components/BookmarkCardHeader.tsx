import type { Bookmark } from "../types/bookmark";
type Props = {
  bookmark: Bookmark;
};

export default function BookmarkCardHeader({ bookmark }: Props) {
  return (
    <div className="flex gap-3">
      <img
        src={bookmark.favicon_url}
        alt={bookmark.title}
        className="
                h-12 w-12 rounded-xl
                border object-cover
              "
      />

      <div>
        <h2 className="text-xl font-bold">{bookmark.title}</h2>

        <p className="text-sm text-muted-foreground">
          {new URL(bookmark.url).hostname}
        </p>
      </div>
    </div>
  );
}
