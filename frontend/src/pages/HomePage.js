import { data } from "../components/Slider/homeImageData";
import Slider from "../components/Slider/Slider";
import { BASE_URL } from "../utils/BaseUrl";
import "../styles/homePage.scss";
import { Link } from "react-router-dom";
import Cards from "../components/Cards";
import { Home_Page_Title } from "../utils/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDiscountProduct } from "../redux/thunkApi/productApi";
import LoadingDots from "../components/Loading";
import Button from "../components/Button";
import ProgressBar from "../components/Progress";
import { getCategory } from "../redux/thunkApi/categoryApi";

const HomePage = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [currentRow, setCurrentRow] = useState(1);
  const [productsPerRow, setProductsPerRow] = useState(4);
  const [firstProductIndex, setFirstProductIndex] = useState(0);
  const [lastProductIndex, setLastProductIndex] = useState();
  const [category, setCategory] = useState([]);

  let array = [];

  const { loading } = useSelector((state) => state.Product);
  const dispatch = useDispatch();

  if (topProducts) {
    // array = topProducts.slice(0, 4);

    array = topProducts.slice(firstProductIndex, lastProductIndex);
  }

  useEffect(() => {
    let mounted = true;
    document.title = Home_Page_Title;

    (async function () {
      const response = await dispatch(getDiscountProduct({}));
      if (mounted) {
        setTopProducts(response.payload.product);
        setLastProductIndex(currentRow * productsPerRow);
        // setFirstProductIndex(lastProductIndex - productsPerRow);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setLastProductIndex(currentRow * productsPerRow);
      // setFirstProductIndex(lastProductIndex - productsPerRow);
    }
    return () => {
      mounted = false;
    };
  }, [currentRow, productsPerRow]);

  // const topProducts = () => {
  //   for (let i = 0; i < 4; i++) {
  //     setTop(...top, products[i]);
  //   }
  // };
  useEffect(() => {
    let mounted = true;

    (async function () {
      const response = await dispatch(getCategory({}));
      if (mounted) {
        setCategory(response.payload.category);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const loadProducts = async () => {
    if (lastProductIndex <= topProducts.length) {
      setCurrentRow(currentRow + 1);
    }
  };

  return (
    <div className="home-page-container">
      {loading ? (
        <>
          <ProgressBar />
          <LoadingDots />
        </>
      ) : (
        <div>
          <Slider data={data} />
          <div className="container">
            <div className="category-container">
              {category &&
                category.map((elem, index) => (
                  <div key={index} className="category-items">
                    <Link to={`/category/${elem._id}`}>
                      <img
                        src={`${BASE_URL}/${elem.categoryImage}`}
                        alt="Category Image"
                      ></img>
                      <p>{elem.name}</p>
                    </Link>
                  </div>
                ))}
            </div>
            <div className="top-products">
              <div className="products">
                <p className="heading">Top Products</p>
                {topProducts && <Cards data={array} />}
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
      )}
    </div>
  );
};

export default HomePage;
