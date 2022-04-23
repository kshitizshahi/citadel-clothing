import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Add_User_Page } from "../../../utils/PageTitle";
import Button from "../../../components/Button";
import LoadingDots from "../../../components/Loading";
import SideBar from "../../../components/Admin/SideBar";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../../styles/addUser.scss";
import {
  ALL_USERS_EMAIL,
  PUBLIC_URL,
  REGISTER_USER,
} from "../../../utils/BaseUrl";
import { Switch } from "@mantine/core";

const AddUser = () => {
  const [user, setUser] = useState([]);
  const [isSeller, setIsSeller] = useState(false);

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  let userEmailArray = [];

  const addUserSchema = yup
    .object({
      firstName: yup.string().required("This field is required."),
      lastName: yup.string().required("This field is required."),
      email: yup
        .string()
        .email("Invalid email address.")
        .required("This field is required.")
        .test("existingEmail", "Email already in use.", (value) => {
          if (value && userEmailArray.includes(value)) {
            return false;
          } else {
            return true;
          }
        }),
      phoneNumber: yup
        .string()
        .required("This field is required.")
        .matches(/^[1-9]+[0-9]*$/, "Invalid phone number")
        .min(10, "Phone number should be at least 10 digits."),

      password: yup
        .string()
        .required("This field is required.")
        .min(8, "Password must be at least 8 characters."),

      confirmPassword: yup
        .string()
        .required("This field is required.")
        .test("checkPassword", "Password does not match", (value) => {
          return value === getValues("password");
        }),

      profileImage: yup
        .mixed()
        .required("Image is required.")
        .test("required", "Image is required.", (value) => {
          return value && value.length > 0;
        })
        .test(
          "fileType",
          "Unsupported file format. Please upload Image.",
          (value) => {
            if (value && value.length > 0) {
              if (SUPPORTED_FORMATS.includes(value[0].type)) {
                return true;
              } else {
                return false;
              }
            }
          }
        ),
    })
    .required();

  const {
    register,
    handleSubmit,
    getValues,
    watch,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(addUserSchema),
  });

  const [hideSideBar, setHideSideBar] = useState(false);

  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.Category);
  const { mobileDevice } = useSelector((state) => state.Media);

  const watchImage = watch("profileImage", "");

  const submitHandler = async (data) => {
    const formdata = new FormData();
    formdata.append("firstName", data.firstName);
    formdata.append("lastName", data.lastName);
    formdata.append("email", data.email);
    formdata.append("phoneNumber", data.phoneNumber);
    formdata.append("password", data.password);
    formdata.append("confirmPassword", data.confirmPassword);
    formdata.append("profileImage", data.profileImage[0]);
    formdata.append("isSeller", isSeller);
    formdata.append("isAccountVerified", true);

    try {
      const res = await axios.post(REGISTER_USER, formdata);
      toast.success(res.data.message);
      if (res.data.message) {
        navigate("/admin/users");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    let mounted = true;
    document.title = Add_User_Page;

    (async function () {
      try {
        const response = await axios.get(ALL_USERS_EMAIL);
        if (mounted) {
          setUser(response.data.users);
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
        <div className="add-user-container">
          {!mobileDevice ? (
            <div className={hideSideBar ? "side-bar hide" : "side-bar"}>
              <SideBar select="users" />
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
              <SideBar select="users" />
            </div>
          )}
          <div className="form-container">
            <div className="container">
              <div className="heading-container">
                <Icon
                  icon="charm:menu-hamburger"
                  onClick={toggleSideBar}
                  className="toggle-sidebar"
                />

                <p className="heading">Add User</p>
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
                          src={`${PUBLIC_URL}/images/default-profile.png`}
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
                        <div className="input-fields">
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
                            <label htmlFor="password">Password</label>
                            <input
                              type="password"
                              id="password"
                              placeholder="Password"
                              {...register("password")}
                            ></input>
                            <p className="error">
                              {errors.password?.message || "\u00A0"}
                            </p>
                          </div>
                          <div>
                            <label htmlFor="confirmPassword">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              id="confirmPassword"
                              placeholder="Confirm Password"
                              {...register("confirmPassword")}
                            ></input>
                            <p className="error">
                              {errors.confirmPassword?.message || "\u00A0"}
                            </p>
                          </div>
                        </div>

                        <div className="switch">
                          <Switch
                            checked={isSeller}
                            onChange={(e) =>
                              setIsSeller(e.currentTarget.checked)
                            }
                            label="Seller"
                            size="sm"
                          />
                        </div>

                        <div className="btn-container">
                          <Button
                            className="add-category-button"
                            text="Add User"
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

export default AddUser;
