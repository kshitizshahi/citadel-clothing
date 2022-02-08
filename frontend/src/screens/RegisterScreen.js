import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/userActions";
import "../styles/register.css";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

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
  return (
    <div className="main-flex-container">
      <div className="image-container">
        <img
          className="image"
          src="/images/daniel-roe-lpjb_UMOyx8-unsplash.jpg"
        />
      </div>
      <div className="form-container">
        <form className="form" onSubmit={submitHandler}>
          <div className="heading">
            <h1>Create Account</h1>
          </div>
          <div className="form-spacing">
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
                  type="tel"
                  id="phoneNumber"
                  placeholder="Phone Number"
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
              <button className="button" type="submit">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
