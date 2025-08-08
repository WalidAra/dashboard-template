import { useRoutes } from "react-router-dom";
import { authRoutes } from "../features/auth/routes.tsx";

const AppRouter = () => {
  return useRoutes([...authRoutes]);
};
export default AppRouter;
