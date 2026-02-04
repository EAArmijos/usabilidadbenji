import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Calendar as CalendarIcon,
  Clock,
  Dumbbell,
  Heart,
  Target,
  Plus,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export function Schedule() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const weekSchedule = [
    {
      day: "Lunes",
      date: "25 Nov",
      workouts: [
        { time: "7:00 AM", name: "Cardio HIIT", duration: "30 min", type: "cardio", completed: true },
        { time: "6:00 PM", name: "Fuerza superior", duration: "50 min", type: "strength", completed: true },
      ],
    },
    {
      day: "Martes",
      date: "26 Nov",
      workouts: [
        { time: "7:00 AM", name: "Yoga matutino", duration: "45 min", type: "flexibility", completed: false },
        { time: "5:30 PM", name: "Piernas y glúteos", duration: "60 min", type: "strength", completed: false },
      ],
    },
    {
      day: "Miércoles",
      date: "27 Nov",
      workouts: [
        { time: "12:00 PM", name: "Cardio moderado", duration: "40 min", type: "cardio", completed: false },
      ],
    },
    {
      day: "Jueves",
      date: "28 Nov",
      workouts: [
        { time: "7:00 AM", name: "Fuerza total", duration: "60 min", type: "strength", completed: false },
        { time: "8:00 PM", name: "Estiramiento", duration: "20 min", type: "flexibility", completed: false },
      ],
    },
    {
      day: "Viernes",
      date: "29 Nov",
      workouts: [
        { time: "6:30 AM", name: "HIIT explosivo", duration: "30 min", type: "cardio", completed: false },
      ],
    },
    {
      day: "Sábado",
      date: "30 Nov",
      workouts: [
        { time: "9:00 AM", name: "Entrenamiento funcional", duration: "70 min", type: "strength", completed: false },
        { time: "4:00 PM", name: "Yoga flow", duration: "45 min", type: "flexibility", completed: false },
      ],
    },
    {
      day: "Domingo",
      date: "1 Dic",
      workouts: [
        { time: "10:00 AM", name: "Caminata activa", duration: "45 min", type: "cardio", completed: false },
      ],
    },
  ];

  const upcomingClasses = [
    {
      name: "Spinning",
      instructor: "María González",
      time: "Hoy, 6:00 PM",
      duration: "45 min",
      spots: 8,
      capacity: 20,
      level: "Intermedio"
    },
    {
      name: "Yoga Vinyasa",
      instructor: "Carlos Ruiz",
      time: "Mañana, 7:00 AM",
      duration: "60 min",
      spots: 5,
      capacity: 15,
      level: "Todos"
    },
    {
      name: "CrossFit",
      instructor: "Andrea Silva",
      time: "Mañana, 7:00 PM",
      duration: "50 min",
      spots: 3,
      capacity: 12,
      level: "Avanzado"
    },
    {
      name: "Pilates",
      instructor: "Laura Martínez",
      time: "Miércoles, 10:00 AM",
      duration: "45 min",
      spots: 12,
      capacity: 15,
      level: "Principiante"
    },
  ];

  const getWorkoutIcon = (type: string) => {
    switch (type) {
      case "strength":
        return <Dumbbell className="size-4" />;
      case "cardio":
        return <Heart className="size-4" />;
      case "flexibility":
        return <Target className="size-4" />;
      default:
        return <CalendarIcon className="size-4" />;
    }
  };

  const getWorkoutColor = (type: string) => {
    switch (type) {
      case "strength":
        return "bg-blue-100 text-blue-800";
      case "cardio":
        return "bg-red-100 text-red-800";
      case "flexibility":
        return "bg-green-100 text-green-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground">Horario de entrenamientos</h2>
          <p className="text-muted-foreground">Planifica y organiza tus sesiones</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              Nuevo entrenamiento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Programar entrenamiento</DialogTitle>
              <DialogDescription>
                Agrega un nuevo entrenamiento a tu calendario
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="workout-name">Nombre del entrenamiento</Label>
                <Input id="workout-name" placeholder="Ej: Cardio HIIT" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workout-type">Tipo</Label>
                <Select>
                  <SelectTrigger id="workout-type">
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strength">Fuerza</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="flexibility">Flexibilidad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workout-time">Hora</Label>
                  <Input id="workout-time" type="time" defaultValue="07:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workout-duration">Duración</Label>
                  <Input id="workout-duration" placeholder="45 min" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="workout-notes">Notas</Label>
                <Textarea 
                  id="workout-notes" 
                  placeholder="Agrega notas o instrucciones especiales..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="flex-1" onClick={() => setIsDialogOpen(false)}>
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendario</CardTitle>
            <CardDescription>Selecciona un día</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Week Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Semana actual</CardTitle>
            <CardDescription>25 Nov - 1 Dic, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weekSchedule.map((day) => (
                 <div key={day.day} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground">{day.day}</p>
                      <p className="text-sm text-muted-foreground">{day.date}</p>
                    </div>
                    <Badge variant="secondary">
                      {day.workouts.length} {day.workouts.length === 1 ? 'sesión' : 'sesiones'}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {day.workouts.map((workout, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          workout.completed ? 'bg-green-500/20' : 'bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded ${getWorkoutColor(workout.type)}`}>
                            {getWorkoutIcon(workout.type)}
                          </div>
                          <div>
                            <p className="text-sm text-foreground">{workout.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="size-3" />
                              {workout.time} • {workout.duration}
                            </div>
                          </div>
                        </div>
                        {workout.completed ? (
                          <CheckCircle2 className="size-5 text-green-600" />
                        ) : (
                          <Button variant="ghost" size="sm">
                            Marcar
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Classes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="size-5 text-orange-500" />
            Clases grupales disponibles
          </CardTitle>
          <CardDescription>Reserva tu lugar en las próximas clases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {upcomingClasses.map((classItem, index) => (
               <div key={index} className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
                 <div className="flex items-start justify-between">
                   <div>
                     <h3 className="text-foreground">{classItem.name}</h3>
                     <p className="text-sm text-muted-foreground">con {classItem.instructor}</p>
                   </div>
                   <Badge variant="secondary">{classItem.level}</Badge>
                 </div>
                 
                 <div className="space-y-2">
                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
                     <Clock className="size-4" />
                     {classItem.time} • {classItem.duration}
                   </div>
                   
                   <div className="flex items-center gap-2">
                     {classItem.spots < 5 ? (
                       <AlertCircle className="size-4 text-orange-500" />
                     ) : (
                       <CheckCircle2 className="size-4 text-green-500" />
                     )}
                     <span className="text-sm text-muted-foreground">
                       {classItem.spots} lugares disponibles de {classItem.capacity}
                     </span>
                   </div>
                   
                   <div className="w-full bg-accent rounded-full h-2">
                     <div
                       className="bg-orange-500 h-2 rounded-full"
                       style={{ width: `${((classItem.capacity - classItem.spots) / classItem.capacity) * 100}%` }}
                     />
                   </div>
                 </div>
 
                 <Button className="w-full" variant={classItem.spots < 5 ? "default" : "outline"}>
                   {classItem.spots < 5 ? "¡Reserva ahora!" : "Reservar lugar"}
                 </Button>
               </div>
             ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="mx-auto size-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="size-6 text-green-600" />
              </div>
              <p className="text-foreground">24 completados</p>
              <p className="text-sm text-muted-foreground">Este mes</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="mx-auto size-12 rounded-full bg-blue-100 flex items-center justify-center">
                <CalendarIcon className="size-6 text-blue-600" />
              </div>
              <p className="text-foreground">6 programados</p>
              <p className="text-sm text-muted-foreground">Esta semana</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="mx-auto size-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="size-6 text-orange-600" />
              </div>
              <p className="text-foreground">320 minutos</p>
              <p className="text-sm text-muted-foreground">Tiempo total semanal</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
