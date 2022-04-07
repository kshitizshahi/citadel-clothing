import { Outlet } from "react-router-dom";
import UserNav from "../components/UserNav";
import "../styles/userPageLayout.scss";

const UserPageLayout = () => {
  return (
    <div className="user-page-layout">
      <div className="container">
        <div className="user-nav">
          <UserNav />
        </div>
        <div className="child-component">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserPageLayout;
