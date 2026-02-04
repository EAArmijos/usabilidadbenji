import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown,
  Award,
  Target,
  Calendar,
  Activity
} from "lucide-react";

export function Progress() {
  const weightData = [
    { week: "Sem 1", peso: 82, meta: 80 },
    { week: "Sem 2", peso: 81.5, meta: 80 },
    { week: "Sem 3", peso: 81, meta: 80 },
    { week: "Sem 4", peso: 80.8, meta: 80 },
    { week: "Sem 5", peso: 80.5, meta: 80 },
    { week: "Sem 6", peso: 80.2, meta: 80 },
    { week: "Sem 7", peso: 80, meta: 80 },
    { week: "Sem 8", peso: 79.8, meta: 80 },
  ];

  const workoutData = [
    { day: "Lun", minutos: 45, calorias: 320 },
    { day: "Mar", minutos: 60, calorias: 450 },
    { day: "Mié", minutos: 30, calorias: 280 },
    { day: "Jue", minutos: 50, calorias: 380 },
    { day: "Vie", minutos: 40, calorias: 300 },
    { day: "Sáb", minutos: 70, calorias: 520 },
    { day: "Dom", minutos: 25, calorias: 180 },
  ];

  const caloriesData = [
    { day: "Lun", consumo: 2100, quemadas: 320, meta: 2200 },
    { day: "Mar", consumo: 2300, quemadas: 450, meta: 2200 },
    { day: "Mié", consumo: 2000, quemadas: 280, meta: 2200 },
    { day: "Jue", consumo: 2250, quemadas: 380, meta: 2200 },
    { day: "Vie", consumo: 2150, quemadas: 300, meta: 2200 },
    { day: "Sáb", consumo: 2400, quemadas: 520, meta: 2200 },
    { day: "Dom", consumo: 1950, quemadas: 180, meta: 2200 },
  ];

  const achievements = [
    { 
      name: "Primera semana completada", 
      description: "Completaste 5 entrenamientos en tu primera semana",
      date: "Hace 2 meses",
      icon: "🎯"
    },
    { 
      name: "Racha de 10 días", 
      description: "Entrenaste 10 días consecutivos",
      date: "Hace 1 mes",
      icon: "🔥"
    },
    { 
      name: "Meta de peso alcanzada", 
      description: "Llegaste a tu peso objetivo de 80kg",
      date: "Hace 2 semanas",
      icon: "🏆"
    },
    { 
      name: "100 entrenamientos", 
      description: "Completaste 100 sesiones de entrenamiento",
      date: "Hace 1 semana",
      icon: "💯"
    },
    { 
      name: "Maratonista", 
      description: "Corriste un total de 42km en un mes",
      date: "Hace 3 días",
      icon: "🏃"
    },
    { 
      name: "Nutrición perfecta", 
      description: "7 días seguidos cumpliendo tus macros",
      date: "Ayer",
      icon: "🥗"
    },
  ];

  const stats = [
    {
      label: "Peso actual",
      value: "79.8 kg",
      change: "-2.2 kg",
      trend: "down",
      icon: TrendingDown,
      color: "text-green-500"
    },
    {
      label: "Entrenamientos totales",
      value: "124",
      change: "+4 esta semana",
      trend: "up",
      icon: Activity,
      color: "text-blue-500"
    },
    {
      label: "Calorías quemadas",
      value: "28,450",
      change: "+2,430 esta semana",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-500"
    },
    {
      label: "Racha actual",
      value: "7 días",
      change: "Mejor: 14 días",
      trend: "up",
      icon: Award,
      color: "text-purple-500"
    },
  ];

  const bodyMeasurements = [
    { parte: "Pecho", inicial: 98, actual: 102, cambio: "+4cm" },
    { parte: "Cintura", inicial: 88, actual: 82, cambio: "-6cm" },
    { parte: "Caderas", inicial: 95, actual: 93, cambio: "-2cm" },
    { parte: "Brazo", inicial: 32, actual: 35, cambio: "+3cm" },
    { parte: "Muslo", inicial: 58, actual: 61, cambio: "+3cm" },
    { parte: "Pantorrilla", inicial: 38, actual: 39, cambio: "+1cm" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground">Progreso y estadísticas</h2>
        <p className="text-muted-foreground">Visualiza tu evolución y logros</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className={`text-foreground ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </div>
                  <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                    <Icon className="size-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <Tabs defaultValue="weight" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weight">Peso</TabsTrigger>
          <TabsTrigger value="workouts">Entrenamientos</TabsTrigger>
          <TabsTrigger value="calories">Calorías</TabsTrigger>
        </TabsList>

        <TabsContent value="weight" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Evolución del peso</CardTitle>
              <CardDescription>Últimas 8 semanas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[78, 83]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="peso" 
                    stroke="#f97316" 
                    strokeWidth={2} 
                    name="Peso actual (kg)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="meta" 
                    stroke="#22c55e" 
                    strokeDasharray="5 5" 
                    name="Meta (kg)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workouts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Actividad semanal</CardTitle>
              <CardDescription>Minutos y calorías por día</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workoutData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    yAxisId="left"
                    dataKey="minutos" 
                    fill="#3b82f6" 
                    name="Minutos"
                  />
                  <Bar 
                    yAxisId="right"
                    dataKey="calorias" 
                    fill="#f97316" 
                    name="Calorías"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calories" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Balance calórico</CardTitle>
              <CardDescription>Consumo vs. quemadas esta semana</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={caloriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="consumo" 
                    stackId="1"
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    name="Consumo"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="quemadas" 
                    stackId="2"
                    stroke="#f97316" 
                    fill="#f97316" 
                    name="Quemadas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="meta" 
                    stroke="#22c55e" 
                    strokeDasharray="5 5" 
                    name="Meta"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Body Measurements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="size-5 text-orange-500" />
              Medidas corporales
            </CardTitle>
            <CardDescription>Comparación inicial vs. actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
               {bodyMeasurements.map((measurement) => (
                 <div key={measurement.parte} className="space-y-2">
                   <div className="flex justify-between items-center">
                     <span className="text-sm text-foreground">{measurement.parte}</span>
                     <div className="flex items-center gap-2">
                       <span className="text-sm text-muted-foreground">{measurement.inicial}cm</span>
                       <span className="text-sm text-foreground">→</span>
                       <span className="text-sm text-foreground">{measurement.actual}cm</span>
                       <Badge 
                         variant="secondary"
                         className={measurement.cambio.startsWith('+') ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                       >
                         {measurement.cambio}
                       </Badge>
                     </div>
                   </div>
                   <div className="h-2 bg-muted rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-orange-500 transition-all"
                       style={{ width: `${(measurement.actual / measurement.inicial) * 100}%` }}
                     />
                   </div>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="size-5 text-orange-500" />
              Logros desbloqueados
            </CardTitle>
            <CardDescription>Tus últimas conquistas</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-3 max-h-[400px] overflow-y-auto">
               {achievements.map((achievement, index) => (
                 <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted hover:bg-accent transition-colors">
                   <div className="text-2xl">{achievement.icon}</div>
                   <div className="flex-1">
                     <p className="text-foreground">{achievement.name}</p>
                     <p className="text-sm text-muted-foreground">{achievement.description}</p>
                     <div className="flex items-center gap-2 mt-1">
                       <Calendar className="size-3 text-muted-foreground" />
                       <span className="text-xs text-muted-foreground">{achievement.date}</span>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Summary */}
       <Card>
        <CardHeader>
          <CardTitle>Resumen mensual</CardTitle>
          <CardDescription>Noviembre 2025</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20">
              <p className="text-muted-foreground text-sm">Días activos</p>
              <p className="text-foreground mt-1">24 / 30</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20">
              <p className="text-muted-foreground text-sm">Total minutos</p>
              <p className="text-foreground mt-1">1,280 min</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20">
              <p className="text-muted-foreground text-sm">Total calorías</p>
              <p className="text-foreground mt-1">9,640 kcal</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20">
              <p className="text-muted-foreground text-sm">Promedio diario</p>
              <p className="text-foreground mt-1">53 min</p>
            </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
