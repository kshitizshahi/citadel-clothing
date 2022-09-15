import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { Shop_Page_Title } from "../utils/PageTitle";
import { getAllProduct } from "../redux/thunkApi/productApi";
import "../styles/shop.scss";
import LoadingDots from "../components/Loading";
import { Pagination } from "@mantine/core";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.Product);

  useEffect(() => {
    document.title = Shop_Page_Title;
  }, []);

  useEffect(() => {
    let mounted = true;

    (async function () {
      const response = await dispatch(
        getAllProduct({ pageNumber: activePage })
      );
      if (mounted) {
        setProducts(response.payload.product);
        setTotalPage(response.payload.totalPages);
      }
    })();

    // return () => {
    //   setProducts({});
    // };
  }, [dispatch, activePage]);

  return (
    <div className="shop-container">
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="container">
          <div className="products">
            <p className="heading">Products</p>
            {products && <Cards data={products} />}
            <div className="pagination" style={{ paddingBlock: "3rem" }}>
              <Pagination
                page={activePage}
                onChange={setActivePage}
                total={totalPage}
                color="dark"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
