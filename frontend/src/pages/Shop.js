import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { Shop_Page_Title } from "../utils/PageTitle";
import { getAllProduct } from "../redux/thunkApi/productApi";
import "../styles/shop.scss";
// import LoadingDots from "../components/Loading";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = Shop_Page_Title;
  }, []);

  useEffect(() => {
    let mounted = true;

    (async function () {
      const response = await dispatch(getAllProduct({}));
      if (mounted) {
        setProducts(response.payload.product);
      }
    })();

    return () => {
      setProducts({});
    };
  }, [dispatch]);

  // if (loading) {
  //   return <LoadingDots />;
  // }
  return (
    <div className="shop-container">
      <div className="container">
        <div className="products">
          <p className="heading">Products</p>
          {products && <Cards data={products} />}
        </div>
      </div>
    </div>
  );
};

export default Shop;
