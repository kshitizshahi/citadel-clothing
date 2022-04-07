import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/userProfile.scss";
import { Profile_Page_Title } from "../utils/PageTitle";
import UserNav from "../components/UserNav";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { updateUser } from "../redux/thunkApi/userApi";
import { logoutUser, validateUser } from "../redux/thunkApi/authApi";
import { BASE_URL } from "../utils/BaseUrl";
import { clearError, clearuserUpdate } from "../redux/slice/userSlice";
// import { resetSuccess } from "../redux/slice/authSlice";
import LoadingDots from "../components/Loading";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UserProfile = () => {
  const [image, setImage] = useState([]);
  // const [user, setUser] = useState([]);
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  let userEmailArray = [];

  const updateUserSchema = yup
    .object({
      firstName: yup.string().required("This field is required."),
      lastName: yup.string().required("This field is required."),
      // email: yup
      //   .string()
      //   .email("Invalid email address.")
      //   .required("This field is required."),
      // .test("existingEmail", "Email already in use.", (value) => {
      //   if (value && userEmailArray.includes(value)) {
      //     return false;
      //   } else {
      //     return true;
      //   }
      // }),
      phoneNumber: yup
        .string()
        .required("This field is required.")
        .matches(/^[1-9]+[0-9]*$/, "Invalid phone number")
        .min(10, "Phone number should be at least 10 digits."),

      userImage: yup
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
    resolver: yupResolver(updateUserSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchImage = watch("userImage", "");

  const { userUpdate, loading, error, isValid } = useSelector(
    (state) => state.User
  );
  const {
    userInfo,
    fetchSuccess,
    error: authError,
  } = useSelector((state) => state.authUser);

  const submitHandler = async (data) => {
    dispatch(
      updateUser({
        firstName: data.firstName,
        lastName: data.lastName,
        // email: data.email,
        phoneNumber: data.phoneNumber,
        userImage: data.userImage[0],
      })
    );
    // dispatch(resetSuccess());
  };

  const changePasswordHandler = (e) => {
    navigate("/change-password");
  };

  useEffect(() => {
    document.title = Profile_Page_Title;

    if (userInfo && fetchSuccess) {
      setValue("firstName", userInfo.firstName);
      setValue("lastName", userInfo.lastName);
      setValue("email", userInfo.email);
      setValue("phoneNumber", userInfo.phoneNumber);
      setImage(userInfo.profileImage);
    }
  }, [fetchSuccess, dispatch]);

  useEffect(() => {
    if (error?.error) {
      toast.error(error.error);
      setTimeout(() => {
        dispatch(logoutUser({}));
        dispatch(clearError());
      }, 1000);
    }
  }, [isValid]);

  // useEffect(() => {
  //   let mounted = true;

  //   (async function () {
  //     try {
  //       const response = await axios.get(`/api/users/check/others/email/`);
  //       if (mounted) {
  //         setUser(response.data.otherUsers);
  //       }
  //     } catch (error) {
  //       toast.error(error.response.data.message);
  //     }
  //   })();

  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

  // if (user && user.length > 0) {
  //   user.map((elem) => userEmailArray.push(elem.email));
  // }

  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="user-profile-container">
          <div className="form-container">
            <div className="user-address-container">
              <form
                onSubmit={handleSubmit(submitHandler)}
                encType="multipart/form-data"
              >
                <div className="user-profile-form">
                  <div className="profile-image">
                    {getValues("userImage") &&
                    getValues("userImage").length > 0 ? (
                      <img
                        src={URL.createObjectURL(getValues("userImage")[0])}
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

                    <label htmlFor="imageChange" className="image-change">
                      Change Image
                    </label>
                    <p className="error">
                      {errors.userImage?.message || "\u00A0"}
                    </p>
                    <input
                      type="file"
                      id="imageChange"
                      accept=".png, .jpg, .jpeg"
                      className="profile-image-input"
                      {...register("userImage")}
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
                          readOnly="readOnly"
                          // disabled="disabled"
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
                          type="tel"
                          id="phoneNumber"
                          placeholder="Phone Number"
                          {...register("phoneNumber")}
                        ></input>
                        <p className="error">
                          {errors.phoneNumber?.message || "\u00A0"}
                        </p>
                      </div>
                    </div>
                    <div className="user-profile-btn">
                      <Button className="update-button" text="Update Profile" />
                      <Button
                        className="change-password-button"
                        text="Change Password"
                        onClick={changePasswordHandler}
                      />
                    </div>
                  </div>
                </div>
              </form>
              <div className="user-address">
                <hr className="line" />
                <h3> My Address Book</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
