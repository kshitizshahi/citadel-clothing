import "../styles/product.scss";
import ProductImageSlider from "../components/ProductImageSlider";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { Product_Page } from "../utils/PageTitle";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../redux/thunkApi/productApi";
import LoadingDots from "../components/Loading";
import parse from "html-react-parser";
import { Icon } from "@iconify/react";
import { Tooltip } from "@mantine/core";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [desc, setDesc] = useState([]);
  const [quantity, setQuantity] = useState(1);

  let { id } = useParams();

  const { loading, fetchSuccess, error, singleProduct } = useSelector(
    (state) => state.Product
  );

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = Product_Page;
  }, []);

  useEffect(() => {
    (async function () {
      // const response = await axios.get(`/api/products/get/${id}`);
      // setProduct(response.data.product);

      const response = await dispatch(getSingleProduct({ id }));
      setProduct(response.payload.product);
      setDesc(response.payload.product.description);
    })();

    return () => {
      setProduct({});
    };
  }, []);

  const handleChange = (qty) => {
    if (qty > product.countInStock) {
      setQuantity(qty - 1);
    } else if (qty === product.countInStock) {
      setQuantity(qty);
    } else if (qty < 1) {
      setQuantity(1);
    } else if (qty < product.countInStock) {
      setQuantity(qty);
    }
  };

  const updateQuantity = (e) => {
    const qty = parseInt(e.target.value);

    if (!isNaN(qty)) {
      if (qty > product.countInStock) {
        setQuantity(product.countInStock);
      } else {
        setQuantity(qty);
      }
    }
  };

  return (
    <div className="product-container">
      <div className="container">
        <div className="wrapper">
          <div className="product-image-container">
            {/* {singleProduct && <ProductImageSlider data={product?.images} />} */}
            <ProductImageSlider data={product?.images} />
          </div>

          <div className="product-details-container">
            <div className="details-container">
              <p className="heading">{product.name}</p>
              <p className="brand">
                Brand:
                <Link to={"/brand"}>{product.brand}</Link>
              </p>
              <div className="ratings">
                <Rating
                  rating={product.averageRating}
                  numReviews={product.totalRatings}
                />
              </div>
              <div className="price">
                <p className="product-price">Rs. {product.price}</p>
                <p className="mark-price">
                  {!(product.markPrice === product.price)
                    ? `Rs. ${product.markPrice}`
                    : ""}
                </p>
                <p className={product.discount > 0 ? "discount" : ""}>
                  {product.discount > 0 && `${product.discount}% OFF`}
                </p>
              </div>
              <div className="description">
                {/* {parse(`${product.description}`)} */}
                {parse(`${desc.slice(0, 300)}`)}
              </div>
              <div className="product-quantity">
                <label htmlFor="productQuantity">Quantity</label>
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
                <div>
                  <Tooltip label="Add to Cart" color="gray" withArrow>
                    <Icon icon="fa-solid:cart-plus" className="add-cart" />
                  </Tooltip>
                </div>
              </div>
              <hr className="line" />
              <label>Sold by</label>
              <p>{product?.seller?.fullName}</p>
              <label>Stock</label>

              <p>{product.countInStock}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
