import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";

import "../styles/orderDetails.scss";
import {
  BASE_URL,
  CANCEL_ORDER,
  PUBLIC_URL,
  GET_ORDER,
  UPDATE_ORDER,
} from "../utils/BaseUrl";
import { Order_Details_Page_Title } from "../utils/PageTitle";

import LoadingDots from "../components/Loading";

import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(false);
  const [orderCancel, setOrderCancel] = useState(false);
  const [orderUpdate, setOrderUpdate] = useState(false);

  let options = {
    dateStyle: "long",
    timeStyle: "medium",
  };

  // const { userInfo } = useSelector((state) => state.authUser);
  const { isSeller } = useSelector((state) => state.authUser);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let mounted = true;
    document.title = Order_Details_Page_Title;

    (async function () {
      try {
        setLoading(true);
        const res = await axios.get(`${GET_ORDER}/${id}`);
        setLoading(false);
        if (mounted) {
          setOrder(res.data.order);
        }
      } catch (error) {
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [orderCancel, orderUpdate]);

  const cancelOrder = async (id) => {
    Swal.fire({
      title: "Are you sure you want to cancel the order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "Go Back",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const res = await axios.put(`${CANCEL_ORDER}/${id}`);
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

  const updateOrder = async (id) => {
    try {
      setLoading(true);
      const res = await axios.put(`${UPDATE_ORDER}/${id}`);
      setLoading(false);
      toast.success(res.data.message);
      if (res.data) {
        setOrderCancel(!orderCancel);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="individual-order-details-container">
          {order && (
            <div className="order-details-wrapper">
              <div className="order-items-container">
                <div className="heading">
                  <p className="title">Order Id: {order._id}</p>
                  <div className="order-sub-details">
                    <p className="date">
                      Placed on:{" "}
                      {new Date(order.createdAt).toLocaleString(
                        "en-US",
                        options
                      )}
                    </p>
                    {order?.isCancelled && (
                      <p className="cancelled">Cancelled</p>
                    )}
                  </div>
                  <hr className="line" />
                </div>

                <div className="order-items">
                  {order.orderItems.map((item) => (
                    <Link key={item._id} to={`/product/${item.productId}`}>
                      <div>
                        <div className="items">
                          <div className="product-image">
                            <img src={`${BASE_URL}/${item.image}`} alt="" />
                          </div>
                          <div className="product-details">
                            <p className="name">{item.name}</p>
                            <div className="product-sub-details">
                              <p className="brand">Brand: {item.brand}</p>
                              <p className="item-quantity">x {item.quantity}</p>
                            </div>

                            <p className="price">Rs. {item.price}</p>
                          </div>
                        </div>

                        <hr className="cart-line" />
                      </div>
                    </Link>
                  ))}

                  <div className="payment-method">
                    <p className="title">PAYMENT</p>
                    <p className="method">Method: {order?.paymentMethod}</p>
                    <div className="payment-status">
                      <p>Status: </p>
                      <p className={order?.isPaid ? "status" : "status error"}>
                        {order?.isPaid
                          ? `Paid at ${new Date(
                              order?.paymentResult?.paidAt
                            ).toLocaleString("en-US", options)}`
                          : "Not Paid"}
                      </p>
                    </div>
                  </div>
                  {isSeller && !order?.isCancelled && (
                    <div>
                      <Button
                        className="mark-deliver-btn"
                        text="MARK AS DELIVERED"
                        disabled={order?.isDelivered}
                        onClick={(e) => updateOrder(order._id)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="order-details-container">
                <div className="order-summary">
                  <p className="order-title">ORDER SUMMARY</p>
                  <div className="sub-total">
                    <p className="total-items">
                      Subtotal (
                      {order.orderItems.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      )}{" "}
                      items)
                    </p>
                    <p className="total-price">
                      Rs. {order.totalPrice - order.shippingPrice}
                    </p>
                  </div>
                  <div className="shipping">
                    <p className="title">Shipping</p>
                    <p className="shipping-charge">
                      {order.shippingPrice > 0
                        ? `Rs. ${order.shippingPrice}`
                        : `Free`}
                    </p>
                  </div>
                  <hr className="line" />

                  <div className="final-price">
                    <p className="title">Total</p>
                    <p className="total-price">Rs. {order.totalPrice}</p>
                  </div>
                </div>
                <div className="user-details-container">
                  <div className="user-container">
                    <div className="heading">
                      <p>USER</p>
                    </div>
                    <hr className="line" />

                    <p className="fullname">
                      Name: {order?.user?.firstName} {""}{" "}
                      {order?.user?.lastName}
                    </p>
                    <p className="email">Email: {order?.user?.email}</p>
                  </div>
                </div>
                <div className="shipping-address-container">
                  <div className="ship-container">
                    <div className="heading">
                      <p>SHIPPING</p>
                    </div>
                    <hr className="line" />

                    <p className="address">
                      Address: {order?.shippingAddress?.address},{" "}
                      {order?.shippingAddress?.city}{" "}
                      {order?.shippingAddress?.postalCode},{" "}
                      {order?.shippingAddress?.country}
                    </p>

                    <div className="shipping-status">
                      <p>Status: </p>
                      <p
                        className={
                          order.isDelivered ? "status" : "status error"
                        }
                      >
                        {order.isDelivered
                          ? `Delivered at ${new Date(
                              order.deliveredAt
                            ).toLocaleString("en-US", options)}`
                          : "Not Delivered"}
                      </p>
                    </div>

                    {/* {order?.user?.email === userInfo.email && ( */}
                    <div>
                      <Button
                        className="cancel-order-btn"
                        text="CANCEL ORDER"
                        disabled={order.isCancelled}
                        onClick={(e) => cancelOrder(order._id)}
                      />
                    </div>
                    {/* )} */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
