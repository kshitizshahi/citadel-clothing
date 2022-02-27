import React from "react";
import { Icon } from "@iconify/react";

import "../styles/slider.scss";

const ButtonSlider = ({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <Icon
        icon={direction === "next" ? "ooui:previous-rtl" : "ooui:previous-ltr"}
        className="slider-icon"
      />
    </button>
  );
};

export default ButtonSlider;
