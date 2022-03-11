import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { isAdmin } = useSelector((state) => state.authUser);

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
