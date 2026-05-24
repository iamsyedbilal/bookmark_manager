import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLogout } from "../features/auth/auth.queries";
import { useUser } from "../features/auth/auth.queries";
import { useThemeStore } from "../store/theme";
import { Sun, Moon, LogOut, Palette } from "lucide-react";

export default function UserMenu() {
  const { user } = useUser();
  const { setTheme, theme } = useThemeStore();

  const { logout, isPending } = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-muted"
        >
          <img src="/assets/images/image-avatar.webp" alt="Avatar image" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 border border-border bg-card text-foreground"
      >
        <div className="px-2 py-1.5 flex items-center gap-2">
          <img
            src="/assets/images/image-avatar.webp"
            alt="Avatar image"
            className="w-8"
          />
          <div>
            <p className="text-sm font-medium">
              {user?.user_metadata?.full_name}
            </p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className=" cursor-pointer flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Theme</span>
          </div>
          <div className="flex items-center gap-1 rounded-md border bg-muted p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme("light")}
              className={`h-4 w-4 rounded-sm ${
                theme === "light" ? "bg-background shadow-sm" : ""
              }`}
            >
              <Sun className="h-3 w-3 text-foreground" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme("dark")}
              className={`h-4 w-4 rounded-sm ${
                theme === "dark" ? "bg-background shadow-sm" : ""
              }`}
            >
              <Moon className="h-3 w-3 text-foreground" />
            </Button>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logout()}
          disabled={isPending}
          className="cursor-pointer hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4 text-foreground" />
          <span className="text-sm">
            {isPending ? "Logging out..." : "Logout"}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
