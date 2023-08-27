import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Order_Details_Page_Title } from "../../utils/PageTitle";
import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Center, Tooltip } from "@mantine/core";
import LoadingDots from "../../components/Loading";
import SideBar from "../../components/Admin/SideBar";
import "../../styles/listCategory.scss";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { GET_ALL_ORDERS, SEARCH_ORDERS } from "../../utils/BaseUrl";
import { Pagination } from "@mantine/core";

const ListOrder = () => {
  const [order, setOrder] = useState([]);
  const [openSideBar, setOpenSideBar] = useState(true);
  const [openMobileSideBar, setOpenMobileSideBar] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [totalOrders, setTotalOrders] = useState();

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
          const response = await axios.get(`${SEARCH_ORDERS}/${keywords}`);
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
          const response = await axios.get(
            `${GET_ALL_ORDERS}/?pageNumber=${activePage}`
          );
          setLoading(false);

          if (mounted) {
            setOrder(response.data.order);
            setTotalPage(response.data.totalPages);
            setTotalOrders(response.data.totalOrders);
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
  }, [deleteSuccess, keywords, activePage]);

  const keywordsChange = (e) => {
    setKeywords(e.target.value);
  };

  const toggleSideBar = (e) => {
    setOpenSideBar((current) => {
      return !current;
    });
  };

  const toggleMobileSideBar = (e) => {
    setOpenMobileSideBar((current) => {
      return !current;
    });
  };

  const viewOrder = (id) => {
    navigate(`/order/${id}`);
  };

  if (mobileDevice && openMobileSideBar) {
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
            <div className={openSideBar ? "side-bar" : "side-bar hide"}>
              <SideBar select="order" />
            </div>
          ) : (
            <div
              className={
                openMobileSideBar ? "admin-side-bar" : "admin-side-bar-none"
              }
              style={{ width: openMobileSideBar ? "26rem" : "0" }}
            >
              <div className="close">
                <Icon
                  icon="ci:close-big"
                  className="cancel-btn"
                  onClick={toggleMobileSideBar}
                />
              </div>
              <SideBar select="order" subSelect="order" />
            </div>
          )}
          <div className="table-container">
            <div className="container">
              <div className="heading-container">
                {!mobileDevice ? (
                  <Icon
                    icon="charm:menu-hamburger"
                    onClick={toggleSideBar}
                    className="toggle-sidebar"
                  />
                ) : (
                  <Icon
                    icon="charm:menu-hamburger"
                    onClick={toggleMobileSideBar}
                    className="toggle-sidebar"
                  />
                )}

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
                            <Tooltip label="View Order" withArrow>
                              <Icon
                                icon="carbon:view-filled"
                                className="edit-btn"
                                onClick={(e) => viewOrder(elem._id)}
                              />
                            </Tooltip>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {totalOrders > order?.length && (
                <div className="pagination" style={{ paddingBottom: "2.5rem" }}>
                  <Pagination
                    page={activePage}
                    onChange={setActivePage}
                    total={totalPage}
                    color="dark"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListOrder;
