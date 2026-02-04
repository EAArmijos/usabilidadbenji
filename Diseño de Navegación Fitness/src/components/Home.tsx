import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  Flame, 
  Target, 
  Trophy, 
  Activity, 
  Heart,
  Zap,
  TrendingUp,
  Calendar,
  Clock,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "../contexts/AuthContext";

export function Home() {
  const { user } = useAuth();
  
  const stats = [
    { label: "Calorías quemadas", value: "2,847", icon: Flame, color: "text-orange-500" },
    { label: "Entrenamientos", value: "24", icon: Target, color: "text-blue-500" },
    { label: "Racha actual", value: "7 días", icon: Trophy, color: "text-yellow-500" },
    { label: "Ritmo cardíaco", value: "72 bpm", icon: Heart, color: "text-red-500" },
  ];

  const recentWorkouts = [
    { name: "Entrenamiento HIIT", duration: "30 min", calories: 320, date: "Hoy" },
    { name: "Yoga y estiramiento", duration: "45 min", calories: 150, date: "Ayer" },
    { name: "Fuerza superior", duration: "50 min", calories: 280, date: "Hace 2 días" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
              {user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-foreground">¡Bienvenido de nuevo, {user?.name || 'Usuario'}!</h2>
            <p className="text-muted-foreground">Es hora de entrenar y alcanzar tus metas</p>
          </div>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Zap className="size-3" />
          Nivel Pro
        </Badge>
      </div>

      {/* Alert */}
      <Alert className="border-orange-200 bg-orange-50">
        <Activity className="size-4 text-orange-600" />
        <AlertDescription className="text-orange-900">
          ¡Estás a solo 3 entrenamientos de completar tu objetivo mensual! 💪
        </AlertDescription>
      </Alert>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className={`text-foreground mt-1 ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <Icon className="size-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Featured Workout */}
      <Card className="overflow-hidden border-2 border-orange-200">
        <div className="relative h-48">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
            alt="Entrenamiento destacado"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge className="absolute top-4 right-4 bg-orange-500">Destacado</Badge>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3>Entrenamiento del día: Full Body Powerssasdadsd</h3>
            <p className="text-sm text-slate-200">45 minutos • Alta intensidad</p>
          </div>
        </div>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge variant="secondary">
                <Flame className="size-3 mr-1" />
                450 cal
              </Badge>
              <Badge variant="secondary">
                <Clock className="size-3 mr-1" />
                45 min
              </Badge>
            </div>
            <Button>
              Comenzar ahora
              <ChevronRight className="size-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5 text-orange-500" />
              Progreso semanal
            </CardTitle>
            <CardDescription>Tu actividad esta semana</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Objetivo de calorías</span>
                <span className="text-sm text-foreground">2,847 / 3,500</span>
              </div>
              <Progress value={81} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Entrenamientos completados</span>
                <span className="text-sm text-foreground">4 / 5</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Minutos activos</span>
                <span className="text-sm text-foreground">180 / 250</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Workouts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5 text-orange-500" />
              Entrenamientos recientes
            </CardTitle>
            <CardDescription>Tu actividad de los últimos días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentWorkouts.map((workout, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                      <Activity className="size-5 text-white" />
                    </div>
                    <div>
                      <p className="text-foreground">{workout.name}</p>
                      <p className="text-sm text-muted-foreground">{workout.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-foreground">{workout.calories} cal</p>
                    <p className="text-sm text-muted-foreground">{workout.duration}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/progress">
              <Button variant="ghost" className="w-full mt-4">
                Ver todo el historial
                <ChevronRight className="size-4 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones rápidas</CardTitle>
          <CardDescription>Accede rápidamente a tus funciones favoritas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link to="/workouts">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <Target className="size-6" />
                Nueva rutina
              </Button>
            </Link>
            <Link to="/schedule">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <Calendar className="size-6" />
                Ver horario
              </Button>
            </Link>
            <Link to="/nutrition">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <Activity className="size-6" />
                Plan nutricional
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <Trophy className="size-6" />
                Mis logros
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
