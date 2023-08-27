import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingDots from "../components/Loading";
import "../styles/order.scss";
import {
  BASE_URL,
  CANCEL_ORDER,
  USER_ORDERS,
  USER_REVIEW,
} from "../utils/BaseUrl";
import { Review_Page_Title } from "../utils/PageTitle";

const Reviews = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  let options = {
    dateStyle: "long",
    timeStyle: "medium",
  };

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    document.title = Review_Page_Title;
    (async function () {
      try {
        setLoading(true);
        const res = await axios.get(USER_REVIEW);
        setLoading(false);
        if (mounted) {
          setReviews(res.data.review);
        }
      } catch (error) {
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      setReviews({});
    };
  }, []);

  return (
    <div className="order-container">
      {loading ? (
        <LoadingDots />
      ) : (
        <div>
          <div className="heading">
            <p>My Reviews ({reviews.length})</p>
            <hr className="line" />
          </div>
          <div>
            {reviews && reviews.length === 0 ? (
              <p className="empty-cart">
                No Reviews.{" "}
                <Link className="navigate-shop" to="/shop">
                  Shop Now
                </Link>
              </p>
            ) : (
              <div className="order-items-wrapper">
                {Object.values(reviews).map((item) => (
                  <div key={item._id} className="individual-order">
                    <div>
                      <div className="order-details-container">
                        <div className="order-info">
                          <p className="title">Review Id: {item._id}</p>
                        </div>
                        <div className="order-sub-details">
                          <p className="date">
                            Reviewed on:{" "}
                            {new Date(item.createdAt).toLocaleString(
                              "en-US",
                              options
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="order-items">
                        <Link
                          key={item.product._id}
                          to={`/product/${item.product._id}`}
                        >
                          <div className="individual-item">
                            <div className="product-image">
                              <img
                                src={`${BASE_URL}/${item.product.images[0]}`}
                                alt=""
                              />
                            </div>
                            <div className="product-details">
                              <p className="name">{item.product.name}</p>
                              <div className="other-details">
                                <p>Brand: {item.product.brand}</p>
                                <p>Stock: {item.product.countInStock}</p>
                              </div>
                              <div>
                                <p className="price">Rs.{item.product.price}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
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

export default Reviews;
