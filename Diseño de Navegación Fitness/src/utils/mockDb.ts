// src/utils/mockDb.ts

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  phone?: string;
  location?: string;
  age?: number;
  weight?: number; // kg
  height?: number; // cm o metros (el sistema detectará)
  bmi?: string;
  bmiStatus?: string;
  dailyCalories?: number;
  updatedAt: string;
}

const DB_KEY = "fitpro_database_v2"; // Cambiamos la versión para limpiar datos viejos corruptos
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const MockDB = {
  async getProfile(userId: string): Promise<UserProfile | null> {
    await delay(300);
    const db = JSON.parse(localStorage.getItem(DB_KEY) || "{}");
    return db[userId] || null;
  },

  async saveProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    await delay(400); 
    const db = JSON.parse(localStorage.getItem(DB_KEY) || "{}");
    const current = db[userId] || {};
    
    // Fusionar datos
    const merged: UserProfile = { ...current, ...data, id: userId, updatedAt: new Date().toISOString() };

    // --- CORRECCIÓN INTELIGENTE DE CÁLCULOS ---
    if (merged.weight && merged.height && merged.weight > 0 && merged.height > 0) {
      
      // 1. Normalizar Altura (Detectar si es CM o Metros)
      let heightInMeters = merged.height;
      
      // Si la altura es mayor a 3 (ej: 170), asumimos que son CM y dividimos por 100
      // Si la altura es menor a 3 (ej: 1.70), asumimos que ya son Metros.
      if (merged.height > 3) {
        heightInMeters = merged.height / 100;
      }

      // 2. Calcular IMC
      const bmiVal = merged.weight / (heightInMeters * heightInMeters);
      merged.bmi = bmiVal.toFixed(1);
      
      // Clasificación OMS
      if (bmiVal < 18.5) merged.bmiStatus = "Bajo peso";
      else if (bmiVal < 25) merged.bmiStatus = "Peso saludable";
      else if (bmiVal < 30) merged.bmiStatus = "Sobrepeso";
      else merged.bmiStatus = "Obesidad";

      // 3. Calorías Basales (Harris-Benedict)
      // Usamos la altura en CM para la fórmula
      const heightInCm = heightInMeters * 100;
      const age = merged.age || 25;
      
      // Fórmula genérica ajustada (promedio hombre/mujer para simplificar si no hay género)
      const bmr = (10 * merged.weight) + (6.25 * heightInCm) - (5 * age);
      merged.dailyCalories = Math.round(bmr * 1.4); // Factor actividad ligero/moderado
    }

    db[userId] = merged;
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    return merged;
  }
};