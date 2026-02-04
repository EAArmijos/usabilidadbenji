import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Settings, Sun, Moon, Type, ChevronUp, ChevronDown, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useFont } from "../contexts/FontContext";

export function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { font, setFont } = useFont();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative" ref={menuRef}>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-300 min-w-[200px] z-50">
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="outline"
            className="gap-2 bg-card shadow-lg hover:shadow-xl transition-all justify-start text-foreground hover:bg-accent"
          >
            {theme === "dark" ? (
              <>
                <Sun className="size-4 text-orange-500" />
                <span>Modo claro</span>
              </>
            ) : (
              <>
                <Moon className="size-4 text-slate-700" />
                <span>Modo oscuro</span>
              </>
            )}
          </Button>
          <Button
            onClick={() => setFont(font === "sans" ? "serif" : font === "serif" ? "mono" : "sans")}
            variant="outline"
            className="gap-2 bg-card shadow-lg hover:shadow-xl transition-all justify-start text-foreground hover:bg-accent"
          >
            <Type className="size-4 text-blue-500" />
            <span>
              {font === "sans" ? "Fuente Sans" : font === "serif" ? "Fuente Serif" : "Fuente Mono"}
            </span>
          </Button>
        </div>
      )}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        className="rounded-full size-10 bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center border-2 border-white"
      >
        <Settings className="size-5 text-white" />
        {isOpen ? (
          <ChevronDown className="size-3 absolute -top-1 -right-1 bg-white text-orange-600 rounded-full p-0.5 shadow-md" />
        ) : (
          <Palette className="size-3 absolute -top-1 -right-1 bg-white text-orange-600 rounded-full p-0.5 shadow-md" />
        )}
      </Button>
    </div>
  );
}
