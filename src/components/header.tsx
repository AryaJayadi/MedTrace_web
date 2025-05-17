import { Activity, Moon, Sun } from "lucide-react"
import { Link } from "react-router"
import { useState, useEffect } from "react"

export default function Header() {
  const manufacturerName = "PT Manufacturer Pharmacy";
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme;
      }
      // Optionally, check for system preference
      // return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light"; // Default theme
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md z-10 relative">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="#"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Activity className="h-6 w-6" />
          <span className="text-xl font-semibold">MedTrace</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-primary-foreground/10 text-foreground backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse"></div>
            <span className="hidden sm:inline text-sm">Welcome,</span>
            <span className="text-sm font-medium">
              {manufacturerName || "Manufacturer Name"}
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-primary-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-primary-foreground" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
