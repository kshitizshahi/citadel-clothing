import { Link } from "react-router-dom";
import "../styles/cards.scss";
import { BASE_URL } from "../utils/BaseUrl";
import Rating from "./Rating";

const Cards = ({ data, relatedProducts }) => {
  return (
    <div className="cards">
      {data.map((prod, index) => (
        <div key={index} className="card-items">
          {relatedProducts ? (
            <a href={`/product/${prod._id}`}>
              <div className="img-div">
                {/* <img
                src={`${PUBLIC_URL}/images/mens fashion.jpg`}
                alt="Kid's Wear"
              ></img> */}
                <img
                  src={`${BASE_URL}/${prod.images[0]}`}
                  alt={prod.name}
                ></img>
                <p className={prod.discount > 0 ? "discount" : ""}>
                  {prod.discount > 0 && `${prod.discount}% OFF`}
                </p>
              </div>
              <div className="product-details">
                <div>
                  <p className="name">{prod.name}</p>
                </div>
                <div className="ratings">
                  <Rating
                    rating={prod.averageRating}
                    numReviews={prod.totalRatings}
                  />
                </div>
                <div className="price">
                  <p>Rs. {prod.price}</p>

                  <p className="mark-price">
                    {!(prod.markPrice === prod.price)
                      ? `Rs. ${prod.markPrice}`
                      : ""}
                  </p>
                </div>
              </div>
            </a>
          ) : (
            <Link to={`/product/${prod._id}`}>
              <div className="img-div">
                {/* <img
                src={`${PUBLIC_URL}/images/mens fashion.jpg`}
                alt="Kid's Wear"
              ></img> */}
                <img
                  src={`${BASE_URL}/${prod.images[0]}`}
                  alt={prod.name}
                ></img>
                <p className={prod.discount > 0 ? "discount" : ""}>
                  {prod.discount > 0 && `${prod.discount}% OFF`}
                </p>
              </div>
              <div className="product-details">
                <div>
                  <p className="name">{prod.name}</p>
                </div>
                <div className="ratings">
                  <Rating
                    rating={prod.averageRating}
                    numReviews={prod.totalRatings}
                  />
                </div>
                <div className="price">
                  <p>Rs. {prod.price}</p>

                  <p className="mark-price">
                    {!(prod.markPrice === prod.price)
                      ? `Rs. ${prod.markPrice}`
                      : ""}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Cards;
