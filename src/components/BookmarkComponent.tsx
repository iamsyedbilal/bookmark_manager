import BookmarkCard from "./BookmarkCard";
import SortBy from "./SortBy";
import Heading from "./Heading";
import { useBookmarkStore } from "../store/bookmarkstore";
import { useBookmarks } from "../features/bookmarks/bookmark.queries";

export default function BookmarkComponent() {
  const { bookmarks } = useBookmarks();

  const searchQuery = useBookmarkStore((state) => state.searchQuery);
  const activeCategory = useBookmarkStore((state) => state.activeCategory);
  const sortBy = useBookmarkStore((state) => state.sortBy);

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch = bookmark.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory.length === 0 ||
      bookmark.tags.some((tag) => activeCategory.includes(tag));

    return matchesSearch && matchesCategory;
  });

  const sortedBookmarks = [...filteredBookmarks].sort((a, b) => {
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
        <Heading
          heading={
            searchQuery ? (
              <>
                Results for:{" "}
                <span className="text-primary">"{searchQuery}"</span>
              </>
            ) : activeCategory.length > 0 ? (
              <>
                Filtered by:{" "}
                <span className="text-primary">
                  {activeCategory.join(", ")}
                </span>
              </>
            ) : (
              "All bookmarks"
            )
          }
        />
        <SortBy />
      </div>
      <div
        className="
        py-6
       grid grid-cols-1
    gap-6
    md:grid-cols-2
    xl:grid-cols-3
        ">
        {sortedBookmarks.length === 0 ? (
          <h1>No bookmarks</h1>
        ) : (
          sortedBookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))
        )}
      </div>
    </div>
  );
}
