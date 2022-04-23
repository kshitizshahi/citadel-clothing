import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/userProfile.scss";
import { Profile_Page_Title } from "../utils/PageTitle";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { updateUser } from "../redux/thunkApi/userApi";
import { logoutUser, validateUser } from "../redux/thunkApi/authApi";
import { BASE_URL } from "../utils/BaseUrl";
import { clearError, clearuserUpdate } from "../redux/slice/userSlice";
import LoadingDots from "../components/Loading";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { saveShippingAddress } from "../redux/slice/productSlice";

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

  const addressSchema = yup
    .object({
      address: yup.string().required("This field is required."),
      city: yup.string().required("This field is required."),
      country: yup.string().required("This field is required."),
      postalCode: yup
        .string()
        .required("This field is required.")
        .matches(/^[1-9]+[0-9]*$/, "Invalid postal code.")
        .test(
          "length",
          "Postal Code must be 5 digits.",
          (value) => value.length === 5
        ),
    })
    .required();

  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    getValues,
    watch,
    setValue: setValueUser,

    formState: { errors: errorsUser },
  } = useForm({
    resolver: yupResolver(updateUserSchema),
  });

  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    setValue: setValueAddress,

    formState: { errors: errorsAddress },
  } = useForm({
    resolver: yupResolver(addressSchema),
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

  const { shippingAddress } = useSelector((state) => state.Product);

  const saveShipping = (data) => {
    dispatch(
      saveShippingAddress({
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
      })
    );
    toast.success("Shipping Address Saved");
  };

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
  };

  const changePasswordHandler = (e) => {
    navigate("/change-password");
  };

  useEffect(() => {
    document.title = Profile_Page_Title;

    if (userInfo && fetchSuccess) {
      setValueUser("firstName", userInfo.firstName);
      setValueUser("lastName", userInfo.lastName);
      setValueUser("email", userInfo.email);
      setValueUser("phoneNumber", userInfo.phoneNumber);
      setImage(userInfo.profileImage);
    }

    if (shippingAddress) {
      setValueAddress("address", shippingAddress.address);
      setValueAddress("city", shippingAddress.city);
      setValueAddress("postalCode", shippingAddress.postalCode);
      setValueAddress("country", shippingAddress.country);
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
                onSubmit={handleSubmitUser(submitHandler)}
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
                      {errorsUser.userImage?.message || "\u00A0"}
                    </p>
                    <input
                      type="file"
                      id="imageChange"
                      accept=".png, .jpg, .jpeg"
                      className="profile-image-input"
                      {...registerUser("userImage")}
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
                          {...registerUser("firstName")}
                        ></input>
                        <p className="error">
                          {errorsUser.firstName?.message || "\u00A0"}
                        </p>
                      </div>
                      <div className="last-name-container">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          placeholder="Last Name"
                          {...registerUser("lastName")}
                        ></input>
                        <p className="error">
                          {errorsUser.lastName?.message || "\u00A0"}
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
                          {...registerUser("email")}
                        ></input>
                        <p className="error">
                          {errorsUser.email?.message || "\u00A0"}
                        </p>
                      </div>
                      <div>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          placeholder="Phone Number"
                          {...registerUser("phoneNumber")}
                        ></input>
                        <p className="error">
                          {errorsUser.phoneNumber?.message || "\u00A0"}
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
                <div className="shipping-address-container">
                  <div className="ship-container">
                    <form onSubmit={handleSubmitAddress(saveShipping)}>
                      <div>
                        <label htmlFor="address">Addresss</label>
                        <input
                          type="text"
                          id="address"
                          placeholder="Your Street Name or Address"
                          {...registerAddress("address")}
                        ></input>
                        <p className="error">
                          {errorsAddress.address?.message || "\u00A0"}
                        </p>
                      </div>
                      <div>
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          placeholder="Your City"
                          {...registerAddress("city")}
                        ></input>
                        <p className="error">
                          {errorsAddress.city?.message || "\u00A0"}
                        </p>
                      </div>
                      <div>
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                          type="text"
                          id="postalCode"
                          placeholder="Your Postal Code"
                          {...registerAddress("postalCode")}
                        ></input>
                        <p className="error">
                          {errorsAddress.postalCode?.message || "\u00A0"}
                        </p>
                      </div>
                      <div>
                        <label htmlFor="country">Country</label>
                        <input
                          type="text"
                          id="country"
                          placeholder="Your Country"
                          {...registerAddress("country")}
                        ></input>
                        <p className="error">
                          {errorsAddress.country?.message || "\u00A0"}
                        </p>
                      </div>
                      <div>
                        <Button
                          className="save-address-btn"
                          text="Save Address"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
