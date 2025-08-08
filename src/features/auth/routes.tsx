import { type RouteObject } from "react-router-dom";
import { SignIn, SignUp } from "./pages";
import AuthLayout from "@/features/auth/components/organisms/auth-layout.tsx";

export const authRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
];
