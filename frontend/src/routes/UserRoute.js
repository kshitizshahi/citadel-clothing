import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = () => {
  const user = useSelector((state) => state.authUser);
  const { isLoggedIn } = user;
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoute;
