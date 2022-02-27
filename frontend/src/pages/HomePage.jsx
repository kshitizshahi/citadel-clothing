import { data } from "../components/Slider/homeImageData";
import Slider from "../components/Slider/Slider";
import "../styles/homePage.scss";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <Slider data={data} />
      {/* <p>HomePage</p> */}
    </div>
  );
};

export default HomePage;
