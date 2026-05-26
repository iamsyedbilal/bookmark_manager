import BookmarkCard from "../components/BookmarkCard";
import Heading from "../components/Heading";
import SortBy from "../components/SortBy";
import { useBookmarkStore } from "../store/bookmarkstore";
import { useArchivedBookmarks } from "../features/bookmarks/bookmark.queries";

export default function Archived() {
  const { data: archivedBookmarks = [] } = useArchivedBookmarks();
  const sortBy = useBookmarkStore((state) => state.sortBy);

  const sortedBookmarks = [...archivedBookmarks].sort((a, b) => {
    if (sortBy === "recently-added") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    if (sortBy === "recently-visited") {
      return (
        new Date(b.last_visited ?? 0).getTime() -
        new Date(a.last_visited ?? 0).getTime()
      );
    }

    if (sortBy === "most-visited") {
      return b.visit_count - a.visit_count;
    }

    return 0;
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading heading="Archived bookmarks" />
        <SortBy />
      </div>

      <div className="py-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sortedBookmarks.length === 0 ? (
          <h1>No archived bookmarks</h1>
        ) : (
          sortedBookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))
        )}
      </div>
    </div>
  );
}
