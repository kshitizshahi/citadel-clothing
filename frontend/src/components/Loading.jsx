import { Icon } from "@iconify/react";
import "../styles/loading.scss";

const LoadingDots = () => {
  const loadingStyle = {
    // height: "25px",
    // width: "25px",
    height: "70px",
    width: "70px",
  };
  return (
    <div
      style={{
        minHeight: window.innerHeight,
        // background: "#ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon
        // icon="fontisto:spinner-rotate-forward"
        icon="eos-icons:three-dots-loading"
        style={loadingStyle}
        // className="loading"
      />
    </div>
  );
};

export default LoadingDots;
