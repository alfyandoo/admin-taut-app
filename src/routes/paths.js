import { ProtectedRoute } from "../components/templates/ProtectedRoute";
import { Dashboard } from "../pages/Dashboard";
import { PageNotFound } from "../pages/PageNotFound";
import { Login } from "../pages/Login";
import { ManageUser } from "../pages/ManageUser";

export const paths = [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/manage-user",
      element: (
        <ProtectedRoute>
          <ManageUser />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ];