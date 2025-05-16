import { RootLayout } from "@/presentation/template/RootLayout";
import { JSX } from "react";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router";
import { ROUTES } from "./Routes";
import { AuthLayout } from "@/presentation/template/AuthLayout";
import { LoginPage } from "@/presentation/auth/LoginPage";

interface ProtectedRouteProps {
  redirectPath: string;
}

const ProtectedRoute: (p: ProtectedRouteProps) => (JSX.Element) = (p: ProtectedRouteProps) => {
  if (false) {
    return <Navigate to={p.redirectPath} state={{ from: location }} />
  }

  return <Outlet />
}

const Root = () => {
  return (
    <RootLayout />
  )
}

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Root />,
    children: [
      {
        path: "",
        element: <Navigate to="" replace />
      },
      {
        path: "",
        element: <ProtectedRoute redirectPath={ROUTES.FULL_PATH_AUTH_LOGIN} />,
        children: [

        ]
      },
      {
        path: ROUTES.AUTH_SEGMENT,
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.AUTH_LOGIN,
            element: <LoginPage />
          },
        ]
      }
    ]
  }
]);

export const ApplicationRouter = () => {
  return (
    <RouterProvider router={router} />
  );
};
