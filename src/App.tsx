import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Toaster } from "./components/ui/sonner";
import ThemeProvider from "./components/ThemeProvider";
import BookmarkModal from "./components/BookmarkModal";
import ConfirmModal from "./components/ConfirmModal";

export default function App() {
  return (
    <div className="min-h-screen bg-background ">
      <BookmarkModal />
      <ConfirmModal />
      <ThemeProvider />
      <div className="flex ">
        {/* Sidebar — fixed on desktop, overlay on mobile */}
        <Sidebar />

        {/* Main content — pushed right on desktop */}
        <div className="flex flex-col flex-1 min-h-screen lg:ml-72">
          <Navbar />
          <main className="flex-1 p-6 bg-accent dark:bg-background">
            <Outlet />
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
