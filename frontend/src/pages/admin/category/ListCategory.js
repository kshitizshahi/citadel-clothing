import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Category_Page_Details } from "../../../utils/PageTitle";
import SearchBar from "../../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mantine/core";
import LoadingDots from "../../../components/Loading";
import SideBar from "../../../components/Admin/SideBar";
import "../../../styles/listCategory.scss";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { getCategory } from "../../../redux/thunkApi/categoryApi";
import { DELETE_CATEGORY, SEARCH_CATEGORY } from "../../../utils/BaseUrl";

const ListCategory = () => {
  const [category, setCategory] = useState([]);
  const [openSideBar, setOpenSideBar] = useState(true);
  const [openMobileSideBar, setOpenMobileSideBar] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [keywords, setKeywords] = useState("");

  const { loading } = useSelector((state) => state.Category);
  const { mobileDevice } = useSelector((state) => state.Media);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = Category_Page_Details;
  }, []);

  useEffect(() => {
    let mounted = true;
    if (keywords.length > 0) {
      (async function () {
        try {
          const response = await axios.get(`${SEARCH_CATEGORY}/${keywords}`);
          if (mounted) {
            setCategory(response.data.category);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      })();
    } else {
      (async function () {
        const response = await dispatch(getCategory({}));
        if (mounted) {
          setCategory(response.payload.category);
        }
      })();
    }

    return () => {
      mounted = false;
      // setCategory({});
    };
  }, [deleteSuccess, keywords, dispatch]);

  const keywordsChange = (e) => {
    setKeywords(e.target.value);
  };

  const toggleSideBar = (e) => {
    setOpenSideBar((current) => {
      return !current;
    });
  };

  const toggleMobileSideBar = (e) => {
    setOpenMobileSideBar((current) => {
      return !current;
    });
  };

  const editNavigate = (id) => {
    navigate(`/admin/edit-category/${id}`);
  };

  const deleteCategory = async (catId) => {
    Swal.fire({
      title: "Are you sure you want to delete the category?",
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
          const res = await axios.delete(`${DELETE_CATEGORY}/${catId}`);
          toast.success(res.data.message);
          setDeleteSuccess(!deleteSuccess);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    });
  };

  if (mobileDevice && openMobileSideBar) {
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
            <div className={openSideBar ? "side-bar" : "side-bar hide"}>
              <SideBar select="category" />
            </div>
          ) : (
            <div
              className={
                openMobileSideBar ? "admin-side-bar" : "admin-side-bar-none"
              }
              style={{ width: openMobileSideBar ? "26rem" : "0" }}
            >
              <div className="close">
                <Icon
                  icon="ci:close-big"
                  className="cancel-btn"
                  onClick={toggleMobileSideBar}
                />
              </div>
              <SideBar select="category" />
            </div>
          )}
          <div className="table-container">
            <div className="container">
              <div className="heading-container">
                {!mobileDevice ? (
                  <Icon
                    icon="charm:menu-hamburger"
                    onClick={toggleSideBar}
                    className="toggle-sidebar"
                  />
                ) : (
                  <Icon
                    icon="charm:menu-hamburger"
                    onClick={toggleMobileSideBar}
                    className="toggle-sidebar"
                  />
                )}

                <p className="heading">Category</p>
              </div>
              <div className="table">
                <div className="search-div">
                  <SearchBar
                    placeholder="Search category..."
                    onChange={keywordsChange}
                  />
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Sn</th>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category &&
                      category.map((cat, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
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

export default ListCategory;
