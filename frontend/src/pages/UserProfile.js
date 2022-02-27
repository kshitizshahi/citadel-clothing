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
import Loading from "../components/Loading";
import { clearError } from "../redux/slice/userSlice";
import { resetSuccess } from "../redux/slice/authSlice";

const UserProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userImage, setUserImage] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userUpdate, loading, error, isValid } = useSelector(
    (state) => state.User
  );
  const {
    userInfo,
    fetchSuccess,
    loading: loadingUser,
  } = useSelector((state) => state.authUser);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      updateUser({ firstName, lastName, email, phoneNumber, userImage })
    );
    // dispatch(resetSuccess());
  };

  const changePasswordHandler = (e) => {
    navigate("/change-password");
  };

  // useEffect(() => {
  //   document.title = Profile_Page_Title;

  //success value is toggled after update success

  //   if (error && error.message) {
  //     dispatch(logoutUser({}));
  //     dispatch(clearError());
  //   } else if (userUpdate && userUpdate.data) {
  //     dispatch(validateUser({}));
  //     toast.success(userUpdate.message, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }

  //   if (userInfo && fetchSuccess) {
  //     setFirstName(userInfo.firstName);
  //     setLastName(userInfo.lastName);
  //     setEmail(userInfo.email);
  //     setPhoneNumber(userInfo.phoneNumber);
  //     setUserImage(userInfo.profileImage);
  //   }
  // }, [success, isValid, loaded]);

  useEffect(() => {
    document.title = Profile_Page_Title;

    if (error && error.message) {
      dispatch(logoutUser({}));
      dispatch(clearError());
    } else if (userUpdate && userUpdate.data) {
      toast.success(userUpdate.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (userInfo && fetchSuccess) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setEmail(userInfo.email);
      setPhoneNumber(userInfo.phoneNumber);
      // setUserImage(userInfo.profileImage);
    }
  }, [isValid, fetchSuccess]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        // height="60vh"
        <div className="user-profile-container">
          <div className="user-profile-nav">
            <UserNav profile="profile" />
          </div>
          <div className="form-container">
            <div className="user-address-container">
              <form onSubmit={submitHandler} encType="multipart/form-data">
                <div className="user-profile-form">
                  <div className="profile-image">
                    {userInfo && (
                      <img
                        // src={`${BASE_URL}/uploads/${userInfo.data.profileImage}`}
                        src={`${BASE_URL}/uploads/${userInfo.profileImage}`}
                        alt="Profile Picture"
                      />
                    )}

                    <label htmlFor="imageChange" className="image-change">
                      Change Image
                    </label>
                    <input
                      type="file"
                      id="imageChange"
                      accept=".png, .jpg, .jpeg"
                      // required
                      className="profile-image-input"
                      onChange={(e) => setUserImage(e.target.files[0])}
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
                          value={firstName}
                          // required
                          onChange={(e) => setFirstName(e.target.value)}
                        ></input>
                      </div>
                      <div className="last-name-container">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          placeholder="Last Name"
                          value={lastName}
                          // required
                          onChange={(e) => setLastName(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div className="other-form-fields">
                      <div>
                        <label htmlFor="emailAddress">Email Addresss</label>
                        <input
                          type="email"
                          id="emailAddress"
                          placeholder="Email address"
                          value={email}
                          // required
                          onChange={(e) => setEmail(e.target.value)}
                        ></input>
                      </div>
                      <div>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          placeholder="Phone Number"
                          value={phoneNumber}
                          // required
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        ></input>
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
