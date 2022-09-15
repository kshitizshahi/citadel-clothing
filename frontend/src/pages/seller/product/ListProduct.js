import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product_Page_Details } from "../../../utils/PageTitle";
import SearchBar from "../../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mantine/core";
import LoadingDots from "../../../components/Loading";
import SideBar from "../../../components/Seller/SideBar";
import "../../../styles/listProduct.scss";
import { getAllProduct } from "../../../redux/thunkApi/productApi";
import { Icon } from "@iconify/react";
// import { Modal } from "@mantine/core";
// import Button from "../../../components/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { DELETE_PRODUCT, SEARCH_PRODUCTS } from "../../../utils/BaseUrl";
import { Pagination } from "@mantine/core";

const ListSellerProduct = () => {
  const [products, setProducts] = useState([]);
  const [hideSideBar, setHideSideBar] = useState(false);
  // const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [totalProducts, setTotalProducts] = useState();

  const { loading } = useSelector((state) => state.Product);
  const { mobileDevice } = useSelector((state) => state.Media);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = Product_Page_Details;
  }, []);

  useEffect(() => {
    let mounted = true;
    if (keywords.length > 0) {
      (async function () {
        try {
          const response = await axios.get(`${SEARCH_PRODUCTS}/${keywords}`);
          if (mounted) {
            setProducts(response.data.product);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      })();
    } else {
      (async function () {
        const response = await dispatch(
          getAllProduct({ pageNumber: activePage })
        );
        if (mounted) {
          setProducts(response.payload.product);
          setTotalProducts(response.payload.totalProducts);
          setTotalPage(response.payload.totalPages);
        }
      })();
    }

    return () => {
      mounted = false;
      setProducts(null);
    };
  }, [deleteSuccess, keywords, dispatch, activePage]);

  const keywordsChange = (e) => {
    setKeywords(e.target.value);
  };

  const toggleSideBar = (e) => {
    setHideSideBar(!hideSideBar);
  };

  const addProductNavigator = () => {
    navigate("/seller/add-product");
  };

  const editNavigate = (id) => {
    navigate(`/seller/edit-product/${id}`);
  };

  if (mobileDevice && hideSideBar) {
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.height = "";
    document.body.style.overflow = "";
  }

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
        try {
          const res = await axios.delete(`${DELETE_PRODUCT}/${prodId}`);
          toast.success(res.data.message);
          setDeleteSuccess(!deleteSuccess);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    });
  };

  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="admin-product-container">
          {!mobileDevice ? (
            <div className={hideSideBar ? "side-bar hide" : "side-bar"}>
              <SideBar select="product" />
            </div>
          ) : (
            <div
              className={hideSideBar ? "admin-side-bar" : "admin-side-bar none"}
              style={{ width: hideSideBar ? "26rem" : "0" }}
            >
              <div className="close">
                <Icon
                  icon="ci:close-big"
                  className="cancel-btn"
                  onClick={toggleSideBar}
                />
              </div>
              <SideBar select="product" />
            </div>
          )}

          <div className="table-container">
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
                  <SearchBar
                    placeholder="Search product..."
                    onChange={keywordsChange}
                  />
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
                      <th>Price</th>
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
                          <td>Rs. {prod.price}</td>
                          <td>{prod.isVerified ? "True" : "False"}</td>
                          <td>{prod.countInStock}</td>
                          <td className="button-container">
                            <Tooltip label="Edit" color="green" withArrow>
                              <Icon
                                icon="bx:edit"
                                className="edit-btn"
                                onClick={(e) => editNavigate(prod._id)}
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
              {totalProducts > products?.length && (
                <div className="pagination" style={{ paddingBottom: "2.5rem" }}>
                  <Pagination
                    page={activePage}
                    onChange={setActivePage}
                    total={totalPage}
                    color="dark"
                  />
                </div>
              )}
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

export default ListSellerProduct;
