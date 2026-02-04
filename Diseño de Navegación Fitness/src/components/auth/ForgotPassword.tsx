import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { 
  Dumbbell, 
  Mail, 
  ArrowLeft, 
  Send, 
  CheckCircle,
  Shield,
  AlertCircle,
  Sparkles
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";

interface ForgotPasswordForm {
  email: string;
}

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordForm>();

  const email = watch("email");

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setEmailSent(true);
    setIsLoading(false);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl mb-4 shadow-lg">
              <Dumbbell className="size-10 text-white" />
            </div>
          </div>

          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="text-center">
              <div className="inline-flex items-center justify-center bg-green-100 p-5 rounded-full mb-6">
                <CheckCircle className="size-16 text-green-600" />
              </div>
              <h2 className="text-slate-900 text-2xl mb-3">¡Correo enviado!</h2>
              <p className="text-slate-600 mb-6">
                Hemos enviado un enlace de recuperación a
              </p>
              <div className="bg-slate-100 rounded-lg px-4 py-3 mb-6">
                <p className="text-slate-900">{email}</p>
              </div>
              
              {/* Instructions */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-6 text-left">
                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm text-blue-900">
                      Sigue estos pasos para recuperar tu cuenta:
                    </p>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>Revisa tu bandeja de entrada</li>
                      <li>Abre el correo de FitPro</li>
                      <li>Haz clic en el enlace de recuperación</li>
                      <li>Crea una nueva contraseña</li>
                    </ol>
                    <p className="text-xs text-blue-700 mt-3">
                      Si no ves el correo, revisa tu carpeta de spam
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link to="/login">
                  <Button className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/30">
                    Volver al inicio de sesión
                  </Button>
                </Link>
                <button
                  onClick={() => setEmailSent(false)}
                  className="w-full text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  ¿No recibiste el correo? Reenviar
                </button>
              </div>
            </div>
          </div>

          {/* Help */}
          <p className="text-center mt-6 text-sm text-slate-500">
            ¿Necesitas ayuda?{" "}
            <a
              href="mailto:soporte@fitpro.com"
              className="text-orange-600 hover:underline"
            >
              Contacta soporte
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 p-12 flex-col justify-center relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-lg mx-auto">
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
              <h1 className="text-white text-4xl mb-4">
                Recupera tu acceso
              </h1>
              <p className="text-orange-100 text-lg">
                No te preocupes, pasa hasta a los mejores. Te ayudaremos a recuperar tu cuenta de forma segura.
              </p>
            </div>

            {/* Security Features */}
            <div className="space-y-4 mt-12">
              <h3 className="text-white text-xl mb-4">Proceso seguro garantizado</h3>
              {[
                {
                  icon: Shield,
                  title: "Verificación por correo",
                  description: "Solo tú recibirás el enlace en tu email registrado"
                },
                {
                  icon: CheckCircle,
                  title: "Enlace de un solo uso",
                  description: "El enlace expira después de usarlo una vez"
                },
                {
                  icon: Sparkles,
                  title: "Proceso instantáneo",
                  description: "Recupera tu cuenta en menos de 2 minutos"
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                >
                  <div className="bg-white/20 p-2 rounded-lg">
                    <feature.icon className="size-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white mb-1">{feature.title}</h4>
                    <p className="text-orange-100 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl mb-4 shadow-lg">
              <Dumbbell className="size-10 text-white" />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-slate-900 text-3xl mb-2">Recuperar contraseña</h2>
            <p className="text-slate-600">
              Ingresa tu correo y te enviaremos un enlace de recuperación
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Info Alert */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Mail className="size-5 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-900">
                  Te enviaremos instrucciones detalladas a tu correo electrónico para restablecer tu contraseña de forma segura.
                </p>
              </div>
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Enviando enlace...
                </>
              ) : (
                <>
                  Enviar enlace de recuperación
                  <Send className="size-4 ml-2" />
                </>
              )}
            </Button>

            {/* Back to Login */}
            <Link to="/login">
              <Button
                type="button"
                variant="ghost"
                className="w-full h-12 gap-2 hover:bg-slate-100"
              >
                <ArrowLeft className="size-4" />
                Volver al inicio de sesión
              </Button>
            </Link>
          </form>

          {/* Help */}
          <div className="mt-8">
            <div className="bg-slate-100 rounded-xl p-4 text-center">
              <p className="text-sm text-slate-600 mb-2">
                ¿No puedes acceder a tu correo?
              </p>
              <a
                href="mailto:soporte@fitpro.com"
                className="text-sm text-orange-600 hover:text-orange-700 hover:underline"
              >
                Contacta a nuestro equipo de soporte
              </a>
            </div>
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