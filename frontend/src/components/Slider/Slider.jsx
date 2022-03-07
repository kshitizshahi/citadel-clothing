import { useState } from "react";
import "../../styles/slider.scss";
import ButtonSlider from "../ButtonSlider";
import Button from "../Button";
import { Navigate, useNavigate } from "react-router-dom";

const Slider = ({ data }) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const navigate = useNavigate();

  const next = (e) => {
    if (slideIndex === data.length) {
      setSlideIndex(1);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };

  const prev = (e) => {
    if (slideIndex === 1) {
      setSlideIndex(data.length);
    } else {
      setSlideIndex(slideIndex - 1);
    }
  };

  const setDotIndex = (index) => {
    setSlideIndex(index);
  };

  const shopBtnHandler = (e) => {
    navigate("/shop");
  };

  return (
    <div className="image-slider">
      {data.map((elem, index) => (
        <div
          key={index}
          className={slideIndex === index + 1 ? "slide active" : "slide"}
        >
          <img src={elem.image} alt={`image ${index}`} />

          <div className={`${elem.className}`}>
            <h1>{elem.title}</h1>
            {elem.titleBreak && <h1>{elem.titleBreak}</h1>}
            <h2>{elem.subTitle}</h2>
            <Button
              className="shop-btn"
              text="SHOP NOW"
              onClick={shopBtnHandler}
            />
          </div>
        </div>
      ))}
      <div className="btn-container">
        <ButtonSlider onClick={next} direction={"next"} />
        <ButtonSlider onClick={prev} direction={"prev"} />
      </div>

      <div className="dot-container">
        {data.map((elem, index) => (
          <div
            key={index}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
            onClick={() => setDotIndex(index + 1)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
