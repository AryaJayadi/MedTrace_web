import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <div className="w-screen h-screen overflow-auto scrollbar-none">
      <Outlet />
    </div>
  )
}
