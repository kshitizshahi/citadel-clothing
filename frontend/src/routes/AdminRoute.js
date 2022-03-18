import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { isAdmin, isLoggedIn } = useSelector((state) => state.authUser);

  return isAdmin && isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
