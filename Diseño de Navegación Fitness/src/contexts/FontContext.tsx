import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type FontType = "sans" | "serif" | "mono";

interface FontContextType {
  font: FontType;
  setFont: (font: FontType) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

const fontFamilies = {
  sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, setFontState] = useState<FontType>("sans");

  useEffect(() => {
    const storedFont = localStorage.getItem("fitpro_font") as FontType | null;
    if (storedFont) {
      setFontState(storedFont);
      applyFont(storedFont);
    }
  }, []);

  const applyFont = (fontType: FontType) => {
    document.documentElement.style.fontFamily = fontFamilies[fontType];
  };

  const setFont = (newFont: FontType) => {
    setFontState(newFont);
    localStorage.setItem("fitpro_font", newFont);
    applyFont(newFont);
  };

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
}
