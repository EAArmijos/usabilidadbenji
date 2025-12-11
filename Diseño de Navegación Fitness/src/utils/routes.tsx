import { createBrowserRouter } from "react-router";
import { Home } from "../components/Home";
import { Workouts } from "../components/Workouts";
import { Nutrition } from "../components/Nutrition";
import { Progress } from "../components/Progress";
import { Schedule } from "../components/Schedule";
import { Profile } from "../components/Profile";
import { Layout } from "../components/Layout";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { ForgotPassword } from "../components/auth/ForgotPassword";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Home },
      { path: "workouts", Component: Workouts },
      { path: "nutrition", Component: Nutrition },
      { path: "progress", Component: Progress },
      { path: "schedule", Component: Schedule },
      { path: "profile", Component: Profile },
    ],
  },
]);