import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { MockDB, UserProfile } from "../utils/mockDb"; // Import sin .ts
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { toast } from "sonner"; 
import { 
  User, Phone, MapPin, Calendar, Trophy, Target, Zap, 
  Settings, Loader2, Activity, Eye, Moon
} from "lucide-react";

export function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [highContrast, setHighContrast] = useState(false); // Estado para Accesibilidad
  
  // Estado inicial vacío (se llenará con datos reales)
  const [profile, setProfile] = useState<UserProfile>({
    id: "",
    name: "",
    email: "",
    bio: "",
    phone: "",
    location: "",
    age: 0,
    weight: 0,
    height: 0,
    bmi: "0",
    bmiStatus: "Sin calcular",
    dailyCalories: 0,
    updatedAt: ""
  });

  // 1. Cargar datos del usuario REAL al iniciar
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    setLoading(true);
    // Busca en la base de datos simulada
    const storedProfile = await MockDB.getProfile(user!.id);
    
    if (storedProfile) {
      setProfile(storedProfile);
    } else {
      // Si es la primera vez, crea el perfil con los datos del registro (AuthContext)
      setProfile(prev => ({
        ...prev,
        id: user!.id,
        name: user!.name,
        email: user!.email
      }));
    }
    setLoading(false);
  };

  // 2. Guardar y Ejecutar Calculadora
  const handleSave = async () => {
    setSaving(true);
    try {
      // MockDB.saveProfile contiene la lógica matemática (IMC, Calorías)
      const updatedProfile = await MockDB.saveProfile(user!.id, profile);
      setProfile(updatedProfile); // Actualiza la vista con los resultados
      toast.success("Datos guardados y métricas recalculadas");
    } catch (error) {
      toast.error("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

  // Clase dinámica para el Modo Accesibilidad
  const containerClass = highContrast 
    ? "space-y-6 grayscale contrast-125 bg-white p-4 rounded-lg border-2 border-black" 
    : "space-y-6 animate-in fade-in duration-500";

  return (
     <div className={containerClass}>
      <div>
        <h2 className="text-foreground text-2xl font-bold flex items-center gap-2">
          Mi Perfil
          {highContrast && <Badge variant="outline" className="text-xs">Modo Accesible</Badge>}
        </h2>
        <p className="text-muted-foreground">Gestión de cuenta y métricas de salud</p>
      </div>

      {/* Tarjeta Principal del Usuario */}
      <Card className={highContrast ? "border-2 border-black shadow-none" : ""}>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="size-24 border-4 border-white shadow-lg">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${profile.name}&background=random`} />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            
             <div className="flex-1 space-y-2">
               <div className="flex items-center gap-3">
                 <h3 className="text-2xl font-bold text-foreground">{profile.name}</h3>
                 <Badge variant={profile.bmiStatus === "Peso saludable" ? "default" : "secondary"}>
                   {profile.bmiStatus || "Sin datos"}
                 </Badge>
               </div>
               <p className="text-muted-foreground">{profile.email}</p>
               
               <div className="flex gap-4 text-sm text-muted-foreground">
                 {profile.location && <div className="flex items-center gap-1"><MapPin className="size-3"/> {profile.location}</div>}
                 {profile.updatedAt && <div className="flex items-center gap-1"><Calendar className="size-3"/> Actualizado hoy</div>}
               </div>
             </div>
          </div>
        </CardContent>
      </Card>

      {/* Panel de Métricas (Resultados de la Calculadora) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={highContrast ? "border-2 border-black" : "bg-muted border-orange-100"}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="size-4 text-orange-500" />
              IMC (Calculado)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{profile.bmi || "--"}</div>
            <p className="text-xs text-muted-foreground">{profile.bmiStatus}</p>
          </CardContent>
        </Card>
 
        <Card className={highContrast ? "border-2 border-black" : "bg-muted border-blue-100"}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Zap className="size-4 text-blue-500" />
              Metabolismo Basal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{profile.dailyCalories || 0}</div>
            <p className="text-xs text-muted-foreground">kcal / día recomendadas</p>
          </CardContent>
        </Card>
 
        <Card className={highContrast ? "border-2 border-black" : "bg-muted border-green-100"}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="size-4 text-green-500" />
              Peso Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{profile.weight || 0} kg</div>
            <p className="text-xs text-muted-foreground">Registrado en sistema</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit"><User className="size-4 mr-2"/>Editar Datos</TabsTrigger>
          <TabsTrigger value="settings"><Settings className="size-4 mr-2"/>Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Calculadora de Salud</CardTitle>
              <CardDescription>Actualiza tus medidas corporales para obtener tu diagnóstico.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre Completo</Label>
                  <Input value={profile.name} onChange={(e) => handleChange('name', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Ubicación</Label>
                  <Input value={profile.location} onChange={(e) => handleChange('location', e.target.value)} placeholder="Ej. Quito, Ecuador" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Biografía</Label>
                <Textarea value={profile.bio} onChange={(e) => handleChange('bio', e.target.value)} placeholder="Mis objetivos fitness son..." />
              </div>

              <Separator className="my-4" />
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Edad</Label>
                  <Input type="number" value={profile.age} onChange={(e) => handleChange('age', Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Peso (kg)</Label>
                  <Input type="number" value={profile.weight} onChange={(e) => handleChange('weight', Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Altura (cm)</Label>
                  <Input type="number" value={profile.height} onChange={(e) => handleChange('height', Number(e.target.value))} />
                </div>
              </div>

              <Button onClick={handleSave} disabled={saving} className="w-full bg-orange-600 hover:bg-orange-700 font-bold">
                {saving ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Procesando...</>
                ) : (
                  "Guardar y Calcular Métricas"
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4">
          <div className="space-y-6">
            {/* Sección de Accesibilidad Nueva */}
            <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="size-5 text-blue-600" />
                    Accesibilidad Visual
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Modo Alto Contraste</Label>
                        <p className="text-sm text-muted-foreground">
                           Aumenta el contraste y elimina colores suaves para mejorar la lectura.
                        </p>
                      </div>
                      <Switch 
                        checked={highContrast}
                        onCheckedChange={setHighContrast}
                      />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                  <CardTitle>Cuenta</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive" className="w-full">
                        Cerrar Sesión
                    </Button>
                </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}