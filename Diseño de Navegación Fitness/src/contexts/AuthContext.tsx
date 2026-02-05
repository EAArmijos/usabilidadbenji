import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage (we don't use Firebase Auth)
    const storedUser = localStorage.getItem("fitpro_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("fitpro_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Query Firestore `User` collection for matching email+password
    const q = query(
      collection(db, "User"),
      where("email", "==", email),
      where("password", "==", password)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      throw new Error("Credenciales inválidas");
    }

    const doc = snapshot.docs[0];
    const data: any = doc.data();

    const userData: User = {
      id: doc.id,
      email: data.email,
      name: data.name,
      avatar: data.avatar,
    };

    setUser(userData);
    localStorage.setItem("fitpro_user", JSON.stringify(userData));
  };

  const register = async (name: string, email: string, password: string) => {
    // Prevent duplicate emails
    const q = query(collection(db, "User"), where("email", "==", email));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      throw new Error("El email ya está registrado");
    }

    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random`;

    const newUser = {
      name,
      email,
      password,
      avatar,
      createdAt: new Date().toISOString(),
    };

    const ref = await addDoc(collection(db, "User"), newUser);

    const userData: User = {
      id: ref.id,
      email,
      name,
      avatar,
    };

    setUser(userData);
    localStorage.setItem("fitpro_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fitpro_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
