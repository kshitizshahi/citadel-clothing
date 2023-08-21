import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Edit_User_Page } from "../../../utils/PageTitle";
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
  BASE_URL,
  GET_USER_INFO,
  UPDATE_USER_ADMIN,
} from "../../../utils/BaseUrl";
import { Switch } from "@mantine/core";

const EditUser = () => {
  // const [user, setUser] = useState([]);
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState([]);
  const [accountVerified, setAccountVerified] = useState(false);

  let { id } = useParams();

  let userEmailArray = [];

  const editUserSchema = yup
    .object(
      {
        firstName: yup.string().required("This field is required."),
        lastName: yup.string().required("This field is required."),
        // email: yup
        //   .string()
        //   .email("Invalid email address")
        //   .required("This field is required.")
        //   .test("existingEmail", "Email already in use.", (value) => {
        //     if (value && userEmailArray.includes(value)) {
        //       return false;
        //     } else {
        //       return true;
        //     }
        //   }),
        phoneNumber: yup
          .string()
          .required("This field is required.")
          .matches(/^[1-9]+[0-9]*$/, "Invalid phone number")
          .min(10, "Phone number should be at least 10 digits."),
        oldPassword: yup.string(),
        // .required("This field is required."),

        // newPassword: yup
        //   .string()
        //   .nullable()
        //   .notRequired()
        //   .when("newPassword", {
        //     is: (value) => value?.length,
        //     then: (rule) =>
        //       rule.min(8, "Password must be at least 8 characters."),
        //   }),
        // .required("This field is required."),
        confirmNewPassword: yup
          .string()
          // .required("This field is required.")
          .test("checkPassword", "Password does not match", (value) => {
            return value === getValues("newPassword");
          }),

        profileImage: yup
          .mixed()
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
              } else {
                return true;
              }
            }
          ),
      }
      // [["newPassword", "newPassword"]]
    )
    .required();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(editUserSchema),
  });

  const [openSideBar, setOpenSideBar] = useState(true);
  const [openMobileSideBar, setOpenMobileSideBar] = useState(false);

  const navigate = useNavigate();

  const { mobileDevice } = useSelector((state) => state.Media);

  const watchImage = watch("profileImage", "");

  const submitHandler = async (data) => {
    const formdata = new FormData();
    formdata.append("firstName", data.firstName);
    formdata.append("lastName", data.lastName);
    // formdata.append("email", data.email);
    formdata.append("phoneNumber", data.phoneNumber);
    formdata.append("oldPassword", data.oldPassword);
    formdata.append("newPassword", data.newPassword);
    formdata.append("confirmNewPassword", data.confirmNewPassword);
    formdata.append("profileImage", data.profileImage[0]);
    formdata.append("isAccountVerified", accountVerified);

    try {
      const res = await axios.put(`${UPDATE_USER_ADMIN}/${id}`, formdata);
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
    document.title = Edit_User_Page;

    // (async function () {
    //   try {
    //     const response = await axios.get(`/api/users/get/others/email/${id}`);
    //     if (mounted) {
    //       setUser(response.data.otherUsers);
    //     }
    //   } catch (error) {
    //     toast.error(error.response.data.message);
    //   }
    // })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(`${GET_USER_INFO}/${id}`);
        setLoading(false);
        if (mounted) {
          const user = response.data.user;
          setValue("firstName", user.firstName);
          setValue("lastName", user.lastName);
          setValue("email", user.email);
          setValue("phoneNumber", user.phoneNumber);
          setImage(user.profileImage);
          setAccountVerified(user.isAccountVerified);
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
    setOpenSideBar((current) => {
      return !current;
    });
  };

  const toggleMobileSideBar = (e) => {
    setOpenMobileSideBar((current) => {
      return !current;
    });
  };

  // if (user && user.length > 0) {
  //   user.map((elem) => userEmailArray.push(elem.email));
  // }

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
        <div className="add-user-container">
          {!mobileDevice ? (
            <div className={openSideBar ? "side-bar" : "side-bar hide"}>
              <SideBar select="users" />
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
              <SideBar select="users" sub />
            </div>
          )}
          <div className="form-container">
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

                <p className="heading">Edit User</p>
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
                        <div className="input-fields">
                          <div>
                            <label htmlFor="emailAddress">Email Addresss</label>
                            <input
                              type="email"
                              id="emailAddress"
                              placeholder="Email address"
                              readOnly="readOnly"
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
                              type="password"
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
                              type="password"
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
                              type="password"
                              id="confirmNewPassword"
                              placeholder="Confirm New Password"
                              {...register("confirmNewPassword")}
                            ></input>
                            <p className="error">
                              {errors.confirmNewPassword?.message || "\u00A0"}
                            </p>
                          </div>
                        </div>
                        <div className="switch">
                          <Switch
                            checked={accountVerified}
                            onChange={(e) =>
                              setAccountVerified(e.currentTarget.checked)
                            }
                            label="Account Verified"
                            size="sm"
                          />
                        </div>

                        <div className="btn-container">
                          <Button
                            className="add-category-button"
                            text="Update User"
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

export default EditUser;
