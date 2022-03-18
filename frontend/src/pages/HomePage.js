import { data } from "../components/Slider/homeImageData";
import Slider from "../components/Slider/Slider";
import { PUBLIC_URL } from "../utils/BaseUrl";
import "../styles/homePage.scss";
import { Link, useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import { Home_Page_Title } from "../utils/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDiscountProduct } from "../redux/thunkApi/productApi";
import LoadingDots from "../components/Loading";
import Button from "../components/Button";
import ProgressBar from "../components/Progress";
import { getCategory } from "../redux/thunkApi/categoryApi";
import axios from "axios";

const HomePage = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [currentRow, setCurrentRow] = useState(1);
  const [productsPerRow, setProductsPerRow] = useState(4);
  const [firstProductIndex, setFirstProductIndex] = useState(0);
  const [lastProductIndex, setLastProductIndex] = useState();
  const [category, setCategory] = useState([]);

  let array = [];

  const { loading, fetchSuccess, error, homeProduct } = useSelector(
    (state) => state.Product
  );
  const { success, productCategory } = useSelector((state) => state.Category);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (homeProduct) {
    // array = topProducts.slice(0, 4);

    array = topProducts.slice(firstProductIndex, lastProductIndex);
  }

  useEffect(() => {
    document.title = Home_Page_Title;
    if (!homeProduct) {
      dispatch(getDiscountProduct({}));
    } else {
      setTopProducts(homeProduct.product);
      setLastProductIndex(currentRow * productsPerRow);
      setFirstProductIndex(lastProductIndex - productsPerRow);
    }
  }, [fetchSuccess, currentRow]);

  // useEffect(() => {
  //   (async function () {
  //     const response = await dispatch(getProduct({}));
  //     setTopProducts(response.payload.product);
  //     setLastProductIndex(currentRow * productsPerRow);
  //     setFirstProductIndex(lastProductIndex - productsPerRow);
  //   })();
  // }, [currentRow]);

  // const topProducts = () => {
  //   for (let i = 0; i < 4; i++) {
  //     setTop(...top, products[i]);
  //   }
  // };
  useEffect(() => {
    if (!productCategory) {
      dispatch(getCategory({}));
    } else {
      setCategory(productCategory.category);
    }
  }, [success]);

  const loadProducts = async () => {
    // const res = await axios.post("/api/category/create", {
    //   name: "Watch",
    // });
    if (lastProductIndex <= topProducts.length) {
      setCurrentRow(currentRow + 1);
    }
  };

  return (
    <div className="home-page-container">
      {loading && (
        <>
          <ProgressBar />
          <LoadingDots />
        </>
      )}
      <Slider data={data} />
      <div className="container">
        <div className="category-container">
          {/* {productCategory && console.log(category)} */}
          {productCategory &&
            category &&
            category.map((elem, index) => (
              <div key={index} className="category-items">
                <Link to={`/category/${elem._id}`}>
                  <img
                    src={`${PUBLIC_URL}/images/mens fashion.jpg`}
                    alt="Men's Fashion"
                  ></img>
                  <p>{elem.name}</p>
                </Link>
              </div>
            ))}

          {/* <div className="mens-fashion">
            <Link to="/men">
              <img
                src={`${PUBLIC_URL}/images/mens fashion.jpg`}
                alt="Men's Fashion"
              ></img>
              <p>Men's Fashion</p>
            </Link>
          </div>
          <div className="womens-fashion">
            <Link to="/women">
              <img src={`${PUBLIC_URL}/images/womens fashion.jpg`}></img>
              <p>Women's Fashion</p>
            </Link>
          </div>
          <div className="kids-wear">
            <Link to="/kid">
              <img
                src={`${PUBLIC_URL}/images/kids wear.jpg`}
                alt="Kid's Wear"
              ></img>
              <p>Kid's Wear</p>
            </Link>
          </div> */}
        </div>
        <div className="top-products">
          <div className="products">
            <p className="heading">Top Products</p>
            {homeProduct && <Cards data={array} />}
            {/* {homeProduct && currentProducts && <Cards data={currentProducts} />} */}
            <div className="shop">
              <Button
                text="Load More"
                onClick={loadProducts}
                className="load-more"
                disabled={lastProductIndex >= topProducts.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
