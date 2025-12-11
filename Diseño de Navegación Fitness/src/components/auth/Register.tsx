import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form@7.55.0";
import { 
  Dumbbell, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  AlertCircle, 
  CheckCircle2,
  TrendingUp,
  Award,
  Target,
  Sparkles,
  Shield
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner@2.0.3";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function Register() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const password = watch("password");

  const onSubmit = async (data: RegisterForm) => {
    setError("");
    setIsLoading(true);

    try {
      await registerUser(data.name, data.email, data.password);
      toast.success("¡Cuenta creada con éxito!", {
        description: "Bienvenido a FitPro. Comienza tu transformación ahora.",
      });
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Error al crear la cuenta");
      toast.error("Error al crear cuenta", {
        description: err.message || "Inténtalo nuevamente",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const getStrengthLabel = (strength: number) => {
    if (strength <= 1) return { text: "Débil", color: "text-red-600" };
    if (strength === 2) return { text: "Media", color: "text-yellow-600" };
    if (strength === 3) return { text: "Buena", color: "text-blue-600" };
    return { text: "Fuerte", color: "text-green-600" };
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
                Comienza tu transformación hoy
              </h1>
              <p className="text-orange-100 text-lg max-w-md">
                Únete a nuestra comunidad y alcanza tus metas fitness con planes personalizados
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4 mt-12">
              <h3 className="text-white text-xl mb-4">Lo que obtienes al registrarte:</h3>
              {[
                {
                  icon: Target,
                  title: "Planes Personalizados",
                  description: "Rutinas diseñadas específicamente para ti"
                },
                {
                  icon: TrendingUp,
                  title: "Seguimiento Completo",
                  description: "Monitorea tu progreso en tiempo real"
                },
                {
                  icon: Award,
                  title: "Sistema de Logros",
                  description: "Desbloquea recompensas mientras avanzas"
                },
                {
                  icon: Shield,
                  title: "100% Gratis",
                  description: "Acceso completo sin cargos ocultos"
                }
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="bg-white/20 p-2 rounded-lg">
                    <benefit.icon className="size-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white mb-1">{benefit.title}</h4>
                    <p className="text-orange-100 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="size-6 text-white" />
              <p className="text-white">Tus datos están seguros</p>
            </div>
            <p className="text-orange-100 text-sm">
              Utilizamos encriptación de nivel empresarial para proteger tu información personal
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl mb-4 shadow-lg">
              <Dumbbell className="size-10 text-white" />
            </div>
            <h1 className="text-slate-900 mb-2">Únete a FitPro</h1>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-slate-900 text-3xl mb-2">Crear cuenta</h2>
            <p className="text-slate-600">
              Completa el formulario para comenzar gratis
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="size-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-700">
                Nombre completo
              </Label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Juan Pérez"
                  className="pl-10 h-12 border-slate-300 focus:border-orange-500 focus:ring-orange-500/20"
                  {...register("name", {
                    required: "El nombre es requerido",
                    minLength: {
                      value: 2,
                      message: "El nombre debe tener al menos 2 caracteres",
                    },
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                  <AlertCircle className="size-3" />
                  {errors.name.message}
                </p>
              )}
            </div>

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
              <Label htmlFor="password" className="text-slate-700">
                Contraseña
              </Label>
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
                      message: "Mínimo 6 caracteres",
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
              {password && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength(password) <= 1
                            ? "bg-red-500 w-1/4"
                            : passwordStrength(password) === 2
                            ? "bg-yellow-500 w-1/2"
                            : passwordStrength(password) === 3
                            ? "bg-blue-500 w-3/4"
                            : "bg-green-500 w-full"
                        }`}
                      ></div>
                    </div>
                    <span className={`text-sm ${getStrengthLabel(passwordStrength(password)).color}`}>
                      {getStrengthLabel(passwordStrength(password)).text}
                    </span>
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                  <AlertCircle className="size-3" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-700">
                Confirmar contraseña
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-12 h-12 border-slate-300 focus:border-orange-500 focus:ring-orange-500/20"
                  {...register("confirmPassword", {
                    required: "Confirma tu contraseña",
                    validate: (value) =>
                      value === password || "Las contraseñas no coinciden",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                  <AlertCircle className="size-3" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Quick Benefits Summary */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="size-5 text-green-600" />
                <p className="text-sm text-green-900">
                  Incluido en tu cuenta gratuita
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Rutinas ilimitadas",
                  "Seguimiento de progreso",
                  "Plan nutricional",
                  "Soporte 24/7"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-green-800">{benefit}</span>
                  </div>
                ))}
              </div>
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
                  Creando cuenta...
                </>
              ) : (
                <>
                  Crear mi cuenta gratis
                  <Sparkles className="size-4 ml-2" />
                </>
              )}
            </Button>

            {/* Terms */}
            <p className="text-xs text-slate-500 text-center">
              Al crear una cuenta, aceptas nuestros{" "}
              <a href="#" className="text-orange-600 hover:underline">
                Términos de Servicio
              </a>{" "}
              y{" "}
              <a href="#" className="text-orange-600 hover:underline">
                Política de Privacidad
              </a>
            </p>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="text-orange-600 hover:text-orange-700 transition-colors"
              >
                Inicia sesión
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