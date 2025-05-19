import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    // Main page container with themed background
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar: Using primary background color */}
      <div className="bg-primary h-1.5 w-full"></div> {/* Adjusted height for subtlety */}

      <Outlet />

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MedTrace. All rights reserved.
      </footer>
    </div>
  );
}
