import { useEffect, useState } from "react";
import { BASE_URL, PUBLIC_URL } from "../utils/BaseUrl";
import "../styles/productImageSlider.scss";
import ButtonSlider from "./ButtonSlider";

const ProductImageSlider = ({ data }) => {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  // const data = [
  //   `${PUBLIC_URL}/images/home-image.png`,
  //   `${PUBLIC_URL}/images/login.jpg`,
  //   `${PUBLIC_URL}/images/login1.jpg`,
  // ];

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));

    return () => {
      setMatches({});
      window.removeEventListener("change", null);
    };
  }, []);

  const Preview = ({ data, setIndex, currentIndex }) => {
    return (
      <div className="preview">
        {data.map((elem, index) => (
          <img
            key={index}
            src={`${BASE_URL}/${elem}`}
            alt="product image"
            onClick={() => setIndex(index)}
            className={currentIndex === index ? "image active" : "image"}
            style={{
              height: matches
                ? `calc((60vh - (${data.length - 1}* 1.5rem))/${data.length})`
                : `calc((30vh - (${data.length - 1}* 1.5rem))/${data.length})`,
            }}
          />
        ))}
      </div>
    );
  };

  const [slideIndex, setSlideIndex] = useState(0);

  const next = () => {
    if (slideIndex === data.length - 1) {
      setSlideIndex(0);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };

  const prev = () => {
    if (slideIndex === 0) {
      setSlideIndex(data.length - 1);
    } else {
      setSlideIndex(slideIndex - 1);
    }
  };
  return (
    <div className="product-image-slider">
      {data && (
        <>
          <div className="preview-image-container">
            <Preview
              data={data}
              setIndex={setSlideIndex}
              currentIndex={slideIndex}
            />
          </div>
          <div className="main-image-container">
            <img src={`${BASE_URL}/${data[slideIndex]}`} />
            <div className="btn-container">
              <ButtonSlider onClick={next} direction={"next"} />
              <ButtonSlider onClick={prev} direction={"prev"} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductImageSlider;
