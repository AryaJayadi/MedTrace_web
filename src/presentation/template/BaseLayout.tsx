import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { Outlet } from "react-router"

export const BaseLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 md:p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
