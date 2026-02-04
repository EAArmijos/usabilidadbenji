import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext"; // Para el botón de salir
import { 
  Accessibility, 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Moon, 
  Type, 
  LogOut, 
  X 
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "sonner";

export function AccessibilityWidget() {
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100); // Porcentaje
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);

  // Aplicar cambios al DOM real
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // 1. Tamaño de fuente
    html.style.fontSize = `${fontSize}%`;

    // 2. Contraste
    if (highContrast) {
      html.classList.add("grayscale", "contrast-125");
      body.classList.add("bg-white"); // Forzar fondo blanco en alto contraste
    } else {
      html.classList.remove("grayscale", "contrast-125");
      body.classList.remove("bg-white");
    }

    // 3. Fuente
    if (dyslexicFont) {
      body.style.fontFamily = '"Comic Sans MS", "Chalkboard SE", sans-serif'; // Alternativa común para dislexia
      body.style.letterSpacing = "0.05em";
      body.style.lineHeight = "1.6";
    } else {
      body.style.fontFamily = "";
      body.style.letterSpacing = "";
      body.style.lineHeight = "";
    }

  }, [fontSize, highContrast, dyslexicFont]);

  const handleLogout = () => {
    logout();
    toast.info("Sesión cerrada correctamente");
    setIsOpen(false);
  };

  // Si no hay usuario, ocultamos el widget (opcional, o dejarlo visible siempre)
  if (!user) return null; 

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      
      {/* Panel de Herramientas (Solo visible si está abierto) */}
      {isOpen && (
        <Card className="p-4 w-64 shadow-2xl border-2 border-slate-200 animate-in slide-in-from-bottom-5 fade-in">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-slate-900">Accesibilidad</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>

            {/* Control de Texto */}
            <div className="space-y-2">
              <span className="text-xs text-slate-500 font-medium">TAMAÑO TEXTO</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setFontSize(Math.max(100, fontSize - 10))}>
                  <ZoomOut className="size-4 mr-1" /> -
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setFontSize(Math.min(150, fontSize + 10))}>
                  <ZoomIn className="size-4 mr-1" /> +
                </Button>
              </div>
            </div>

            {/* Contraste y Fuente */}
            <div className="space-y-2">
              <span className="text-xs text-slate-500 font-medium">VISUALIZACIÓN</span>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={highContrast ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setHighContrast(!highContrast)}
                  className={highContrast ? "bg-black text-white hover:bg-slate-800" : ""}
                >
                  {highContrast ? <Sun className="size-4 mr-2"/> : <Moon className="size-4 mr-2"/>}
                  {highContrast ? "Normal" : "Contraste"}
                </Button>
                
                <Button 
                  variant={dyslexicFont ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setDyslexicFont(!dyslexicFont)}
                >
                  <Type className="size-4 mr-2" />
                  Legible
                </Button>
              </div>
            </div>

            <div className="border-t pt-3">
              <Button variant="destructive" className="w-full" onClick={handleLogout}>
                <LogOut className="size-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Botón Flotante Principal (FAB) */}
      <Button 
        size="icon" 
        className="h-14 w-14 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 text-white transition-transform hover:scale-105"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menú de accesibilidad y usuario"
      >
        <Accessibility className="h-8 w-8" />
      </Button>
    </div>
  );
}