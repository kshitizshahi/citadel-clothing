import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product_Page_Dashboard } from "../../utils/PageTitle";
import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mantine/core";
import LoadingDots from "../../components/Loading";
import SideBar from "../../components/Admin/SideBar";
import "../../styles/productDashboard.scss";
import { getAllProduct } from "../../redux/thunkApi/productApi";
import { Icon } from "@iconify/react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [hideSideBar, setHideSideBar] = useState(false);

  const { loading, fetchSuccess, error, shopProduct } = useSelector(
    (state) => state.Product
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = Product_Page_Dashboard;
  }, []);

  useEffect(() => {
    if (!shopProduct) {
      dispatch(getAllProduct({}));
    } else {
      setProducts(shopProduct.product);
    }
  }, [fetchSuccess]);

  const toggleSideBar = (e) => {
    setHideSideBar(!hideSideBar);
  };

  const addProductNavigator = () => {
    navigate("/admin/add-product");
  };

  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="admin-product-container">
          <div className={hideSideBar ? "side-bar hide" : "side-bar"}>
            <SideBar product="current" />
          </div>
          <div
            className={hideSideBar ? "table-container full" : "table-container"}
          >
            <div className="container">
              <div className="heading-container">
                <Icon
                  icon="charm:menu-hamburger"
                  onClick={toggleSideBar}
                  className="toggle-sidebar"
                />

                <p className="heading">Products</p>
              </div>
              <div className="table">
                <div className="search-div">
                  <SearchBar placeholder="Search product..." />
                  <div>
                    <button
                      className="add-product"
                      onClick={addProductNavigator}
                    >
                      <Icon
                        icon="ant-design:plus-outlined"
                        className="add-icon"
                      />
                      New Product
                    </button>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Sn</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Sub Category</th>
                      <th>Mark Price</th>
                      <th>Discount</th>
                      <th>Verified</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map((prod, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{prod.name}</td>
                          <td>
                            {prod.category ? prod.category.name : "dummy"}
                          </td>
                          <td>
                            {prod.subCategory ? prod.subCategory.name : "dummy"}
                          </td>
                          <td>Rs. {prod.markPrice}</td>
                          <td>{prod.discount}%</td>
                          <td>{prod.isVerified ? "True" : "False"}</td>
                          <td>{prod.countInStock}</td>
                          <td className="button-container">
                            <Tooltip label="Edit" color="green" withArrow>
                              <Icon
                                icon="bx:edit"
                                className="edit-btn"
                                onClick={(e) => console.log(prod._id)}
                              />
                            </Tooltip>

                            <Tooltip label="Delete" color="red" withArrow>
                              <Icon
                                icon="ant-design:delete-filled"
                                className="delete-btn"
                                onClick={(e) => console.log(prod.name)}
                              />
                            </Tooltip>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
