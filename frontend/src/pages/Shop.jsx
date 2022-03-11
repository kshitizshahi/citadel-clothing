import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { Shop_Page_Title } from "../utils/PageTitle";
import { getAllProduct } from "../redux/thunkApi/productApi";
import "../styles/shop.scss";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const { loading, fetchSuccess, error, shopProduct } = useSelector(
    (state) => state.Product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = Shop_Page_Title;
  }, []);

  useEffect(() => {
    if (!shopProduct) {
      dispatch(getAllProduct({}));
    } else {
      setProducts(shopProduct.product);
    }
  }, [fetchSuccess]);
  return (
    <div className="shop-container">
      <div className="container">
        <div className="products">
          <p className="heading">Products</p>
          {shopProduct && <Cards data={products} />}
        </div>
      </div>
    </div>
  );
};

export default Shop;
