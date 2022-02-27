import React from "react";

const Button = ({ className, text, onClick }) => {
  return (
    <div>
      {onClick ? (
        <button className={className} onClick={onClick}>
          {text}
        </button>
      ) : (
        <button className={className} type="submit">
          {text}
        </button>
      )}
    </div>
  );
};

export default Button;
