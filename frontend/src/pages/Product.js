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
import { toast } from "react-toastify";
import axios from "axios";
import Cards from "../components/Cards";
import Button from "../components/Button";
import {
  ADD_REVIEW,
  BASE_URL,
  PRODUCT_REVIEW,
  RELATED_PRODUCTS,
} from "../utils/BaseUrl";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [desc, setDesc] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loadingRelatedProduct, setLoadingRelatedProduct] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [rating, setRating] = useState([]);
  const [comment, setComment] = useState("");
  const [loadingReview, setLoadingReview] = useState(false);
  const [productReview, setProductReview] = useState([]);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  let recommendedProducts = [];
  let options = {
    dateStyle: "long",
  };

  let { id } = useParams();

  const { loading } = useSelector((state) => state.Product);
  const { userInfo } = useSelector((state) => state.authUser);

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

    (async function () {
      try {
        setLoadingRelatedProduct(true);
        const res = await axios.get(`${RELATED_PRODUCTS}/${id}`);
        setLoadingRelatedProduct(false);
        if (mounted) {
          setRelatedProducts(res.data.relatedProduct);
        }
      } catch (error) {
        setLoadingRelatedProduct(false);
        toast.message(error.response.data.message);
      }
    })();

    (async function () {
      try {
        setLoadingReview(true);
        const res = await axios.get(`${PRODUCT_REVIEW}/${id}`);
        setLoadingReview(false);
        if (mounted) {
          setProductReview(res.data.review);
        }
      } catch (error) {
        setLoadingReview(false);
        toast.message(error.response.data.message);
      }
    })();

    return () => {
      mounted = false;
      setRelatedProducts({});

      setProduct({});
    };
  }, [dispatch, reviewSuccess]);

  const navigateToCart = async () => {
    await dispatch(addToCart({ id, quantity }));
    toast.success("Product added");
    navigate(`/cart`);
  };

  const handleChange = (qty) => {
    setQuantity(qty);
  };

  if (relatedProducts) {
    recommendedProducts = Object.values(relatedProducts).slice(0, 4);
  }

  const addReview = async () => {
    if (rating.length === 0) {
      toast.error("Rating is required");
    } else {
      try {
        setLoadingReview(true);
        const res = await axios.post(`${ADD_REVIEW}/${id}`, {
          rating,
          comment,
        });
        setLoadingReview(false);
        toast.success(res.data.message);
        if (res.data) {
          setReviewSuccess(!reviewSuccess);
        }
      } catch (error) {
        setLoadingReview(false);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="product-container">
      {loading || loadingRelatedProduct || loadingReview ? (
        <LoadingDots />
      ) : (
        <div className="container">
          <div className="wrapper">
            <div className="product-image-container">
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
                  {desc && desc.length > 250
                    ? parse(`${desc.slice(0, 250)}...`)
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
                  <Link
                    to={`/seller/${product?.seller?.firstName}%20${product?.seller?.lastName}`}
                  >
                    <p>
                      {product?.seller?.firstName} {""}
                      {product?.seller?.lastName}
                    </p>
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
          <div className="related-products">
            <p className="heading">Related Products</p>
            {relatedProducts && (
              <Cards data={recommendedProducts} relatedProducts />
            )}
          </div>
          <div className="rating-container">
            <hr className="line" />
            <p className="heading">Rating & Reviews ({productReview.length})</p>
            <p className="sub-heading">Write a Review</p>
            {userInfo ? (
              <>
                <div className="user-rating">
                  <label className="rating-lbl">Your Rating</label>
                  <Rating productRating userRating={setRating} />
                </div>

                <div>
                  <label htmlFor="comment" className="comment-lbl">
                    Comment
                  </label>
                  <textarea
                    type="text"
                    id="comment"
                    placeholder="Add your comment related to the product"
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <Button
                    className="add-review-btn"
                    text="Submit Review"
                    onClick={addReview}
                  />
                </div>
              </>
            ) : (
              <>
                <p className="sub-topic">
                  Please {""}
                  <Link to="/login" className="link">
                    Login
                  </Link>{" "}
                  {""}
                  to write a review
                </p>
              </>
            )}
            <hr className="line sub" />
            <div className="product-review-container">
              <div className="review">
                {productReview.map((elem, index) => (
                  <div key={index}>
                    <div className="user">
                      <div className="user-image">
                        <img
                          className="user-image"
                          src={`${BASE_URL}/${elem?.user?.profileImage}`}
                        />
                      </div>
                      <div className="user-details">
                        <div className="user-info">
                          <p className="user-name">{elem.name}</p>
                          <p className="date">
                            {new Date(elem.createdAt).toLocaleDateString(
                              "en-US",
                              options
                            )}
                          </p>
                        </div>
                        <div className="ratings">
                          <Rating rating={elem.rating} commentRating />
                        </div>
                        <div className="comment">
                          <p>{elem.comment}</p>
                        </div>
                      </div>
                    </div>

                    <hr className="comment-line" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
