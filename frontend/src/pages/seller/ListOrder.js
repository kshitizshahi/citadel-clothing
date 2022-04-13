import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Order_Details_Page_Title } from "../../utils/PageTitle";
import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Center, Tooltip } from "@mantine/core";
import LoadingDots from "../../components/Loading";
import SideBar from "../../components/Seller/SideBar";
import "../../styles/listCategory.scss";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";

const ListSellerOrder = () => {
  const [order, setOrder] = useState([]);
  const [hideSideBar, setHideSideBar] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  let options = {
    dateStyle: "long",
    timeStyle: "medium",
  };

  const { mobileDevice } = useSelector((state) => state.Media);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = Order_Details_Page_Title;
  }, []);

  useEffect(() => {
    let mounted = true;
    if (keywords.length > 0) {
      (async function () {
        try {
          const response = await axios.get(`/api/orders/search/${keywords}`);
          if (mounted) {
            setOrder(response.data.order);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      })();
    } else {
      (async function () {
        try {
          setLoading(true);
          const response = await axios.get(`/api/orders/get/all`);
          setLoading(false);

          if (mounted) {
            setOrder(response.data.order);
          }
        } catch (error) {
          setLoading(false);
          toast.error(error.response.data.message);
        }
      })();
    }

    return () => {
      mounted = false;
    };
  }, [deleteSuccess, keywords]);

  const keywordsChange = (e) => {
    setKeywords(e.target.value);
  };

  const toggleSideBar = (e) => {
    setHideSideBar(!hideSideBar);
  };

  const editOrder = (id) => {
    navigate(`/order/${id}`);
  };

  if (mobileDevice && hideSideBar) {
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.height = "";
    document.body.style.overflow = "";
  }
  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="admin-category-container">
          {!mobileDevice ? (
            <div className={hideSideBar ? "side-bar hide" : "side-bar"}>
              <SideBar select="order" />
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
              <SideBar select="order" subSelect="order" />
            </div>
          )}
          <div className="table-container">
            <div className="container">
              <div className="heading-container">
                <Icon
                  icon="charm:menu-hamburger"
                  onClick={toggleSideBar}
                  className="toggle-sidebar"
                />

                <p className="heading">Order</p>
              </div>
              <div className="table">
                <div className="search-div">
                  <SearchBar
                    placeholder="Search order..."
                    onChange={keywordsChange}
                  />
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Sn</th>
                      <th>Order Id</th>
                      <th>User</th>
                      <th>Placed Date</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>Delivered</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order &&
                      order.map((elem, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{elem._id}</td>

                          <td>
                            {elem?.user?.firstName} {""}
                            {elem?.user?.lastName}
                          </td>
                          <td>{elem.createdAt.substring(0, 10)}</td>
                          <td>Rs. {elem?.totalPrice}</td>
                          <td>
                            {elem?.isPaid
                              ? new Date(
                                  elem?.paymentResult.paidAt
                                ).toLocaleString("en-US", options)
                              : "Not Paid"}
                          </td>
                          <td>
                            {elem?.isDelivered
                              ? new Date(elem?.deliveredAt).toLocaleString(
                                  "en-US",
                                  options
                                )
                              : "Not Delivered"}
                          </td>

                          <td
                            className="button-container"
                            style={{ justifyContent: "center" }}
                          >
                            <Tooltip label="Edit Order" withArrow>
                              <Icon
                                icon="bx:edit"
                                className="edit-btn"
                                onClick={(e) => editOrder(elem._id)}
                              />
                            </Tooltip>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListSellerOrder;
