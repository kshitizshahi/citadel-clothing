import "../styles/product.scss";
import ProductImageSlider from "../components/ProductImageSlider";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { Product_Page } from "../utils/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../redux/thunkApi/productApi";
import LoadingDots from "../components/Loading";
import parse from "html-react-parser";
import { Icon } from "@iconify/react";
import { Tooltip } from "@mantine/core";
import PlusMinusCart from "../components/PlusMinusCart";
import { addToCart } from "../redux/thunkApi/productApi";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [desc, setDesc] = useState([]);
  const [quantity, setQuantity] = useState(1);

  let { id } = useParams();

  const { loading } = useSelector((state) => state.Product);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = Product_Page;
  }, []);

  useEffect(() => {
    let mounted = true;
    (async function () {
      if (mounted) {
        const response = await dispatch(getSingleProduct({ id }));
        setProduct(response.payload.product);
        setDesc(response.payload.product.description);
      }
    })();

    return () => {
      mounted = false;
      setProduct({});
    };
  }, [dispatch]);

  const navigateToCart = async () => {
    await dispatch(addToCart({ id, quantity }));
    navigate(`/cart`);
  };

  const handleChange = (qty) => {
    setQuantity(qty);
  };

  return (
    <div className="product-container">
      {loading ? (
        <LoadingDots />
      ) : (
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
                  <Link to={`/brand/${product.brand}`}>{product.brand}</Link>
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
                  {desc && desc.length > 280
                    ? parse(`${desc.slice(0, 280)}...`)
                    : parse(`${desc}`)}
                </div>
                <div className="product-quantity">
                  <label htmlFor="productQuantity">Quantity</label>
                  {product.countInStock >= 1 ? (
                    <PlusMinusCart
                      countInStock={product.countInStock}
                      changeQuantity={handleChange}
                      qty={1}
                    />
                  ) : (
                    <p className="out-of-stock">Product is out of stock</p>
                  )}

                  <div>
                    {product.countInStock >= 1 && (
                      <Tooltip label="Add to Cart" color="gray" withArrow>
                        <Icon
                          icon="fa-solid:cart-plus"
                          className="add-cart"
                          onClick={navigateToCart}
                        />
                      </Tooltip>
                    )}
                  </div>
                </div>
                <hr className="line" />
                <div className="seller">
                  <label>Sold by:</label>
                  <Link to={`/seller/${product?.seller?.fullName}`}>
                    <p>{product?.seller?.fullName}</p>
                  </Link>
                </div>
                <div className="stock">
                  <label>Stock:</label>
                  <p>{product.countInStock}</p>
                </div>
              </div>
            </div>
          </div>
          {desc && desc.length > 284 && (
            <div className="long-description">
              {/* <hr className="line" /> */}

              <p className="heading">Product Description</p>
              <div className="description-content">{parse(`${desc}`)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Product;
