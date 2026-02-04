import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { 
  Apple, 
  Coffee, 
  Sun, 
  Moon,
  Pizza,
  Salad,
  Beef,
  Fish,
  Milk,
  Cookie
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

export function Nutrition() {
  const [waterGlasses, setWaterGlasses] = useState(6);
  const totalWaterGlasses = 8;

  const dailyGoals = {
    calories: { current: 1850, goal: 2200 },
    protein: { current: 95, goal: 150 },
    carbs: { current: 180, goal: 220 },
    fats: { current: 55, goal: 70 },
  };

  const meals = [
    {
      name: "Desayuno",
      time: "8:00 AM",
      icon: Coffee,
      calories: 450,
      items: [
        { name: "Avena con frutas", calories: 280, protein: 12, carbs: 48, fats: 6 },
        { name: "Claras de huevo revueltas", calories: 120, protein: 20, carbs: 2, fats: 2 },
        { name: "Jugo de naranja", calories: 50, protein: 1, carbs: 12, fats: 0 },
      ],
    },
    {
      name: "Almuerzo",
      time: "1:00 PM",
      icon: Sun,
      calories: 650,
      items: [
        { name: "Pechuga de pollo a la plancha", calories: 280, protein: 45, carbs: 0, fats: 8 },
        { name: "Arroz integral", calories: 200, protein: 5, carbs: 45, fats: 2 },
        { name: "Ensalada mixta", calories: 80, protein: 3, carbs: 10, fats: 4 },
        { name: "Aguacate", calories: 90, protein: 1, carbs: 5, fats: 8 },
      ],
    },
    {
      name: "Merienda",
      time: "4:00 PM",
      icon: Apple,
      calories: 250,
      items: [
        { name: "Yogurt griego", calories: 150, protein: 18, carbs: 12, fats: 4 },
        { name: "Almendras", calories: 100, protein: 4, carbs: 4, fats: 9 },
      ],
    },
    {
      name: "Cena",
      time: "8:00 PM",
      icon: Moon,
      calories: 500,
      items: [
        { name: "Salmón al horno", calories: 280, protein: 35, carbs: 0, fats: 16 },
        { name: "Quinoa", calories: 120, protein: 5, carbs: 22, fats: 2 },
        { name: "Brócoli al vapor", calories: 50, protein: 4, carbs: 8, fats: 0 },
        { name: "Batata asada", calories: 50, protein: 1, carbs: 12, fats: 0 },
      ],
    },
  ];

  const foodCategories = [
    {
      name: "Proteínas",
      icon: Beef,
      color: "bg-red-100 text-red-800",
      foods: ["Pollo", "Pescado", "Carne", "Huevos", "Proteína en polvo"],
    },
    {
      name: "Carbohidratos",
      icon: Pizza,
      color: "bg-yellow-100 text-yellow-800",
      foods: ["Arroz", "Pasta", "Pan integral", "Avena", "Quinoa"],
    },
    {
      name: "Grasas saludables",
      icon: Fish,
      color: "bg-blue-100 text-blue-800",
      foods: ["Aguacate", "Nueces", "Aceite de oliva", "Salmón", "Mantequilla de maní"],
    },
    {
      name: "Vegetales",
      icon: Salad,
      color: "bg-green-100 text-green-800",
      foods: ["Brócoli", "Espinaca", "Tomate", "Pimientos", "Lechuga"],
    },
    {
      name: "Lácteos",
      icon: Milk,
      color: "bg-purple-100 text-purple-800",
      foods: ["Leche", "Yogurt griego", "Queso cottage", "Queso", "Kéfir"],
    },
    {
      name: "Snacks saludables",
      icon: Cookie,
      color: "bg-orange-100 text-orange-800",
      foods: ["Frutas", "Frutos secos", "Barras proteicas", "Hummus", "Palomitas"],
    },
  ];

  const calculatePercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const handleAddWater = () => {
    if (waterGlasses < totalWaterGlasses) {
      setWaterGlasses(waterGlasses + 1);
      toast.success("¡Vaso registrado!", {
        description: `${waterGlasses + 1} de ${totalWaterGlasses} vasos de agua`,
      });
    } else {
      toast.success("¡Objetivo cumplido!", {
        description: "Has completado tu objetivo de hidratación del día",
      });
    }
  };

  const handleResetWater = () => {
    setWaterGlasses(0);
    toast.info("Conteo reiniciado", {
      description: "El contador de vasos de agua ha sido reiniciado",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground">Plan nutricional</h2>
        <p className="text-muted-foreground">Seguimiento de tu alimentación y macros diarias</p>
      </div>

      {/* Daily Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Objetivos diarios</CardTitle>
          <CardDescription>Martes, 25 de Noviembre 2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span>Calorías</span>
              <span>
                {dailyGoals.calories.current} / {dailyGoals.calories.goal} kcal
              </span>
            </div>
            <Progress value={calculatePercentage(dailyGoals.calories.current, dailyGoals.calories.goal)} />
          </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Proteínas</span>
                <span className="text-sm text-foreground">
                  {dailyGoals.protein.current}g / {dailyGoals.protein.goal}g
                </span>
              </div>
              <Progress
                value={calculatePercentage(dailyGoals.protein.current, dailyGoals.protein.goal)}
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Carbohidratos</span>
                <span className="text-sm text-foreground">
                  {dailyGoals.carbs.current}g / {dailyGoals.carbs.goal}g
                </span>
              </div>
              <Progress
                value={calculatePercentage(dailyGoals.carbs.current, dailyGoals.carbs.goal)}
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Grasas</span>
                <span className="text-sm text-foreground">
                  {dailyGoals.fats.current}g / {dailyGoals.fats.goal}g
                </span>
              </div>
              <Progress
                value={calculatePercentage(dailyGoals.fats.current, dailyGoals.fats.goal)}
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meals */}
      <Card>
        <CardHeader>
          <CardTitle>Comidas de hoy</CardTitle>
          <CardDescription>Plan de alimentación detallado</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="breakfast">
                <Coffee className="size-4" />
              </TabsTrigger>
              <TabsTrigger value="lunch">
                <Sun className="size-4" />
              </TabsTrigger>
              <TabsTrigger value="snack">
                <Apple className="size-4" />
              </TabsTrigger>
              <TabsTrigger value="dinner">
                <Moon className="size-4" />
              </TabsTrigger>
            </TabsList>

             <TabsContent value="all" className="space-y-4 mt-4">
               {meals.map((meal, index) => {
                 const Icon = meal.icon;
                 return (
                   <div key={index} className="border rounded-lg p-4 space-y-3">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center">
                           <Icon className="size-5 text-orange-600" />
                         </div>
                         <div>
                           <h3 className="text-foreground">{meal.name}</h3>
                           <p className="text-sm text-muted-foreground">{meal.time}</p>
                         </div>
                       </div>
                       <Badge variant="secondary">{meal.calories} kcal</Badge>
                     </div>
                     <Separator />
                     <div className="space-y-2">
                       {meal.items.map((item, itemIndex) => (
                         <div
                           key={itemIndex}
                           className="flex items-center justify-between p-2 rounded bg-muted"
                         >
                           <span className="text-sm text-foreground">{item.name}</span>
                           <div className="flex gap-3 text-xs text-muted-foreground">
                             <span>{item.calories} cal</span>
                             <span>P: {item.protein}g</span>
                             <span>C: {item.carbs}g</span>
                             <span>G: {item.fats}g</span>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 );
               })}
             </TabsContent>

             <TabsContent value="breakfast" className="mt-4">
               {meals.slice(0, 1).map((meal, index) => {
                 const Icon = meal.icon;
                 return (
                   <div key={index} className="border rounded-lg p-4 space-y-3">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center">
                           <Icon className="size-5 text-orange-600" />
                         </div>
                         <div>
                           <h3 className="text-foreground">{meal.name}</h3>
                           <p className="text-sm text-muted-foreground">{meal.time}</p>
                         </div>
                       </div>
                       <Badge variant="secondary">{meal.calories} kcal</Badge>
                     </div>
                     <Separator />
                     <div className="space-y-2">
                       {meal.items.map((item, itemIndex) => (
                         <div
                           key={itemIndex}
                           className="flex items-center justify-between p-2 rounded bg-muted"
                         >
                           <span className="text-sm text-foreground">{item.name}</span>
                           <div className="flex gap-3 text-xs text-muted-foreground">
                             <span>{item.calories} cal</span>
                             <span>P: {item.protein}g</span>
                             <span>C: {item.carbs}g</span>
                             <span>G: {item.fats}g</span>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 );
               })}
             </TabsContent>

             <TabsContent value="lunch" className="mt-4">
               {meals.slice(1, 2).map((meal, index) => {
                 const Icon = meal.icon;
                 return (
                   <div key={index} className="border rounded-lg p-4 space-y-3">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center">
                           <Icon className="size-5 text-orange-600" />
                         </div>
                         <div>
                           <h3 className="text-foreground">{meal.name}</h3>
                           <p className="text-sm text-muted-foreground">{meal.time}</p>
                         </div>
                       </div>
                       <Badge variant="secondary">{meal.calories} kcal</Badge>
                     </div>
                     <Separator />
                     <div className="space-y-2">
                       {meal.items.map((item, itemIndex) => (
                         <div
                           key={itemIndex}
                           className="flex items-center justify-between p-2 rounded bg-muted"
                         >
                           <span className="text-sm text-foreground">{item.name}</span>
                           <div className="flex gap-3 text-xs text-muted-foreground">
                             <span>{item.calories} cal</span>
                             <span>P: {item.protein}g</span>
                             <span>C: {item.carbs}g</span>
                             <span>G: {item.fats}g</span>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 );
               })}
             </TabsContent>

             <TabsContent value="snack" className="mt-4">
               {meals.slice(2, 3).map((meal, index) => {
                 const Icon = meal.icon;
                 return (
                   <div key={index} className="border rounded-lg p-4 space-y-3">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center">
                           <Icon className="size-5 text-orange-600" />
                         </div>
                         <div>
                           <h3 className="text-foreground">{meal.name}</h3>
                           <p className="text-sm text-muted-foreground">{meal.time}</p>
                         </div>
                       </div>
                       <Badge variant="secondary">{meal.calories} kcal</Badge>
                     </div>
                     <Separator />
                     <div className="space-y-2">
                       {meal.items.map((item, itemIndex) => (
                         <div
                           key={itemIndex}
                           className="flex items-center justify-between p-2 rounded bg-muted"
                         >
                           <span className="text-sm text-foreground">{item.name}</span>
                           <div className="flex gap-3 text-xs text-muted-foreground">
                             <span>{item.calories} cal</span>
                             <span>P: {item.protein}g</span>
                             <span>C: {item.carbs}g</span>
                             <span>G: {item.fats}g</span>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 );
               })}
             </TabsContent>

             <TabsContent value="dinner" className="mt-4">
               {meals.slice(3, 4).map((meal, index) => {
                 const Icon = meal.icon;
                 return (
                   <div key={index} className="border rounded-lg p-4 space-y-3">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center">
                           <Icon className="size-5 text-orange-600" />
                         </div>
                         <div>
                           <h3 className="text-foreground">{meal.name}</h3>
                           <p className="text-sm text-muted-foreground">{meal.time}</p>
                         </div>
                       </div>
                       <Badge variant="secondary">{meal.calories} kcal</Badge>
                     </div>
                     <Separator />
                     <div className="space-y-2">
                       {meal.items.map((item, itemIndex) => (
                         <div
                           key={itemIndex}
                           className="flex items-center justify-between p-2 rounded bg-muted"
                         >
                           <span className="text-sm text-foreground">{item.name}</span>
                           <div className="flex gap-3 text-xs text-muted-foreground">
                             <span>{item.calories} cal</span>
                             <span>P: {item.protein}g</span>
                             <span>C: {item.carbs}g</span>
                             <span>G: {item.fats}g</span>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 );
               })}
             </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Food Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Guía de alimentos recomendados</CardTitle>
          <CardDescription>Alimentos ideales para tu plan nutricional</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foodCategories.map((category) => {
              const Icon = category.icon;
              return (
                 <div key={category.name} className="border rounded-lg p-4 space-y-3">
                   <div className="flex items-center gap-3">
                     <div className={`size-10 rounded-full ${category.color} flex items-center justify-center`}>
                       <Icon className="size-5" />
                     </div>
                     <h3 className="text-foreground">{category.name}</h3>
                   </div>
                   <ul className="space-y-1">
                     {category.foods.map((food, index) => (
                       <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                         <div className="size-1.5 rounded-full bg-muted-foreground" />
                         {food}
                       </li>
                     ))}
                   </ul>
                 </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Hydration */}
      <Card>
        <CardHeader>
          <CardTitle>Hidratación</CardTitle>
          <CardDescription>Seguimiento de consumo de agua</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-foreground">Vasos de agua (250ml)</span>
              <span className="text-foreground">{waterGlasses} / {totalWaterGlasses} vasos</span>
            </div>
            <Progress value={calculatePercentage(waterGlasses, totalWaterGlasses)} />
          </div>
          <div className="flex gap-2">
            {Array.from({ length: totalWaterGlasses }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-12 rounded transition-colors ${
                  i < waterGlasses ? "bg-blue-500" : "bg-accent"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleResetWater} variant="outline" className="flex-1">
              Reiniciar
            </Button>
            <Button onClick={handleAddWater} className="flex-1" disabled={waterGlasses >= totalWaterGlasses}>
              {waterGlasses >= totalWaterGlasses ? "¡Objetivo cumplido!" : "Registrar vaso de agua"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
