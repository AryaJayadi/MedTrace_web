import { JSX } from "react";
import { createBrowserRouter, Navigate, Outlet, useLocation, RouterProvider } from "react-router";
import { AuthLayout } from "@/presentation/template/AuthLayout.tsx";
import { RootLayout } from "@/presentation/template/RootLayout.tsx";
import { AuthProvider, useAuth } from "@/presentation/context/AuthContext.tsx";
import { LoginPage } from "@/presentation/auth/LoginPage";
import { ROUTES } from "./Routes";
import { BaseLayout } from "@/presentation/template/BaseLayout";
import BatchPage from "@/presentation/batch/BatchPage";
import CreateBatchPage from "@/presentation/batch/CreateBatchPage";
import TransferPage from "@/presentation/transfer/TransferPage";
import CreateTransferPage from "@/presentation/transfer/CreateTransferPage";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: (p: ProtectedRouteProps) => (JSX.Element) = ({ redirectPath = "/auth/login" }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

const Root = () => {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
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
                element: <BatchPage />
              },
              {
                path: ROUTES.APP_BATCH_CREATE,
                element: <CreateBatchPage />
              },
              {
                path: ROUTES.APP_TRANSFER,
                element: <TransferPage />
              },
              {
                path: ROUTES.APP_TRANSFER_CREATE,
                element: <CreateTransferPage />
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
