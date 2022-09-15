import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mantine/core";
import LoadingDots from "../../components/Loading";
import SideBar from "../../components/Seller/SideBar";
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";
import { Admin_Page_Dashboard } from "../../utils/PageTitle";
import "../../styles/adminDashboard.scss";
import { DASHBOARD_INFO } from "../../utils/BaseUrl";

const Dashboard = () => {
  const { loading } = useSelector((state) => state.Product);
  const { mobileDevice } = useSelector((state) => state.Media);
  const [hideSideBar, setHideSideBar] = useState(false);
  const [dashboardInfo, setDashboardInfo] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = Admin_Page_Dashboard;
  }, []);

  useEffect(() => {
    let mounted = true;
    (async function () {
      try {
        const response = await axios.get(DASHBOARD_INFO);
        if (mounted) {
          setDashboardInfo(response.data.dashboardInfo);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    })();

    return () => {
      mounted = false;
      setDashboardInfo([]);
    };
  }, []);

  const toggleSideBar = (e) => {
    setHideSideBar(!hideSideBar);
  };

  if (mobileDevice && hideSideBar) {
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.height = "";
    document.body.style.overflow = "";
  }

  const DashboardCards = ({ className, icon, heading, subTopic, data }) => {
    return (
      <div className={`card-items ${className}`}>
        <div className="icon-container">
          <Icon icon={icon} className="icon" />
        </div>
        <div className="data-container">
          <p className="heading"> {data} </p>
          <p className="sub-topic"> {subTopic} </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="admin-dashboard-container">
          {!mobileDevice ? (
            <div className={hideSideBar ? "side-bar hide" : "side-bar"}>
              <SideBar />
            </div>
          ) : (
            <div
              className={hideSideBar ? "admin-side-bar" : "admin-side-bar none"}
              style={{ width: hideSideBar ? "26rem" : "0" }}
            >
              <div className="close">
                <Icon
                  icon="ci:close-big"
                  className="cancel-btn"
                  onClick={toggleSideBar}
                />
              </div>
              <SideBar />
            </div>
          )}

          <div className="dashboard-container">
            <div className="container">
              <div className="heading-container">
                <Icon
                  icon="charm:menu-hamburger"
                  onClick={toggleSideBar}
                  className="toggle-sidebar"
                />

                <p className="heading">Dashboard</p>
              </div>
              <div className="dashboard-wrapper">
                <div className="dashboard-cards">
                  <DashboardCards
                    className="customers"
                    icon="fa-solid:users"
                    data={dashboardInfo.totalCustomers}
                    subTopic="Customers"
                  />
                  <DashboardCards
                    className="products"
                    icon="icon-park-outline:ad-product"
                    data={dashboardInfo.totalProducts}
                    subTopic="Total Products"
                  />
                  <DashboardCards
                    className="orders"
                    icon="clarity:list-line"
                    data={dashboardInfo.totalOrders}
                    subTopic="Placed Orders"
                  />
                  <DashboardCards
                    className="category"
                    icon="icon-park-outline:difference-set"
                    data={dashboardInfo.totalCategory}
                    subTopic="Total Categories"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
