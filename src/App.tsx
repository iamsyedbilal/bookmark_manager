import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Toaster } from "./components/ui/sonner";
import ThemeProvider from "./components/ThemeProvider";

export default function App() {
  return (
    <div className="min-h-screen bg-background ">
      <ThemeProvider />
      <div className="flex ">
        {/* Sidebar — fixed on desktop, overlay on mobile */}
        <Sidebar />

        {/* Main content — pushed right on desktop */}
        <div className="flex flex-col flex-1 min-h-screen lg:ml-72">
          <Navbar />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
