import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import "../styles/shop.scss";
import LoadingDots from "../components/Loading";
import axios from "axios";
import {
  BRAND_PRODUCTS,
  CATEGORY_MEN,
  SELLER_PRODUCTS,
} from "../utils/BaseUrl";
import { useParams } from "react-router-dom";

const Seller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  let { name } = useParams();

  useEffect(() => {
    document.title = name;
  }, []);

  useEffect(() => {
    let mounted = true;

    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(`${SELLER_PRODUCTS}/${name}`);
        setLoading(false);

        if (mounted) {
          setProducts(response.data.product);
        }
      } catch (error) {
        setLoading(false);
      }
    })();

    return () => {
      setProducts({});
    };
  }, []);

  return (
    <div className="shop-container">
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="container" style={{ paddingBottom: "5rem" }}>
          <div className="products">
            {products.length > 0 ? (
              <div>
                <p className="heading">{name} Products</p>
                {products && <Cards data={products} />}
              </div>
            ) : (
              <p
                style={{
                  height: window.innerHeight,
                  fontSize: "3rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No Products
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Seller;
