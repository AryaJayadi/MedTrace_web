import { Activity } from "lucide-react"
import { Link } from "react-router"

export default function Header() {
  const manufacturerName = "PT Manufacturer Pharmacy";

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

        <div className="flex items-center gap-3 bg-primary-foreground/10 text-foreground backdrop-blur-sm px-4 py-2 rounded-full">
          <div className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse"></div>
          <span className="hidden sm:inline text-sm">Welcome,</span>
          <span className="text-sm font-medium">
            {manufacturerName || "Manufacturer Name"}
          </span>
        </div>
      </div>
    </header>
  );
}
