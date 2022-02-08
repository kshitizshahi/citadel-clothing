import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const UserProfileScreen = () => {
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

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const submitHandler = async (e) => {
    e.preventDefault();
    const userId = userInfo._id;
    const formdata = new FormData();
    formdata.append("profileImage", userImage);

    const { data } = await axios.put(
      `${BASE_URL}/api/users/change-profile/${userId}`,
      formdata
    );

    localStorage.setItem("userInfo", JSON.stringify(data));
  };

  useEffect(() => {
    document.title = "Profile Page";
    // if (userInfo) {
    //   props.history.push("/");
    // }
    // }, [props.history, userInfo]);
  }, []);

  return (
    <div style={{ maxWidth: "50%", marginInline: "auto" }}>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <div className="form-spacing">
          <div>
            <img
              style={{
                height: "100px",
                width: "100px",
                // border: "1px solid grey",
                // backgroundColor: "cyan",
                objectFit: "cover",
                borderRadius: "50%",
                boxSizing: "border-box",
                // padding: "10px",
              }}
              src={`${BASE_URL}/uploads/${userInfo.profileImage}`}
              // src="/images/default-profile.png"
            />
            <label htmlFor="imageChange">Change Image</label>
            <input
              type="file"
              id="imageChange"
              accept=".png, .jpg, .jpeg"
              required
              className="image-input"
              onChange={(e) => setUserImage(e.target.files[0])}
            ></input>
          </div>
          <br />
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
          <div className="form-fields">
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
            <div>
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
            </div>
          </div>
          <div>
            <button className="button" type="submit">
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfileScreen;
