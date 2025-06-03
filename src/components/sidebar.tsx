import { cn } from "@/lib/utils"
import { Package, ArrowRightLeft, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Link, useLocation } from "react-router"
import { ROUTES } from "@/core/Routes"
import { useAuth } from "@/presentation/context/AuthContext"

export default function Sidebar() {
  const {
    user
  } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // For mobile sidebar
  let location = useLocation();

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // If resizing to desktop and mobile menu was open, close it.
      if (!mobile && isOpen) {
        setIsOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [isOpen]); // Added isOpen to dependencies to handle closing it on resize

  const navItems = [
    { name: "Batch", path: ROUTES.FULL_PATH_APP_BATCH, roles: ["Manufacturer", "Distributor", "Pharmacy"], icon: <Package className="h-5 w-5" /> },
    { name: "Transfer", path: ROUTES.FULL_PATH_APP_TRANSFER, roles: ["Manufacturer", "Distributor", "Pharmacy"], icon: <ArrowRightLeft className="h-5 w-5" /> },
    { name: "Trace", path: ROUTES.FULL_PATH_APP_DRUG_TRACE, roles: ["Manufacturer", "Distributor", "Pharmacy", "Patient"], icon: <Search className="h-5 w-5" /> },
  ];

  const role = user?.Type || "Guest"

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  // Mobile Sidebar
  if (isMobile) {
    return (
      <>
        {/* Mobile Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={cn(
            "fixed top-20 left-4 z-50 p-2 rounded-full shadow-lg transition-colors duration-150",
            "bg-card text-primary hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          )}
          aria-label="Toggle sidebar"
        >
          {/* Uses ChevronLeft when open, ChevronRight when closed as per your code */}
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>

        {/* Overlay for mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" // md:hidden to ensure it's only for mobile
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Navigation Panel */}
        <nav
          className={cn(
            "fixed top-0 left-0 z-[45] h-full shadow-xl transition-transform duration-300 ease-in-out w-64", // z-index adjusted to be above overlay but below toggle button if needed
            "bg-sidebar text-sidebar-foreground border-r border-sidebar-border",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Optional: Mobile Sidebar Header (e.g., App Name/Logo) */}
          <div className="flex items-center justify-between p-4 h-16 border-b border-sidebar-border">
            <span className="text-xl font-semibold text-sidebar-primary">MedTrace</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sidebar-muted-foreground hover:text-sidebar-foreground p-1 rounded-md focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close sidebar"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation items container */}
          <div className="pt-4 pb-6"> {/* Adjusted padding from pt-16 to pt-4 due to header */}
            {navItems.map((item) => (
              item.roles.includes(role) &&
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)} // Close sidebar on item click
                className={cn(
                  "flex items-center gap-3 mx-3 px-4 py-3 rounded-lg mb-1 transition-all duration-150",
                  location.pathname.startsWith(item.path)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" // Active item
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", // Inactive item
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar" // Focus style
                )}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </>
    );
  }

  // Desktop Sidebar
  return (
    // Relative container for the desktop sidebar and its toggle button
    <div className={cn(
      "relative min-h-screen transition-width duration-300 ease-in-out", // Ensure h-screen if it's a direct child of body or a flex container
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Desktop Navigation Panel */}
      <nav
        className={cn(
          "h-full shadow-sm transition-width duration-300 ease-in-out flex flex-col",
          "bg-sidebar text-sidebar-foreground border-r border-sidebar-border",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Desktop Sidebar Header (e.g., App Name/Logo) */}
        <div className={cn(
          "flex items-center h-16 border-b border-sidebar-border px-4 shrink-0", // shrink-0 to prevent shrinking
          collapsed ? "justify-center" : "justify-start gap-2"
        )}>
          {/* <Activity className={cn("h-7 w-7", collapsed ? "text-sidebar-primary" : "text-sidebar-primary")} /> */}
          {/* ^ You can add an icon like Activity here if you want a logo */}
          {!collapsed && <span className="text-xl font-semibold text-sidebar-primary">MedTrace</span>}
          {collapsed && ( /* Show a small icon when collapsed for branding */
            <Link to="/" aria-label="Home">
              <Package className="h-7 w-7 text-sidebar-primary" />
            </Link>
          )}
        </div>

        {/* Navigation items container */}
        <div className="py-6 flex-grow overflow-y-auto"> {/* flex-grow and overflow for scrollable content if needed */}
          <TooltipProvider delayDuration={0}>
            {navItems.map((item) => (
              item.roles.includes(role) &&
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 mx-3 px-4 py-3 rounded-lg mb-1 transition-all duration-150",
                      location.pathname.startsWith(item.path)
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" // Active item
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", // Inactive item
                      collapsed && "justify-center px-2", // Styles for collapsed state
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar" // Focus style
                    )}
                  >
                    {item.icon}
                    {!collapsed && <span className="font-medium">{item.name}</span>}
                  </Link>
                </TooltipTrigger>
                {/* Tooltip only shown when collapsed */}
                {collapsed && (
                  <TooltipContent side="right" className="bg-popover text-popover-foreground border-border">
                    {/* Ensure TooltipContent from your library uses themed variables or add classes here */}
                    <span className="text-sm">{item.name}</span>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </nav>

      {/* Desktop Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={cn(
          "absolute top-6 -right-3 transform translate-x-0 p-1.5 rounded-full shadow-md transition-all duration-150 ease-in-out", // Kept -right-3, top-6 from your code
          "bg-card border border-sidebar-border text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        )}
        // style={{ transform: 'translateY(-50%) translateX(50%)' }} // Alternative for precise centering on edge if -right-3 isn't perfect
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </div>
  );
}
