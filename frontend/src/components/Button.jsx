import React from "react";

const Button = ({ className, text, onClick, disabled }) => {
  return (
    <div>
      {onClick ? (
        <button className={className} onClick={onClick} disabled={disabled}>
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
