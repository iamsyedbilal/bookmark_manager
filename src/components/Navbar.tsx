import { Plus, Search, Menu } from "lucide-react";
import { useBookmarkStore } from "../store/bookmarkstore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const { toggleSidebar, openAddModal, setSearchQuery } = useBookmarkStore();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur dark:bg-popover">
      <div className="flex h-16 items-center px-6 gap-4">
        {/* Mobile menu button — hidden on desktop */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleSidebar}>
          <Menu className="h-5 w-5 text-foreground" />
        </Button>

        {/* Search */}
        <div className="relative flex-1 min-w-0 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search by title..."
            className="pl-10 w-full text-sm"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          <Button className="py-4" onClick={openAddModal}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Bookmark</span>
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
