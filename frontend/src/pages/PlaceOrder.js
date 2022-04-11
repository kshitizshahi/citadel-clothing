import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import {
  clearCart,
  removeFromCart,
  savePaymentMethod,
} from "../redux/slice/productSlice";
import { addToCart } from "../redux/thunkApi/productApi";
import "../styles/placeOrder.scss";
import { BASE_URL, PUBLIC_URL } from "../utils/BaseUrl";
import { Place_Order_Page_Title } from "../utils/PageTitle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadingDots from "../components/Loading";
import { saveShippingAddress } from "../redux/slice/productSlice";
import { toast } from "react-toastify";
import axios from "axios";
import PlusMinusCart from "../components/PlusMinusCart";
import Khalti from "../components/Khalti";

const PlaceOrder = () => {
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [paymentResult, setPaymentResult] = useState(false);

  let subTotalPrice, totalItems, shippingPrice, totalPrice;

  const placeOrderSchema = yup
    .object({
      address: yup.string().required("This field is required."),
      city: yup.string().required("This field is required."),
      country: yup.string().required("This field is required."),
      postalCode: yup
        .string()
        .required("This field is required.")
        .matches(/^[1-9]+[0-9]*$/, "Invalid postal code.")
        .test(
          "length",
          "Postal Code must be 5 digits.",
          (value) => value.length === 5
        ),
      paymentMethod: yup.mixed().required("This field is required."),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(placeOrderSchema),
  });

  const { cart, shippingAddress, paymentMethod } = useSelector(
    (state) => state.Product
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    document.title = Place_Order_Page_Title;

    if (shippingAddress) {
      setValue("address", shippingAddress.address);
      setValue("city", shippingAddress.city);
      setValue("postalCode", shippingAddress.postalCode);
      setValue("country", shippingAddress.country);
    }

    if (paymentMethod) {
      setValue("paymentMethod", paymentMethod);
    }

    if (cart.length > 0) {
      (async function () {
        if (mounted) {
          cart.forEach((elem) => {
            dispatch(
              addToCart({ id: elem.productId, quantity: elem.quantity })
            );
          });
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const removeCartItem = async (id) => {
    await dispatch(removeFromCart(id));
  };

  const savePaymentDetails = async (value) => {
    await dispatch(savePaymentMethod(value));
  };

  const submitHandler = async (data) => {
    dispatch(
      saveShippingAddress({
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
      })
    );

    const orderData = {
      orderItems: cart,
      paymentMethod: data.paymentMethod,
      shippingAddress: {
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
      },
      shippingPrice: shippingPrice,
      totalPrice: totalPrice,
      isPaid: isPaid,
      paymentResult: paymentResult,
    };

    if (cart.length === 0) {
      toast.error("Cart is empty");
    } else if (data.paymentMethod === "Khalti") {
      if (isPaid) {
        try {
          setLoading(true);
          const res = await axios.post(`/api/orders/place-order`, orderData);
          setLoading(false);
          toast.success(res.data.message);
          navigate(`/order/${res.data.createdOrder._id}`);
          dispatch(clearCart());
        } catch (error) {
          setLoading(false);
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("Please pay first");
      }
    } else {
      try {
        setLoading(true);
        const res = await axios.post(`/api/orders/place-order`, orderData);
        setLoading(false);
        toast.success(res.data.message);

        navigate(`/order/${res.data.createdOrder._id}`);

        dispatch(clearCart());
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    }
  };

  if (cart) {
    subTotalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    shippingPrice = subTotalPrice > 2500 ? 0 : 150;
    totalPrice = subTotalPrice + shippingPrice;
  }

  const updateQuantity = (quantity, id) => {
    if (id) {
      dispatch(addToCart({ id, quantity }));
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="order-cart-container">
          <div>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="container">
                <div className="cart-container">
                  <div className="heading">
                    <p>ORDER ITEMS ({cart.length})</p>
                    <hr className="line" />
                  </div>
                  {cart.length === 0 ? (
                    <p className="empty-cart">
                      Cart is Empty.{" "}
                      <Link className="navigate-shop" to="/shop">
                        Shop Now
                      </Link>
                    </p>
                  ) : (
                    <div className="cart-items">
                      {cart.map((item) => (
                        <div key={item.productId}>
                          <div className="items">
                            <div className="product-image">
                              <img src={`${BASE_URL}/${item.image}`} alt="" />
                            </div>
                            <div className="product-details">
                              <p className="name">{item.name}</p>
                              <div className="product-sub-details">
                                <p className="brand">Brand: {item.brand}</p>
                                <p className="brand">
                                  Stock: {item.countInStock}
                                </p>
                              </div>

                              <p className="price">Rs. {item.price}</p>
                            </div>

                            <div className="quantity-container">
                              <PlusMinusCart
                                countInStock={item.countInStock}
                                changeQuantity={updateQuantity}
                                prodId={item.productId}
                                qty={item.quantity}
                              />
                            </div>

                            <div className="remove-cart">
                              <Icon
                                icon="ant-design:delete-filled"
                                className="remove"
                                onClick={() => removeCartItem(item.productId)}
                              />
                            </div>
                          </div>
                          <hr className="cart-line" />
                        </div>
                      ))}

                      <div className="payment-method">
                        <p className="title">PAYMENT METHOD</p>

                        <div className="methods">
                          <div>
                            <input
                              type="radio"
                              id="cod"
                              name="paymentMethod"
                              value="Cash On Delivery"
                              {...register("paymentMethod")}
                              onClick={(e) =>
                                savePaymentDetails("Cash On Delivery")
                              }
                            />
                            <label htmlFor="cod">
                              <div>
                                <img src={`${PUBLIC_URL}/images/cod.png`}></img>
                              </div>
                            </label>
                          </div>
                          <div>
                            <input
                              type="radio"
                              id="khalti"
                              name="paymentMethod"
                              value="Khalti"
                              {...register("paymentMethod")}
                              onClick={(e) => savePaymentDetails("Khalti")}
                            />

                            <label htmlFor="khalti">
                              <div>
                                <img
                                  src={`${PUBLIC_URL}/images/khalti.png`}
                                ></img>
                              </div>
                            </label>
                          </div>
                        </div>
                        <p className="error">
                          {errors?.paymentMethod?.message || "\u00A0"}
                        </p>
                      </div>
                      {getValues("paymentMethod") === "Khalti" && (
                        <div className="pay-khalti">
                          <Khalti
                            prodId={cart[0].productId}
                            prodName={cart[0].name}
                            totalAmount={totalPrice}
                            successPayment={setIsPaid}
                            paymentResult={setPaymentResult}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="order-details-container">
                  <div className="order-summary">
                    <p className="order-title">ORDER SUMMARY</p>
                    <div className="sub-total">
                      <p className="total-items">
                        Subtotal ({totalItems} {""}
                        items)
                      </p>
                      <p className="total-price">Rs. {subTotalPrice}</p>
                    </div>
                    <div className="shipping">
                      <p className="title">Shipping</p>
                      <p className="shipping-charge">
                        {shippingPrice > 0 ? `Rs. ${shippingPrice}` : `Free`}
                      </p>
                    </div>
                    <hr className="line" />

                    <div className="final-price">
                      <p className="title">Total</p>
                      <p className="total-price">Rs. {totalPrice}</p>
                    </div>
                  </div>
                  <div className="shipping-address-container">
                    <div className="ship-container">
                      <div className="heading">
                        <p>SHIPPING ADDRESS</p>
                      </div>

                      <div>
                        <label htmlFor="address">Addresss</label>
                        <input
                          type="text"
                          id="address"
                          placeholder="Your Street Name or Address"
                          {...register("address")}
                        ></input>
                        <p className="error">
                          {errors.address?.message || "\u00A0"}
                        </p>
                      </div>
                      <div>
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          placeholder="Your City"
                          {...register("city")}
                        ></input>
                        <p className="error">
                          {errors.city?.message || "\u00A0"}
                        </p>
                      </div>
                      <div>
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                          type="text"
                          id="postalCode"
                          placeholder="Your Postal Code"
                          {...register("postalCode")}
                        ></input>
                        <p className="error">
                          {errors.postalCode?.message || "\u00A0"}
                        </p>
                      </div>
                      <div>
                        <label htmlFor="country">Country</label>
                        <input
                          type="text"
                          id="country"
                          placeholder="Your Country"
                          {...register("country")}
                        ></input>
                        <p className="error">
                          {errors.country?.message || "\u00A0"}
                        </p>
                      </div>

                      <div>
                        <Button
                          className="place-order-btn"
                          text="PLACE ORDER"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
