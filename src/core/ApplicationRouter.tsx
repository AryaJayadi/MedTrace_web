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
import DrugPage from "@/presentation/drug/DrugPage";
import { TableSkeleton } from "@/components/table-skeleton";
import TraceDrugPage from "@/presentation/drug/TraceDrugPage";
import ForbiddenPage from "@/presentation/util/ForbiddenPage";
import TraceDrugQRPage from "@/presentation/drug/TraceDrugQRPage";
import UpdateBatchPage from "@/presentation/batch/UpdateBatchPage";
import TransferDetailPage from "@/presentation/transfer/TransferDetailPage";
import { ThemeProvider } from "@/components/theme-provider";

interface ProtectedRouteProps {
  redirectPath?: string;
}

function useRouteRoles(route: string) {
  if (route.startsWith(ROUTES.FULL_PATH_APP_BATCH_UPDATE.replace(":batchID", ""))) {
    return ["Manufacturer"];
  }
  if (route.startsWith(ROUTES.TRACE_DRUG_QR.replace(":drugID", ""))) {
    return ["Manufacturer", "Patient"];
  }
  if (route.startsWith(ROUTES.FULL_PATH_APP_TRANSFER_VIEW.replace(":transferID", ""))) {
    return ["Manufacturer", "Distributor", "Pharmacy"];
  }
  switch (route) {
    case ROUTES.FULL_PATH_APP_BATCH:
      return ["Manufacturer", "Distributor", "Pharmacy"]
    case ROUTES.FULL_PATH_APP_BATCH_CREATE:
      return ["Manufacturer"]
    case ROUTES.FULL_PATH_APP_TRANSFER:
      return ["Manufacturer", "Distributor", "Pharmacy"]
    case ROUTES.FULL_PATH_APP_TRANSFER_CREATE:
      return ["Manufacturer", "Distributor", "Pharmacy"]
    case ROUTES.FULL_PATH_APP_TRANSFER_CREATE:
      return ["Manufacturer", "Distributor", "Pharmacy"]
    case ROUTES.FULL_PATH_APP_DRUG_TRACE:
      return ["Manufacturer", "Patient"]
    default:
      return []
  }
}

const ProtectedRoute: (p: ProtectedRouteProps) => (JSX.Element) = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const role = user?.Type || ""
  const isAllowed = useRouteRoles(location.pathname).includes(role)

  if (isAuthenticated === false) {
    return <Navigate to={ROUTES.FULL_PATH_AUTH_LOGIN} state={{ from: location }} replace />;
  }
  if (role !== "" && !isAllowed) {
    return <Navigate to={ROUTES.FORBIDDEN} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

const BatchPageWrapper = () => {
  const { user } = useAuth();

  if (!user) return <TableSkeleton />;
  if (user.Type === "Manufacturer") return <BatchPage />;
  else return <DrugPage />;
}

const Root = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    </ThemeProvider>
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
        path: ROUTES.TRACE_DRUG_QR,
        element: <TraceDrugQRPage />
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
                element: <BatchPageWrapper />
              },
              {
                path: ROUTES.APP_BATCH_CREATE,
                element: <CreateBatchPage />
              },
              {
                path: ROUTES.APP_BATCH_UPDATE,
                element: <UpdateBatchPage />
              },
              {
                path: ROUTES.APP_TRANSFER,
                element: <TransferPage />
              },
              {
                path: ROUTES.APP_TRANSFER_VIEW,
                element: <TransferDetailPage />
              },
              {
                path: ROUTES.APP_TRANSFER_CREATE,
                element: <CreateTransferPage />
              },
              {
                path: ROUTES.APP_DRUG_TRACE,
                element: <TraceDrugPage />
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
      },
      {
        path: ROUTES.FORBIDDEN,
        element: <ForbiddenPage />,
      }
    ]
  }
]);

export const ApplicationRouter = () => {
  return (
    <RouterProvider router={router} />
  );
};
