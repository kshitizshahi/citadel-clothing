import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PlusMinusCart from "../components/PlusMinusCart";
import { clearCart, removeFromCart } from "../redux/slice/productSlice";
import { addToCart } from "../redux/thunkApi/productApi";
import "../styles/carts.scss";
import { BASE_URL } from "../utils/BaseUrl";
import { Cart_Page_Title } from "../utils/PageTitle";
const Cart = () => {
  const { cart } = useSelector((state) => state.Product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    document.title = Cart_Page_Title;

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

  const clearCartHandler = async () => {
    await dispatch(clearCart());
  };

  const updateQuantity = (quantity, id) => {
    if (id) {
      dispatch(addToCart({ id, quantity }));
    }
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="cart-container">
      <div className="heading">
        <p>My Cart ({cart.length})</p>
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
                <div className="product-name">
                  <p className="name">{item.name}</p>
                  <p className="brand">Brand: {item.brand}</p>
                  <p className="brand">Stock: {item.countInStock}</p>
                </div>
                <div className="product-price">
                  <div>
                    <p className="price">Rs. {item.price}</p>
                  </div>
                  <div className="discount-container">
                    <p className="mark-price"> Rs. {item.markPrice}</p>
                    <p className="discount"> -{item.discount}%</p>
                  </div>
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
                    icon="system-uicons:cross"
                    className="remove"
                    onClick={() => removeCartItem(item.productId)}
                  />
                </div>
              </div>
              <hr className="cart-line" />
            </div>
          ))}

          <div className="sub-total">
            <p className="total-items">
              Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)}{" "}
              items)
            </p>
            <p className="total-price">
              Rs{" "}
              {cart.reduce((acc, item) => acc + item.quantity * item.price, 0)}
            </p>
          </div>
          <hr className="subtotal-line" />
          <div className="checkout-buttons">
            <Button
              text="Clear All"
              className="clear-btn"
              onClick={clearCartHandler}
            />
            <Button
              text="Proceed to Checkout"
              className="proceed-btn"
              onClick={checkoutHandler}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
