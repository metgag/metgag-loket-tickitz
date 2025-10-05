import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function RoleRoutes({ allowedRoles }) {
  const { role } = useSelector((state) => state.auth);

  if (!role) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
