import { Icon } from "@iconify/react";

const LoadingDots = () => {
  const loadingStyle = {
    height: "100px",
    width: "200px",
  };
  return (
    <div
      style={{
        minHeight: window.innerHeight,
        background: "#ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon icon="eos-icons:three-dots-loading" style={loadingStyle} />
    </div>
  );
};

export default LoadingDots;
