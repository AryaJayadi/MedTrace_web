import { cn } from "@/lib/utils"
import { Package, ArrowRightLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Link, useLocation } from "react-router"

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  let location = useLocation()

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const navItems = [
    { name: "Batch", path: "/batches", icon: <Package className="h-5 w-5" /> },
    { name: "Transfer", path: "/transfers", icon: <ArrowRightLeft className="h-5 w-5" /> },
  ]

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen)
    } else {
      setCollapsed(!collapsed)
    }
  }

  if (isMobile) {
    return (
      <>
        <button
          onClick={toggleSidebar}
          className="fixed top-20 left-4 z-50 bg-white p-2 rounded-full shadow-md text-primary"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>

        {isOpen && <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsOpen(false)} />}

        <nav
          className={cn(
            "fixed top-0 left-0 z-40 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out w-64",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="pt-16 pb-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 mx-3 px-4 py-3 rounded-lg mb-1 transition-all",
                  location.pathname.startsWith(item.path)
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100",
                )}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </>
    )
  }

  return (
    <div className="relative">
      <nav
        className={cn(
          "h-screen bg-white shadow-sm transition-all duration-300 ease-in-out",
          collapsed ? "w-20" : "w-64",
        )}
      >
        <div className="py-6">
          <TooltipProvider delayDuration={0}>
            {navItems.map((item) => (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 mx-3 px-4 py-3 rounded-lg mb-1 transition-all",
                      location.pathname.startsWith(item.path)
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100",
                      collapsed && "justify-center px-2",
                    )}
                  >
                    {item.icon}
                    {!collapsed && <span className="font-medium">{item.name}</span>}
                  </Link>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </nav>

      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm text-gray-500 hover:text-primary transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </div>
  )
}
