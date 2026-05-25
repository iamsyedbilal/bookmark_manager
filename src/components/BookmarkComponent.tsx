import BookmarkCard from "./BookmarkCard";
import SortBy from "./SortBy";
import data from "../../data.json";
import Heading from "./Heading";
import { useBookmarkStore } from "../store/bookmarkstore";

export default function BookmarkComponent() {
  const searchQuery = useBookmarkStore((state) => state.searchQuery);
  const activeCategory = useBookmarkStore((state) => state.activeCategory);
  const sortBy = useBookmarkStore((state) => state.sortBy);

  const filteredBookmarks = data.bookmarks.filter((bookmark) => {
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
          <h1>Item not available</h1>
        ) : (
          sortedBookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))
        )}
      </div>
    </div>
  );
}
