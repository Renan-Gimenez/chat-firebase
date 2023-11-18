import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Loader2, Moon, Sun } from "lucide-react";

export default function ToggleThemeButton() {
  const [isClient, setIsClient] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-row-reverse items-center gap-4 p-2">
      <button
        onClick={toggleTheme}
        className="p-2 border border-zinc-500/50 rounded-xl"
      >
        {isClient ? (
          theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </button>
    </div>
  );
}
