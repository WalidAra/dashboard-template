import { Outlet } from "react-router-dom";
import { GalleryVerticalEnd } from "lucide-react";

const AuthLayout = () => {
  return (
    <main className="grid min-h-svh lg:grid-cols-2 p-6">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs flex flex-col gap-6">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="bg-accent-foreground rounded-md relative hidden lg:block"></div>
    </main>
  );
};
export default AuthLayout;
