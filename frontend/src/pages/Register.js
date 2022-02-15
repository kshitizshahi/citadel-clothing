import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/userActions";
import "../styles/register.scss";
import { Register_Page_Title } from "../utils/PageTitle";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, error } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      register(
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword
      )
    );
  };
  useEffect(() => {
    document.title = Register_Page_Title;
  }, []);
  return (
    <div className="register-container">
      <div className="image-container">
        <img
          className="image"
          src="/images/daniel-roe-lpjb_UMOyx8-unsplash.jpg"
        />
      </div>
      <div className="register-form-container">
        <form className="form" onSubmit={submitHandler}>
          <div className="heading">
            <h1>Create Account</h1>
          </div>
          <div className="register-form-spacing">
            <div className="flex-container">
              <div className="first-name-container">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
              <div className="last-name-container">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  required
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
                  required
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  pattern="\d{10}$"
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Re-enter password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              <button className="register-button" type="submit">
                Create Account
              </button>
            </div>
            <div>
              <p className="redirect">
                Already have account?{" "}
                <Link className="link" to={`/login`}>
                  Log In
                </Link>
              </p>
            </div>
            <div>
              <label>{error}</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
