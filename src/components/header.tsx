import { Activity, ChevronDown, LogOut, Moon, Sun } from "lucide-react"
import { Link } from "react-router"
import { useState, useEffect } from "react"
import { getInitials } from "@/lib/utils";
import { useAuth } from "@/presentation/context/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function Header() {
  const {
    logout
  } = useAuth()
  const manufacturerName = "PT Manufacturer Pharmacy";
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme;
      }
    }
    return "light";
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

        <div className="flex flex-row">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
                <div className="h-2 w-2 rounded-full bg-green-300 animate-pulse"></div>
                <span className="max-w-[150px] truncate">{manufacturerName || "{{Manufacture Name}}"}</span>
                <ChevronDown className="h-4 w-4 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <Avatar className="h-8 w-8 bg-primary/10">
                  <AvatarFallback className="text-primary font-medium">{getInitials(manufacturerName)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium leading-none">{manufacturerName}</p>
                  <p className="text-xs leading-none text-muted-foreground">admin@ptmanufacturer.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
