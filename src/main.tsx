import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import TanStackQueryProvider from "./common/providers/tan-stack-query.tsx";
import "@/common/styles/globals.css";
import { Toaster } from "@/common/components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanStackQueryProvider>
      <App />
      <Toaster />
    </TanStackQueryProvider>
  </StrictMode>,
);
