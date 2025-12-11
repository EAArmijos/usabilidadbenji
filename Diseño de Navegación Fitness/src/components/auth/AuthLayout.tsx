import { Activity, TrendingUp, Calendar, Award, Users, Zap } from "lucide-react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const features = [
    {
      icon: Activity,
      title: "Rutinas Personalizadas",
      description: "Entrenamientos adaptados a tu nivel y objetivos",
    },
    {
      icon: TrendingUp,
      title: "Seguimiento de Progreso",
      description: "Visualiza tu evolución con gráficos detallados",
    },
    {
      icon: Calendar,
      title: "Planificación Inteligente",
      description: "Organiza tus entrenamientos y mantén la constancia",
    },
    {
      icon: Award,
      title: "Logros y Metas",
      description: "Alcanza tus objetivos y celebra tus victorias",
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right Side - Features (Hidden on mobile) */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-orange-500 via-red-500 to-red-600 p-12 text-white flex-col justify-center relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="size-10" />
              <h2 className="text-3xl">FitPro</h2>
            </div>
            <p className="text-xl text-white/90 mb-4">
              Tu compañero de entrenamiento definitivo
            </p>
            <p className="text-white/80">
              Más de 10,000 usuarios ya están transformando sus vidas con FitPro
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Icon className="size-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-1">{feature.title}</h3>
                    <p className="text-sm text-white/80">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex items-center gap-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="size-5" />
                  <span className="text-2xl">10k+</span>
                </div>
                <p className="text-sm text-white/80">Usuarios activos</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Award className="size-5" />
                  <span className="text-2xl">50k+</span>
                </div>
                <p className="text-sm text-white/80">Entrenamientos completados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
