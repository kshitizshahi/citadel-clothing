import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SellerRoute = () => {
  const { isSeller, isLoggedIn } = useSelector((state) => state.authUser);

  return isSeller && isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default SellerRoute;
