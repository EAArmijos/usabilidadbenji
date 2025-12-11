import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form@7.55.0";
import { 
  Dumbbell, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle,
  TrendingUp,
  Award,
  Target,
  Users,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner@2.0.3";

interface LoginForm {
  email: string;
  password: string;
}

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setError("");
    setIsLoading(true);

    try {
      await login(data.email, data.password);
      toast.success("¡Bienvenido de vuelta!", {
        description: "Has iniciado sesión correctamente",
      });
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
      toast.error("Error al iniciar sesión", {
        description: err.message || "Verifica tus credenciales",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Side - Branding and Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Dumbbell className="size-8 text-white" />
            </div>
            <div>
              <h2 className="text-white text-2xl">FitPro</h2>
              <p className="text-orange-100 text-sm">Tu entrenador digital</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-white text-4xl mb-4 max-w-md">
                Transforma tu cuerpo, transforma tu vida
              </h1>
              <p className="text-orange-100 text-lg max-w-md">
                Únete a más de 10,000 personas que ya están alcanzando sus objetivos de fitness
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4 mt-12">
              {[
                {
                  icon: Target,
                  title: "Planes Personalizados",
                  description: "Rutinas adaptadas a tus objetivos y nivel"
                },
                {
                  icon: TrendingUp,
                  title: "Progreso en Tiempo Real",
                  description: "Visualiza tu evolución con gráficos detallados"
                },
                {
                  icon: Award,
                  title: "Logros y Recompensas",
                  description: "Mantén la motivación con nuestro sistema de logros"
                },
                {
                  icon: Users,
                  title: "Comunidad Activa",
                  description: "Conecta con otros atletas y comparte experiencias"
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="bg-white/20 p-2 rounded-lg">
                    <feature.icon className="size-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white mb-1">{feature.title}</h3>
                    <p className="text-orange-100 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-6">
          {[
            { value: "10K+", label: "Usuarios activos" },
            { value: "500K+", label: "Entrenamientos" },
            { value: "95%", label: "Satisfacción" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-white text-2xl mb-1">{stat.value}</div>
              <div className="text-orange-100 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl mb-4 shadow-lg">
              <Dumbbell className="size-10 text-white" />
            </div>
            <h1 className="text-slate-900 mb-2">Bienvenido a FitPro</h1>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-slate-900 text-3xl mb-2">Iniciar sesión</h2>
            <p className="text-slate-600">
              Continúa tu viaje hacia una vida más saludable
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="size-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Correo electrónico
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="pl-10 h-12 border-slate-300 focus:border-orange-500 focus:ring-orange-500/20"
                  {...register("email", {
                    required: "El correo es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Correo electrónico inválido",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                  <AlertCircle className="size-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700">
                  Contraseña
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-orange-600 hover:text-orange-700 hover:underline transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-12 h-12 border-slate-300 focus:border-orange-500 focus:ring-orange-500/20"
                  {...register("password", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                  <AlertCircle className="size-3" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="size-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500/20"
              />
              <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                Recordarme en este dispositivo
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Iniciando sesión...
                </>
              ) : (
                <>
                  Iniciar sesión
                  <Sparkles className="size-4 ml-2" />
                </>
              )}
            </Button>

            {/* Demo Credentials */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-50 text-slate-500">O prueba con</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-blue-500 p-1 rounded">
                  <CheckCircle2 className="size-4 text-white" />
                </div>
                <p className="text-sm text-blue-900">
                  Credenciales de demostración
                </p>
              </div>
              <div className="space-y-1 pl-7">
                <p className="text-sm text-blue-800">
                  <span className="text-blue-600">Email:</span> demo@fitpro.com
                </p>
                <p className="text-sm text-blue-800">
                  <span className="text-blue-600">Contraseña:</span> demo123
                </p>
              </div>
            </div>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                className="text-orange-600 hover:text-orange-700 transition-colors"
              >
                Regístrate gratis
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center mt-8 text-xs text-slate-400">
            Protegido por encriptación de grado empresarial
          </p>
        </div>
      </div>
    </div>
  );
}