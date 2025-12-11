import { RouterProvider } from "react-router";
import { router } from "./utils/routes";
import { AuthProvider } from "./contexts/AuthContext";
import { useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import { initializeDemoUser } from "./utils/initDemoUser";

export default function App() {
  // Initialize demo user on first load
  useEffect(() => {
    initializeDemoUser();
  }, []);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}