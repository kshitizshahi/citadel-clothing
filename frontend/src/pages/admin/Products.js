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
import { Modal } from "@mantine/core";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [hideSideBar, setHideSideBar] = useState(false);
  // const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const { loading } = useSelector((state) => state.Product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = Product_Page_Dashboard;
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
      mounted = false;
    };
  }, [deleteSuccess]);

  const toggleSideBar = (e) => {
    setHideSideBar(!hideSideBar);
  };

  const addProductNavigator = () => {
    navigate("/admin/add-product");
  };

  const toggleDeleteSuccess = (e) => {
    setDeleteSuccess(!deleteSuccess);
  };

  const deleteProduct = async (prodId) => {
    // setOpenDeleteModal(true);

    Swal.fire({
      title: "Are you sure you want to delete the product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      // showClass: {
      //   popup: "", // disable popup animation
      //   icon: "",
      // },
      // hideClass: {
      //   popup: "swal2-hide",
      // },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(`/api/products/delete/${prodId}`);
        toast.success(res.data.message);
        setDeleteSuccess(!deleteSuccess);
      }
    });
  };

  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="admin-product-container">
          <div className={hideSideBar ? "side-bar hide" : "side-bar"}>
            <SideBar current="product" select="product" />
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
                                onClick={(e) => deleteProduct(prod._id)}
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
          {/* {openDeleteModal && (
            <>
              <Modal
                styles={{
                  root: { color: "red" },
                  inner: { color: "red" },
                  // modal: { color: "red", backgroundColor: "black" },
                  header: { color: "red" },
                  overlay: { color: "red" },
                  title: {
                    color: "red",
                    fontFamily: "Poppins",
                    fontWeight: "550",
                    fontSize: "24px",
                    textAlign: "center",
                  },
                  body: { color: "red" },
                  close: { color: "red" },
                }}
                size="md"
                opened={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                title="Are you sure you want to delete the product?"
                centered
              >
                <Button text="Delete" />
                <Button text="Cancel" />
              </Modal>
            </>
          )} */}
        </div>
      )}
    </div>
  );
};

export default Products;
