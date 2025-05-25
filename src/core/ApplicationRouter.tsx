import { JSX } from "react";
import { createBrowserRouter, Navigate, Outlet, useLocation, RouterProvider, useNavigate } from "react-router";
import { AuthLayout } from "@/presentation/template/AuthLayout.tsx";
import { RootLayout } from "@/presentation/template/RootLayout.tsx";
import { AuthProvider, useAuth } from "@/presentation/context/AuthContext.tsx";
import LoginPage from "@/presentation/auth/LoginPage";

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

const HomePagePlaceholder = () => {
  const { logout, orgId } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  }
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome, Organization: {orgId}!</h1>
      <p>You are now logged in to a protected area of MedTrace.</p>
      <button onClick={handleLogout} style={{ padding: '10px 20px', marginTop: '20px' }}>Logout</button>
    </div>
  );
}

const Root = () => {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Navigate to="/app" replace />
      },
      {
        path: "app",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <HomePagePlaceholder />
          },
        ]
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
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
