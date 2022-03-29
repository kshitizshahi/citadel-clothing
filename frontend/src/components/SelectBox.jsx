import { Select } from "@mantine/core";
import { forwardRef } from "react";

const SelectBox = forwardRef(({ ...props }, ref) => {
  return (
    <div>
      <Select
        // searchable
        // nothingFound="No options"
        styles={{
          item: {
            color: "#2c2c2a",
            fontFamily: "Poppins",
            fontSize: "13px",
          },

          disabled: { color: "#2c2c2a" },
          selected: { color: "#2c2c2a" },
          nothingFound: { color: "#2c2c2a" },
        }}
        ref={ref}
        {...props}
      />
      {/* <p className="error">{props.errors?.productName?.message || "\u00A0"}</p> */}
    </div>
  );
});

export default SelectBox;
