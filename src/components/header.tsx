import { Activity } from "lucide-react"
import { Link } from "react-router"

export default function Header() {
  const manufacturerName = "PT Manufacturer Pharmacy" // This would come from auth/context in a real app

  return (
    <header className="gradient-bg text-white shadow-md z-10 relative">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="#" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Activity className="h-6 w-6" />
          <span className="text-xl font-semibold">MedTrace</span>
        </Link>
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
          <div className="h-2 w-2 rounded-full bg-green-300 animate-pulse"></div>
          <span className="hidden sm:inline">Welcome,</span> {manufacturerName || "{{Manufacture Name}}"}
        </div>
      </div>
    </header>
  )
}
