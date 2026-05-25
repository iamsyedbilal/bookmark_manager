import BookmarkCard from "../components/BookmarkCard";
import Heading from "../components/Heading";
import SortBy from "../components/SortBy";
import { useBookmarkStore } from "../store/bookmarkstore";

export default function Archived() {
  const archivedBookmarks = useBookmarkStore(
    (state) => state.archivedBookmarks,
  );
  const sortBy = useBookmarkStore((state) => state.sortBy);

  const sortedBookmarks = [...archivedBookmarks].sort((a, b) => {
    if (sortBy === "recently-added") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    if (sortBy === "recently-visited") {
      return (
        new Date(b.lastVisited ?? 0).getTime() -
        new Date(a.lastVisited ?? 0).getTime()
      );
    }

    if (sortBy === "most-visited") {
      return b.visitCount - a.visitCount;
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
