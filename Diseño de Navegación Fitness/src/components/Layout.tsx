import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Dumbbell, Home, Calendar, TrendingUp, Apple, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import { FloatingMenu } from "./FloatingMenu";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/", label: "Inicio", icon: Home },
    { path: "/workouts", label: "Rutinas", icon: Dumbbell },
    { path: "/nutrition", label: "Nutrición", icon: Apple },
    { path: "/progress", label: "Progreso", icon: TrendingUp },
    { path: "/schedule", label: "Horario", icon: Calendar },
    { path: "/profile", label: "Perfil", icon: User },
  ];

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada", {
      description: "Hasta pronto, ¡vuelve pronto!",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
                <Dumbbell className="size-6 text-white" />
              </div>
              <div>
                <h1 className="text-foreground">FitPro</h1>
                <p className="text-sm text-muted-foreground">Tu entrenador personal</p>
              </div>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>
                    {user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <FloatingMenu />
              <Button onClick={handleLogout} size="sm" className="gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0">
                <LogOut className="size-4" />
                <span className="hidden md:inline">Cerrar sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="gap-2 whitespace-nowrap"
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>© 2025 FitPro - Alcanza tus metas fitness</p>
        </div>
      </footer>
    </div>
  );
}