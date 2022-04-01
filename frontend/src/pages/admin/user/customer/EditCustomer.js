import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Edit_Customer_Page } from "../../../../utils/PageTitle";
import Button from "../../../../components/Button";
import LoadingDots from "../../../../components/Loading";
import SideBar from "../../../../components/Admin/SideBar";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../../../styles/addCustomer.scss";
import { BASE_URL } from "../../../../utils/BaseUrl";

const EditCustomer = () => {
  const [user, setUser] = useState([]);
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const [image, setImage] = useState([]);

  let { id } = useParams();

  let userEmailArray = [];

  const editCustomerSchema = yup
    .object({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      email: yup
        .string()
        .email("Invalid email")
        .required("Required")
        .test("existingEmail", "Email already exists", (value) => {
          if (value && userEmailArray.includes(value)) {
            return false;
          } else {
            return true;
          }
        }),
      phoneNumber: yup
        .number()
        .required("Required")
        .test(
          "checkPhoneLength",
          "Phone number should be at least be 10 digits",
          (value) => {
            return value.toString().length >= 10;
          }
        )
        .typeError("Please enter number"),
      // oldPassword: yup.string().required("Required"),
      // newPassword: yup.string().required("Required"),
      confirmNewPassword: yup
        .string()
        // .required("Required")
        .test("checkPassword", "Password does not match", (value) => {
          return value === getValues("newPassword");
        }),

      profileImage: yup.mixed().test("fileType", "Images Only", (value) => {
        if (value && value.length > 0) {
          if (SUPPORTED_FORMATS.includes(value[0].type)) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      }),
    })
    .required();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(editCustomerSchema),
  });

  const [hideSideBar, setHideSideBar] = useState(false);

  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.Category);

  const watchImage = watch("profileImage", "");

  const submitHandler = async (data) => {
    const formdata = new FormData();
    formdata.append("firstName", data.firstName);
    formdata.append("lastName", data.lastName);
    formdata.append("email", data.email);
    formdata.append("phoneNumber", data.phoneNumber);
    formdata.append("oldPassword", data.oldPassword);
    formdata.append("newPassword", data.newPassword);
    formdata.append("confirmNewPassword", data.confirmNewPassword);

    formdata.append("profileImage", data.profileImage[0]);

    try {
      const res = await axios.put(`/api/users/update-customer/${id}`, formdata);
      toast.success(res.data.message);
      if (res.data.message) {
        navigate("/admin/customer");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    let mounted = true;
    document.title = Edit_Customer_Page;

    (async function () {
      try {
        const response = await axios.get(`/api/users/get/others/email/${id}`);
        if (mounted) {
          setUser(response.data.otherUsers);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    (async function () {
      try {
        const response = await axios.get(`/api/users/get/${id}`);
        if (mounted) {
          const customer = response.data.customer;
          setValue("firstName", customer.firstName);
          setValue("lastName", customer.lastName);
          setValue("email", customer.email);
          setValue("phoneNumber", customer.phoneNumber);
          setImage(customer.profileImage);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const toggleSideBar = (e) => {
    setHideSideBar(!hideSideBar);
  };

  if (user && user.length > 0) {
    user.map((elem) => userEmailArray.push(elem.email));
  }

  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="add-customer-container">
          <div className={hideSideBar ? "side-bar hide" : "side-bar"}>
            <SideBar select="users" subSelect="customers" />
          </div>
          <div className="form-container">
            <div className="container">
              <div className="heading-container">
                <Icon
                  icon="charm:menu-hamburger"
                  onClick={toggleSideBar}
                  className="toggle-sidebar"
                />

                <p className="heading">Add Customer</p>
              </div>

              <div className="form-wrapper">
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  encType="multipart/form-data"
                >
                  <div className="form-wrapper-container">
                    <div className="profile-image">
                      {getValues("profileImage") &&
                      getValues("profileImage").length > 0 ? (
                        <img
                          src={URL.createObjectURL(
                            getValues("profileImage")[0]
                          )}
                          alt=""
                          className="img"
                        />
                      ) : (
                        <img
                          src={`${BASE_URL}/${image}`}
                          alt=""
                          className="img"
                        />
                      )}

                      <label htmlFor="imageChange" className="image-label">
                        Profile Image
                      </label>
                      <p className="error">
                        {errors.profileImage?.message || "\u00A0"}
                      </p>
                      <input
                        type="file"
                        id="imageChange"
                        accept=".png, .jpg, .jpeg"
                        className="profile-image-input"
                        {...register("profileImage")}
                      ></input>
                    </div>
                    <div className="input-field-container">
                      <div className="flex-container">
                        <div className="first-name-container">
                          <label htmlFor="firstName">First Name</label>
                          <input
                            type="text"
                            id="firstName"
                            placeholder="First Name"
                            {...register("firstName")}
                          ></input>
                          <p className="error">
                            {errors.firstName?.message || "\u00A0"}
                          </p>
                        </div>
                        <div className="last-name-container">
                          <label htmlFor="lastName">Last Name</label>
                          <input
                            type="text"
                            id="lastName"
                            placeholder="Last Name"
                            {...register("lastName")}
                          ></input>
                          <p className="error">
                            {errors.lastName?.message || "\u00A0"}
                          </p>
                        </div>
                      </div>
                      <div className="other-form-fields">
                        <div>
                          <label htmlFor="emailAddress">Email Addresss</label>
                          <input
                            type="email"
                            id="emailAddress"
                            placeholder="Email address"
                            {...register("email")}
                          ></input>
                          <p className="error">
                            {errors.email?.message || "\u00A0"}
                          </p>
                        </div>
                        <div>
                          <label htmlFor="phoneNumber">Phone Number</label>
                          <input
                            type="text"
                            id="phoneNumber"
                            placeholder="Phone Number"
                            {...register("phoneNumber")}
                          ></input>
                          <p className="error">
                            {errors.phoneNumber?.message || "\u00A0"}
                          </p>
                        </div>
                        <div>
                          <label htmlFor="oldPassword">Old Password</label>
                          <input
                            type="text"
                            id="oldPassword"
                            placeholder="Old Password"
                            {...register("oldPassword")}
                          ></input>
                          <p className="error">
                            {errors.oldPassword?.message || "\u00A0"}
                          </p>
                        </div>
                        <div>
                          <label htmlFor="newPassword">New Password</label>
                          <input
                            type="text"
                            id="newPassword"
                            placeholder="New Password"
                            {...register("newPassword")}
                          ></input>
                          <p className="error">
                            {errors.newPassword?.message || "\u00A0"}
                          </p>
                        </div>
                        <div>
                          <label htmlFor="confirmNewPassword">
                            Confirm New Password
                          </label>
                          <input
                            type="text"
                            id="confirmNewPassword"
                            placeholder="Confirm New Password"
                            {...register("confirmNewPassword")}
                          ></input>
                          <p className="error">
                            {errors.confirmNewPassword?.message || "\u00A0"}
                          </p>
                        </div>

                        <div className="btn-container">
                          <Button
                            className="add-category-button"
                            text="Update Customer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCustomer;
