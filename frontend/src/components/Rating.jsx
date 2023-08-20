import { Icon } from "@iconify/react";
import { useState } from "react";

const Rating = ({
  rating,
  numReviews,
  productRating,
  userRating,
  commentRating,
}) => {
  const [ratingStars, setRatingStars] = useState(0);
  const [hovered, setHovered] = useState(false);

  const changeRatingStars = (value) => {
    setRatingStars(value);
    userRating(value);
  };

  return (
    <div
      className="rating"
      style={
        !productRating
          ? {
              display: "flex",
              gap: "0.5rem",
              fontSize: "1.15rem",
              color: "var(--color-text)",
            }
          : {
              display: "flex",
              gap: "0.5rem",
              fontSize: "1.7rem",
              color: "var(--color-text)",
              cursor: "pointer",
            }
      }
    >
      {productRating ? (
        <div>
          <span>
            <Icon
              icon={
                ratingStars >= 1
                  ? "fa:star"
                  : "fa:star-o" && hovered.rating1
                  ? "fa:star"
                  : "fa:star-o"
              }
              className="stars"
              onClick={() => changeRatingStars(1)}
              onMouseEnter={(e) => setHovered({ rating1: true })}
              onMouseLeave={(e) => setHovered(false)}
            ></Icon>
          </span>
          <span>
            <Icon
              icon={
                ratingStars >= 2
                  ? "fa:star"
                  : "fa:star-o" && hovered.rating2
                  ? "fa:star"
                  : "fa:star-o"
              }
              className="stars"
              onClick={() => changeRatingStars(2)}
              onMouseEnter={(e) => setHovered({ rating1: true, rating2: true })}
              onMouseLeave={(e) => setHovered(false)}
            ></Icon>
          </span>
          <span>
            <Icon
              icon={
                ratingStars >= 3
                  ? "fa:star"
                  : "fa:star-o" && hovered.rating3
                  ? "fa:star"
                  : "fa:star-o"
              }
              className="stars"
              onClick={() => changeRatingStars(3)}
              onMouseEnter={(e) =>
                setHovered({ rating1: true, rating2: true, rating3: true })
              }
              onMouseLeave={(e) => setHovered(false)}
            ></Icon>
          </span>
          <span>
            <Icon
              icon={
                ratingStars >= 4
                  ? "fa:star"
                  : "fa:star-o" && hovered.rating4
                  ? "fa:star"
                  : "fa:star-o"
              }
              className="stars"
              onClick={() => changeRatingStars(4)}
              onMouseEnter={(e) =>
                setHovered({
                  rating1: true,
                  rating2: true,
                  rating3: true,
                  rating4: true,
                })
              }
              onMouseLeave={(e) => setHovered(false)}
            ></Icon>
          </span>
          <span>
            <Icon
              icon={
                ratingStars >= 5
                  ? "fa:star"
                  : "fa:star-o" && hovered.rating5
                  ? "fa:star"
                  : "fa:star-o"
              }
              className="stars"
              onClick={() => changeRatingStars(5)}
              onMouseEnter={(e) =>
                setHovered({
                  rating1: true,
                  rating2: true,
                  rating3: true,
                  rating4: true,
                  rating5: true,
                })
              }
              onMouseLeave={(e) => setHovered(false)}
            ></Icon>
          </span>
        </div>
      ) : (
        <>
          <div
            style={{
              marginTop: "3px",
            }}
          >
            <span>
              <Icon
                icon={
                  rating >= 1
                    ? "fa:star"
                    : rating >= 0.5
                    ? "fa:star-half-empty"
                    : "fa:star-o"
                }
              ></Icon>
            </span>
            <span>
              <Icon
                icon={
                  rating >= 2
                    ? "fa:star"
                    : rating >= 1.5
                    ? "fa:star-half-empty"
                    : "fa:star-o"
                }
              ></Icon>
            </span>
            <span>
              <Icon
                icon={
                  rating >= 3
                    ? "fa:star"
                    : rating >= 2.5
                    ? "fa:star-half-empty"
                    : "fa:star-o"
                }
              ></Icon>
            </span>
            <span>
              <Icon
                icon={
                  rating >= 4
                    ? "fa:star"
                    : rating >= 3.5
                    ? "fa:star-half-empty"
                    : "fa:star-o"
                }
              ></Icon>
            </span>
            <span>
              <Icon
                icon={
                  rating >= 5
                    ? "fa:star"
                    : rating >= 4.5
                    ? "fa:star-half-empty"
                    : "fa:star-o"
                }
              ></Icon>
            </span>
          </div>

          {!commentRating && (
            <div>
              <span
                style={{
                  fontSize: "1.3rem",
                  fontFamily: "Open Sans",
                  marginBlock: "auto",
                }}
              >
                {numReviews > 1 ? `(${numReviews}) ` : `(${numReviews})`}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Rating;
