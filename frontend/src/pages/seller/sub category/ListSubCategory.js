import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SubCategory_Page_Details } from "../../../utils/PageTitle";
import SearchBar from "../../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mantine/core";
import LoadingDots from "../../../components/Loading";
import SideBar from "../../../components/Seller/SideBar";
import "../../../styles/listCategory.scss";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";

const ListSellerSubCategory = () => {
  const [subCategory, setSubCategory] = useState([]);
  const [hideSideBar, setHideSideBar] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  const { mobileDevice } = useSelector((state) => state.Media);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = SubCategory_Page_Details;
  }, []);

  useEffect(() => {
    let mounted = true;
    if (keywords.length > 0) {
      (async function () {
        try {
          const response = await axios.get(
            `/api/sub-category/search/${keywords}`
          );
          if (mounted) {
            setSubCategory(response.data.subCategory);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      })();
    } else {
      (async function () {
        try {
          setLoading(true);
          const response = await axios.get(`/api/sub-category/get/all`);
          setLoading(false);
          if (mounted) {
            setSubCategory(response.data.subCategory);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      })();
    }

    return () => {
      mounted = false;
    };
  }, [deleteSuccess, keywords]);

  const keywordsChange = (e) => {
    setKeywords(e.target.value);
  };

  const toggleSideBar = (e) => {
    setHideSideBar(!hideSideBar);
  };

  const addSubCategoryNavigator = () => {
    navigate("/seller/add-subcategory");
  };

  const editNavigate = (id) => {
    navigate(`/seller/edit-subcategory/${id}`);
  };

  const deleteCategory = async (subCatId) => {
    Swal.fire({
      title: "Are you sure you want to delete the sub category?",
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
          const res = await axios.delete(
            `/api/sub-category/delete/${subCatId}`
          );
          toast.success(res.data.message);
          setDeleteSuccess(!deleteSuccess);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    });
  };

  if (mobileDevice && hideSideBar) {
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.height = "";
    document.body.style.overflow = "";
  }

  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="admin-category-container">
          {!mobileDevice ? (
            <div className={hideSideBar ? "side-bar hide" : "side-bar"}>
              <SideBar select="sub-category" />
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
              <SideBar select="sub-category" />
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

                <p className="heading">Sub Category</p>
              </div>
              <div className="table">
                <div className="search-div">
                  <SearchBar
                    placeholder="Search sub category..."
                    onChange={keywordsChange}
                  />
                  <div>
                    <button
                      className="add-category"
                      onClick={addSubCategoryNavigator}
                    >
                      <Icon
                        icon="ant-design:plus-outlined"
                        className="add-icon"
                      />
                      New Sub Category
                    </button>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Sn</th>
                      <th>Category</th>
                      <th>Sub Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subCategory &&
                      subCategory.map((cat, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{cat?.category?.name}</td>
                          <td>{cat.name}</td>

                          <td className="button-container">
                            <Tooltip label="Edit" color="green" withArrow>
                              <Icon
                                icon="bx:edit"
                                className="edit-btn"
                                onClick={(e) => editNavigate(cat._id)}
                              />
                            </Tooltip>

                            <Tooltip label="Delete" color="red" withArrow>
                              <Icon
                                icon="ant-design:delete-filled"
                                className="delete-btn"
                                onClick={(e) => deleteCategory(cat._id)}
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

export default ListSellerSubCategory;
