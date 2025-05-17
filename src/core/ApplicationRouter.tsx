import { RootLayout } from "@/presentation/template/RootLayout";
import { JSX } from "react";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router";
import { ROUTES } from "./Routes";
import { AuthLayout } from "@/presentation/template/AuthLayout";
import { LoginPage } from "@/presentation/auth/LoginPage";
import BatchesPage from "@/presentation/batch/BatchPage";
import { BaseLayout } from "@/presentation/template/BaseLayout";
import CreateBatchPage from "@/presentation/batch/CreateBatchPage";
import TransferPage from "@/presentation/transfer/TransferPage";

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
        path: ROUTES.ROOT,
        element: <Navigate to={ROUTES.FULL_PATH_APP_BATCH} replace />
      },
      {
        path: ROUTES.ROOT,
        element: <ProtectedRoute redirectPath={ROUTES.FULL_PATH_AUTH_LOGIN} />,
        children: [
          {
            path: ROUTES.APP_MAIN_SEGMENT,
            element: <BaseLayout />,
            children: [
              {
                path: ROUTES.APP_BATCH,
                element: <BatchesPage />
              },
              {
                path: ROUTES.APP_BATCH_CREATE,
                element: <CreateBatchPage />
              },
              {
                path: ROUTES.APP_TRANSFER,
                element: <TransferPage />
              }
            ]
          }
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
