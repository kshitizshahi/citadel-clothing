import { Select } from "@mantine/core";

const SelectBox = ({ value, change, placeholder, data }) => {
  return (
    <div>
      <Select
        placeholder={placeholder}
        // searchable
        // nothingFound="No options"
        value={value}
        onChange={change}
        data={data}
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
      />
    </div>
  );
};

export default SelectBox;
