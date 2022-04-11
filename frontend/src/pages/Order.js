import { Icon } from "@iconify/react";
import { Tooltip } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoadingDots from "../components/Loading";
import "../styles/order.scss";
import { BASE_URL } from "../utils/BaseUrl";
import { Order_Page_Title } from "../utils/PageTitle";
const Order = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(false);
  const [orderCancel, setOrderCancel] = useState(false);
  let options = {
    dateStyle: "long",
    timeStyle: "medium",
  };

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    document.title = Order_Page_Title;
    (async function () {
      try {
        setLoading(true);
        const res = await axios.get(`/api/orders/get/user/orders`);
        setLoading(false);
        if (mounted) {
          setOrders(res.data.order);
        }
      } catch (error) {
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      setOrders({});
    };
  }, [orderCancel]);

  const editOrder = (id) => {
    navigate(`/order/${id}`);
  };

  const cancelOrder = async (id) => {
    Swal.fire({
      title: "Are you sure you want to cancel the order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Cancel",
      cancelButtonText: "Go Back",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const res = await axios.put(`/api/orders/cancel/order/${id}`);
          setLoading(false);
          toast.success(res.data.message);
          if (res.data) {
            setOrderCancel(!orderCancel);
          }
        } catch (error) {
          setLoading(false);
          toast.error(error.response.data.message);
        }
      }
    });
  };

  return (
    <div className="order-container">
      {loading ? (
        <LoadingDots />
      ) : (
        <div>
          <div className="heading">
            <p>My Orders ({orders.length})</p>
            <hr className="line" />
          </div>
          <div>
            {orders && orders.length === 0 ? (
              <p className="empty-cart">
                No Orders.{" "}
                <Link className="navigate-shop" to="/shop">
                  Shop Now
                </Link>
              </p>
            ) : (
              <div className="order-items-wrapper">
                {Object.values(orders).map((item) => (
                  <div key={item._id} className="individual-order">
                    <div>
                      <div className="order-details-container">
                        <div className="order-info">
                          <p className="title">Order Id: {item._id}</p>
                          <div className="delivery">
                            <p>Shipping: </p>
                            <p
                              className={
                                item.isDelivered ? "status" : "status error"
                              }
                            >
                              {item.isDelivered ? "Delivered" : "Not Delivered"}
                            </p>
                          </div>
                          <div className="payment">
                            <p>Payment: </p>
                            <p
                              className={
                                item.isPaid ? "status" : "status error"
                              }
                            >
                              {item.isPaid ? "Paid" : "Not Paid"}
                            </p>
                          </div>
                          <div className="button-container">
                            <Tooltip label="View Order" withArrow>
                              <Icon
                                icon="carbon:view-filled"
                                className="edit-btn"
                                onClick={(e) => editOrder(item._id)}
                              />
                            </Tooltip>

                            {!item.isCancelled && (
                              <Tooltip label="Cancel Order" withArrow>
                                <Icon
                                  icon="fluent:document-bullet-list-off-24-regular"
                                  className="cancel-btn"
                                  onClick={(e) => cancelOrder(item._id)}
                                />
                              </Tooltip>
                            )}
                          </div>
                        </div>
                        <div className="order-sub-details">
                          <p className="date">
                            Placed on:{" "}
                            {new Date(item.createdAt).toLocaleString(
                              "en-US",
                              options
                            )}
                          </p>
                          {item.isCancelled && (
                            <p className="cancelled">Cancelled</p>
                          )}
                        </div>
                      </div>
                      <div className="order-items">
                        {item.orderItems.map((elem) => (
                          <Link
                            key={elem._id}
                            to={`/product/${elem.productId}`}
                          >
                            <div className="individual-item">
                              <div className="product-image">
                                <img src={`${BASE_URL}/${elem.image}`} alt="" />
                              </div>
                              <div className="product-details">
                                <p className="name">{elem.name}</p>
                                <div className="other-details">
                                  <p>Payment: {item.paymentMethod}</p>
                                  <p>Quantity: {elem.quantity}</p>
                                </div>
                                <div>
                                  <p className="price">Rs.{elem.price}</p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <hr className="cart-line" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
