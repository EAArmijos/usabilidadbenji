import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { 
  Flame, 
  Clock, 
  Target, 
  Dumbbell,
  Heart,
  Zap,
  Play,
  CheckCircle2
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Workouts() {
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);

  const workoutPlans = {
    strength: [
      {
        id: 1,
        name: "Fuerza Total",
        duration: "60 min",
        calories: 400,
        difficulty: "Intermedio",
        image: "https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB3b3Jrb3V0JTIwdHJhaW5pbmd8ZW58MXx8fHwxNzY0MDYzNjc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        exercises: [
          { name: "Sentadillas", sets: 4, reps: 12, rest: "90s" },
          { name: "Press de banca", sets: 4, reps: 10, rest: "90s" },
          { name: "Peso muerto", sets: 4, reps: 8, rest: "2min" },
          { name: "Dominadas", sets: 3, reps: 10, rest: "90s" },
        ]
      },
      {
        id: 2,
        name: "Piernas y glúteos",
        duration: "50 min",
        calories: 350,
        difficulty: "Avanzado",
        image: "https://images.unsplash.com/photo-1687521278757-aed659b751e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwc3RyZW5ndGglMjB0cmFpbmluZ3xlbnwxfHx8fDE3NjQwMDU0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        exercises: [
          { name: "Sentadilla búlgara", sets: 4, reps: 12, rest: "60s" },
          { name: "Hip thrust", sets: 4, reps: 15, rest: "60s" },
          { name: "Zancadas", sets: 3, reps: 12, rest: "60s" },
          { name: "Elevación de talones", sets: 4, reps: 20, rest: "45s" },
        ]
      },
    ],
    cardio: [
      {
        id: 3,
        name: "HIIT Explosivo",
        duration: "30 min",
        calories: 450,
        difficulty: "Avanzado",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
        exercises: [
          { name: "Burpees", sets: 4, reps: 15, rest: "30s" },
          { name: "Mountain climbers", sets: 4, reps: 20, rest: "30s" },
          { name: "Jump squats", sets: 4, reps: 15, rest: "30s" },
          { name: "High knees", sets: 4, reps: "30s", rest: "30s" },
        ]
      },
      {
        id: 4,
        name: "Cardio moderado",
        duration: "40 min",
        calories: 300,
        difficulty: "Principiante",
        image: "https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB3b3Jrb3V0JTIwdHJhaW5pbmd8ZW58MXx8fHwxNzY0MDYzNjc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        exercises: [
          { name: "Trote en sitio", sets: 1, reps: "5min", rest: "1min" },
          { name: "Jumping jacks", sets: 3, reps: 30, rest: "45s" },
          { name: "Step ups", sets: 3, reps: 15, rest: "45s" },
          { name: "Bicicleta estática", sets: 1, reps: "10min", rest: "0" },
        ]
      },
    ],
    flexibility: [
      {
        id: 5,
        name: "Yoga Flow",
        duration: "45 min",
        calories: 180,
        difficulty: "Todos",
        image: "https://images.unsplash.com/photo-1641971215245-b4ac37f97bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwZXhlcmNpc2V8ZW58MXx8fHwxNzY0MDA1ODU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        exercises: [
          { name: "Saludo al sol", sets: 3, reps: "5 min", rest: "30s" },
          { name: "Guerrero I y II", sets: 2, reps: "3 min", rest: "30s" },
          { name: "Postura del árbol", sets: 2, reps: "2 min", rest: "30s" },
          { name: "Savasana", sets: 1, reps: "5 min", rest: "0" },
        ]
      },
    ],
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Principiante":
        return "bg-green-100 text-green-800";
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800";
      case "Avanzado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900">Rutinas de entrenamiento</h2>
        <p className="text-slate-600">Explora y comienza tu próximo entrenamiento</p>
      </div>

      <Tabs defaultValue="strength" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="strength" className="gap-2">
            <Dumbbell className="size-4" />
            Fuerza
          </TabsTrigger>
          <TabsTrigger value="cardio" className="gap-2">
            <Heart className="size-4" />
            Cardio
          </TabsTrigger>
          <TabsTrigger value="flexibility" className="gap-2">
            <Target className="size-4" />
            Flexibilidad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="strength" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workoutPlans.strength.map((workout) => (
              <Card key={workout.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={workout.image}
                    alt={workout.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className={`absolute top-4 right-4 ${getDifficultyColor(workout.difficulty)}`}>
                    {workout.difficulty}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>{workout.name}</CardTitle>
                  <div className="flex gap-3 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      {workout.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="size-4 text-orange-500" />
                      {workout.calories} cal
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" onClick={() => setSelectedWorkout(workout)}>
                        <Play className="size-4 mr-2" />
                        Ver detalles
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{workout.name}</DialogTitle>
                        <DialogDescription>
                          Detalles del entrenamiento y ejercicios
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <Badge className={getDifficultyColor(workout.difficulty)}>
                            {workout.difficulty}
                          </Badge>
                          <Badge variant="secondary">
                            <Clock className="size-3 mr-1" />
                            {workout.duration}
                          </Badge>
                          <Badge variant="secondary">
                            <Flame className="size-3 mr-1" />
                            {workout.calories} cal
                          </Badge>
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Ejercicio</TableHead>
                              <TableHead>Series</TableHead>
                              <TableHead>Repeticiones</TableHead>
                              <TableHead>Descanso</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {workout.exercises.map((exercise, index) => (
                              <TableRow key={index}>
                                <TableCell>{exercise.name}</TableCell>
                                <TableCell>{exercise.sets}</TableCell>
                                <TableCell>{exercise.reps}</TableCell>
                                <TableCell>{exercise.rest}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <Button className="w-full">
                          <Zap className="size-4 mr-2" />
                          Comenzar entrenamiento
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cardio" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workoutPlans.cardio.map((workout) => (
              <Card key={workout.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={workout.image}
                    alt={workout.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className={`absolute top-4 right-4 ${getDifficultyColor(workout.difficulty)}`}>
                    {workout.difficulty}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>{workout.name}</CardTitle>
                  <div className="flex gap-3 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      {workout.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="size-4 text-orange-500" />
                      {workout.calories} cal
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" onClick={() => setSelectedWorkout(workout)}>
                        <Play className="size-4 mr-2" />
                        Ver detalles
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{workout.name}</DialogTitle>
                        <DialogDescription>
                          Detalles del entrenamiento y ejercicios
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <Badge className={getDifficultyColor(workout.difficulty)}>
                            {workout.difficulty}
                          </Badge>
                          <Badge variant="secondary">
                            <Clock className="size-3 mr-1" />
                            {workout.duration}
                          </Badge>
                          <Badge variant="secondary">
                            <Flame className="size-3 mr-1" />
                            {workout.calories} cal
                          </Badge>
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Ejercicio</TableHead>
                              <TableHead>Series</TableHead>
                              <TableHead>Repeticiones</TableHead>
                              <TableHead>Descanso</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {workout.exercises.map((exercise, index) => (
                              <TableRow key={index}>
                                <TableCell>{exercise.name}</TableCell>
                                <TableCell>{exercise.sets}</TableCell>
                                <TableCell>{exercise.reps}</TableCell>
                                <TableCell>{exercise.rest}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <Button className="w-full">
                          <Zap className="size-4 mr-2" />
                          Comenzar entrenamiento
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="flexibility" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workoutPlans.flexibility.map((workout) => (
              <Card key={workout.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={workout.image}
                    alt={workout.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className={`absolute top-4 right-4 ${getDifficultyColor(workout.difficulty)}`}>
                    {workout.difficulty}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>{workout.name}</CardTitle>
                  <div className="flex gap-3 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      {workout.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="size-4 text-orange-500" />
                      {workout.calories} cal
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" onClick={() => setSelectedWorkout(workout)}>
                        <Play className="size-4 mr-2" />
                        Ver detalles
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{workout.name}</DialogTitle>
                        <DialogDescription>
                          Detalles del entrenamiento y ejercicios
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <Badge className={getDifficultyColor(workout.difficulty)}>
                            {workout.difficulty}
                          </Badge>
                          <Badge variant="secondary">
                            <Clock className="size-3 mr-1" />
                            {workout.duration}
                          </Badge>
                          <Badge variant="secondary">
                            <Flame className="size-3 mr-1" />
                            {workout.calories} cal
                          </Badge>
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Ejercicio</TableHead>
                              <TableHead>Series</TableHead>
                              <TableHead>Duración</TableHead>
                              <TableHead>Descanso</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {workout.exercises.map((exercise, index) => (
                              <TableRow key={index}>
                                <TableCell>{exercise.name}</TableCell>
                                <TableCell>{exercise.sets}</TableCell>
                                <TableCell>{exercise.reps}</TableCell>
                                <TableCell>{exercise.rest}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <Button className="w-full">
                          <Zap className="size-4 mr-2" />
                          Comenzar entrenamiento
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* FAQ Section with Accordion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-orange-500" />
            Preguntas frecuentes
          </CardTitle>
          <CardDescription>Todo lo que necesitas saber sobre los entrenamientos</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>¿Cuántas veces a la semana debo entrenar?</AccordionTrigger>
              <AccordionContent>
                Lo ideal es entrenar entre 3-5 veces por semana, dependiendo de tus objetivos y nivel de experiencia. 
                Es importante incluir días de descanso para permitir la recuperación muscular.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>¿Debo combinar fuerza y cardio?</AccordionTrigger>
              <AccordionContent>
                Sí, combinar entrenamiento de fuerza con cardio es beneficioso para la salud general. 
                Puedes alternar días de fuerza con días de cardio, o hacer ambos en la misma sesión 
                (primero fuerza, luego cardio moderado).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>¿Cuánto tiempo de descanso entre series?</AccordionTrigger>
              <AccordionContent>
                Para fuerza: 2-3 minutos. Para hipertrofia: 60-90 segundos. Para resistencia: 30-60 segundos. 
                Los descansos más largos permiten mejor recuperación para levantar pesos máximos.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>¿Qué hago si siento dolor durante el ejercicio?</AccordionTrigger>
              <AccordionContent>
                Diferencia entre molestia muscular (normal) y dolor agudo (señal de parada). 
                Si sientes dolor agudo, detente inmediatamente. Consulta con un profesional de la salud 
                si el dolor persiste.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
