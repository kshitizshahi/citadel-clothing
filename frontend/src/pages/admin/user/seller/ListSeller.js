import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Customer_Page_Details } from "../../../../utils/PageTitle";
import SearchBar from "../../../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mantine/core";
import LoadingDots from "../../../../components/Loading";
import SideBar from "../../../../components/Admin/SideBar";
import "../../../../styles/listCategory.scss";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";

const ListSeller = () => {
  const [sellers, setSellers] = useState([]);
  const [hideSideBar, setHideSideBar] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [keywords, setKeywords] = useState("");

  const { loading } = useSelector((state) => state.Product);
  const { mobileDevice } = useSelector((state) => state.Media);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = Customer_Page_Details;
  }, []);

  useEffect(() => {
    let mounted = true;
    if (keywords.length > 0) {
      (async function () {
        try {
          const response = await axios.get(`/api/users/search/${keywords}`);
          if (mounted) {
            setSellers(response.data.sellers);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      })();
    } else {
      (async function () {
        try {
          const response = await axios.get(`/api/sellers/get/seller`);
          if (mounted) {
            setSellers(response.data.data);
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

  const addCustomerNavigator = () => {
    navigate("/admin/add-customer");
  };

  const editNavigate = (id) => {
    navigate(`/admin/edit-customer/${id}`);
  };

  const deleteCustomer = async (cusId) => {
    Swal.fire({
      title: "Are you sure you want to delete the customer?",
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
          const res = await axios.delete(`/api/users/delete/${cusId}`);
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
              <SideBar select="users" subSelect="sellers" />
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
              <SideBar select="users" subSelect="sellers" />
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

                <p className="heading">Sellers</p>
              </div>
              <div className="table">
                <div className="search-div">
                  <SearchBar
                    placeholder="Search customer..."
                    onChange={keywordsChange}
                  />
                  <div>
                    <button
                      className="add-category"
                      onClick={addCustomerNavigator}
                    >
                      <Icon
                        icon="ant-design:plus-outlined"
                        className="add-icon"
                      />
                      New Customer
                    </button>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Sn</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Verifed</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellers &&
                      sellers.map((elem, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{elem.fullName}</td>
                          <td>{elem.email}</td>
                          <td>{elem.phoneNumber}</td>
                          <td>{}</td>

                          <td className="button-container">
                            <Tooltip label="Edit" color="green" withArrow>
                              <Icon
                                icon="bx:edit"
                                className="edit-btn"
                                onClick={(e) => editNavigate(elem._id)}
                              />
                            </Tooltip>

                            <Tooltip label="Delete" color="red" withArrow>
                              <Icon
                                icon="ant-design:delete-filled"
                                className="delete-btn"
                                onClick={(e) => deleteCustomer(elem._id)}
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

export default ListSeller;
