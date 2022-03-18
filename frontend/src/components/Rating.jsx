import { Icon } from "@iconify/react";

const Rating = ({ rating, numReviews }) => {
  return (
    <div
      className="rating"
      style={{
        fontSize: "1.15rem",
        display: "flex",
        gap: "0.5rem",
      }}
    >
      <div>
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
      <div>
        <span
          style={{
            fontSize: "1.15rem",
          }}
        >
          {numReviews > 1 ? `(${numReviews}) ` : `(${numReviews})`}
        </span>
      </div>
    </div>
  );
};

export default Rating;
