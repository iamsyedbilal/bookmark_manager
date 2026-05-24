import { useEffect } from "react";
import { useThemeStore } from "../store/theme";

export default function ThemeProvider() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return null;
}
