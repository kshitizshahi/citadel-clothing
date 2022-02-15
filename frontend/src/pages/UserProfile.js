import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../styles/userProfile.scss";
import { Profile_Page_Title } from "../utils/PageTitle";
import UserNav from "../components/UserNav";

const UserProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userImage, setUserImage] = useState([]);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const submitHandler = async (e) => {
    e.preventDefault();
    const userId = userInfo.data._id;
    const formdata = new FormData();
    formdata.append("profileImage", userImage);

    const { data } = await axios.put(
      `${BASE_URL}/api/users/change-profile/${userId}`,
      formdata,
      {
        withCredentials: true,
      }
    );

    // const response = await axios.get(`${BASE_URL}/api/users/token`, {
    //   withCredentials: true,
    // });

    // console.log("Access token get reguest", response);

    localStorage.setItem("userInfo", JSON.stringify(data));
  };

  const changePasswordHandler = () => {
    navigate("/change-password");
  };

  useEffect(() => {
    document.title = Profile_Page_Title;
  }, []);

  return (
    <div className="user-profile-container">
      <div className="user-profile-nav">
        <UserNav />
      </div>
      <div className="form-container">
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div className="user-profile-form">
            <div className="profile-image">
              <img
                src={`${BASE_URL}/uploads/${userInfo.data.profileImage}`}
                alt="Profile Picture"
              />
              <label htmlFor="imageChange">Change Image</label>
              <input
                type="file"
                id="imageChange"
                accept=".png, .jpg, .jpeg"
                required
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
                    // required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  ></input>
                </div>
                {/* <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    // required
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Re-enter password"
                    // required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></input>
                </div> */}
              </div>
              <div>
                <button className="update-button" type="submit">
                  Update Profile
                </button>
                <button
                  className="change-password-button"
                  onClick={(e) => changePasswordHandler()}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
