import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form@7.55.0";
import { Dumbbell, Mail, ArrowLeft, Send, CheckCircle } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200 text-center">
            <div className="inline-flex items-center justify-center bg-green-100 p-4 rounded-full mb-4">
              <CheckCircle className="size-12 text-green-600" />
            </div>
            <h2 className="text-slate-900 mb-2">¡Correo enviado!</h2>
            <p className="text-slate-600 mb-6">
              Hemos enviado un enlace de recuperación a <strong>{email}</strong>
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
                Si no recibes el correo en unos minutos, revisa tu carpeta de spam.
              </p>
            </div>
            <Link to="/login">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                Volver al inicio de sesión
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl mb-4 shadow-lg">
            <Dumbbell className="size-12 text-white" />
          </div>
          <h1 className="text-slate-900 mb-2">¿Olvidaste tu contraseña?</h1>
          <p className="text-slate-600">
            No te preocupes, te enviaremos instrucciones para restablecerla
          </p>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Info Alert */}
            <Alert>
              <Mail className="size-4" />
              <AlertDescription>
                Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu cuenta.
              </AlertDescription>
            </Alert>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="pl-10"
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
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="size-4 mr-2" />
                  Enviar enlace de recuperación
                </>
              )}
            </Button>

            {/* Back to Login Link */}
            <Link to="/login">
              <Button
                type="button"
                variant="ghost"
                className="w-full gap-2"
              >
                <ArrowLeft className="size-4" />
                Volver al inicio de sesión
              </Button>
            </Link>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            ¿Necesitas ayuda?{" "}
            <a
              href="mailto:soporte@fitpro.com"
              className="text-orange-600 hover:text-orange-700 hover:underline"
            >
              Contacta soporte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
