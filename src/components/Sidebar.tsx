import { X, House, Archive } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { useBookmarkStore } from "../store/bookmarkstore";
import data from "../../data.json";

const navLinks = [
  { to: "/", label: "Home", icon: House },
  { to: "/archived", label: "Archived", icon: Archive },
];

// ✅ dynamically generate categories from bookmarks
const categories = Array.from(
  data.bookmarks.reduce((acc, bookmark) => {
    bookmark.tags.forEach((tag) => {
      acc.set(tag, (acc.get(tag) || 0) + 1);
    });
    return acc;
  }, new Map<string, number>()),
).map(([name, count]) => ({
  name,
  count,
}));

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar, activeCategory, toggleCategory } =
    useBookmarkStore();

  return (
    <>
      {/* Mobile overlay — only shows when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-60 w-72 border-r bg-background",
          "flex flex-col transform  transition-transform duration-300 ease-in-out",
          "-translate-x-full",
          isSidebarOpen && "translate-x-0",
          "lg:translate-x-0",
        )}>
        {/* Logo header — always visible in sidebar */}
        <div className="flex h-16 shrink-0 items-center  px-6">
          <img
            src="/assets/images/logo-light-theme.svg"
            alt="logo"
            className="h-8 w-fit dark:hidden"
          />

          <img
            src="/assets/images/logo-dark-theme.svg"
            alt="logo"
            className="hidden h-8 w-fit dark:block"
          />

          {/* Close button — mobile only */}
          <Button
            variant="ghost"
            size="icon"
            onClick={closeSidebar}
            className="ml-auto lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          {/* Nav links */}
          <nav className="space-y-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end
                onClick={closeSidebar}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )
                }>
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Categories */}
          <div className="mt-6">
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tags
            </p>
            <div className="space-y-1">
              {categories.map((category) => {
                const isActive = activeCategory.includes(category.name);

                return (
                  <button
                    key={category.name}
                    onClick={() => toggleCategory(category.name)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "h-4 w-4 rounded border",
                          isActive && "border-primary bg-primary",
                        )}
                      />
                      <span>{category.name}</span>
                    </div>

                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
