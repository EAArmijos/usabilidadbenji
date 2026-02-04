import { RouterProvider } from "react-router";
import { router } from "./utils/routes";
import { AuthProvider } from "./contexts/AuthContext";
import { FontProvider } from "./contexts/FontContext";
import { useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import { initializeDemoUser } from "./utils/initDemoUser";
import { AccessibilityWidget } from "./components/AccessibilityWidget";
import { ThemeProvider } from "next-themes";

export default function App() {
  // Initialize demo user on first load
  useEffect(() => {
    initializeDemoUser();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        <FontProvider>
          {/* El AuthProvider debe envolver todo para que funcione el Login/Logout */}
          <RouterProvider router={router} />
          
          {/* El Widget de Accesibilidad flota sobre toda la app */}
          <AccessibilityWidget />
          
          {/* Las notificaciones (Toasts) también flotan */}
          <Toaster position="top-right" />
        </FontProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}