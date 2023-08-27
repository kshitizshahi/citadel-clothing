import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { Women_Page_Title } from "../utils/PageTitle";
import "../styles/shop.scss";
import LoadingDots from "../components/Loading";
import axios from "axios";
import { CATEGORY_WOMEN } from "../utils/BaseUrl";

const Women = () => {
  const [products, setProducts] = useState([]);
  const [heading, setHeading] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = Women_Page_Title;
  }, []);

  useEffect(() => {
    let mounted = true;

    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(CATEGORY_WOMEN);
        setLoading(false);

        if (mounted) {
          setProducts(response.data.product);
          setHeading(response.data.product[0]?.category?.name);
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
                <p className="heading">{heading}</p>
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

export default Women;
