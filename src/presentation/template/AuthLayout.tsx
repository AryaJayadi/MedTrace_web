import {Outlet} from "react-router";

export const AuthLayout = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Outlet />
        </div>
    )
}