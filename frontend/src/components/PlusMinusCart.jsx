import { Icon } from "@iconify/react";
import { useState } from "react";
import "../styles/quantity.scss";

const PlusMinusCart = ({ countInStock, changeQuantity, qty, prodId }) => {
  const [quantity, setQuantity] = useState(qty);
  const handleChange = (qty) => {
    if (qty > countInStock) {
      setQuantity(qty - 1);
      changeQuantity(qty - 1);
    } else if (qty === countInStock) {
      setQuantity(qty);
      changeQuantity(qty, prodId);
    } else if (qty < 1) {
      setQuantity(1);
      changeQuantity(1);
    } else if (qty < countInStock) {
      setQuantity(qty);
      changeQuantity(qty, prodId);
    }
  };

  const updateQuantity = (e) => {
    const qty = parseInt(e.target.value);

    if (!isNaN(qty)) {
      if (qty > countInStock) {
        setQuantity(countInStock);
        changeQuantity(countInStock, prodId);
      } else {
        setQuantity(qty);
        changeQuantity(qty, prodId);
      }
    }
  };

  return (
    <div className="quantity">
      <span onClick={(e) => handleChange(quantity - 1)}>
        <Icon icon="bx:minus" className="subtract" />
      </span>

      <input
        type="text"
        id="productQuantity"
        required
        pattern="[0-9]"
        value={quantity}
        onChange={(e) => {
          updateQuantity(e);
        }}
      ></input>

      <span onClick={(e) => handleChange(quantity + 1)}>
        <Icon icon="ant-design:plus-outlined" className="add" />
      </span>
    </div>
  );
};

export default PlusMinusCart;
