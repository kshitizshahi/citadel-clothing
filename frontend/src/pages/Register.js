import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/register.scss";
import { Register_Page_Title } from "../utils/PageTitle";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/thunkApi/authApi";
import { PUBLIC_URL } from "../utils/BaseUrl";
import { Switch } from "@mantine/core";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Register = () => {
  const [isSeller, setIsSeller] = useState(false);

  const registerSchema = yup
    .object({
      firstName: yup.string().required("This field is required."),
      lastName: yup.string().required("This field is required."),
      email: yup
        .string()
        .email("Invalid email address.")
        .required("This field is required."),

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
    })
    .required();

  const {
    register,
    handleSubmit,
    getValues,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, loading } = useSelector((state) => state.authUser);

  const submitHandler = (data) => {
    (async function () {
      const response = await dispatch(
        registerUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
          confirmPassword: data.confirmPassword,
          isSeller: isSeller,
        })
      );

      if (response.payload.data) {
        navigate("/login");
      }
    })();
  };
  useEffect(() => {
    document.title = Register_Page_Title;
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (location.search && location.search.includes("error")) {
      const message = decodeURI(location.search.split("=")[1]);
      toast.error(message);
    }
  }, []);

  return (
    <div className="register-container">
      <div className="image-container">
        <img
          className="image"
          src={`${PUBLIC_URL}/images/daniel-roe-lpjb_UMOyx8-unsplash.jpg`}
          alt="register-image"
        />
      </div>
      <div className="register-form-container">
        <form className="form" onSubmit={handleSubmit(submitHandler)}>
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
                  {...register("firstName")}
                ></input>
                <p className="error">{errors.firstName?.message || "\u00A0"}</p>
              </div>
              <div className="last-name-container">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  {...register("lastName")}
                ></input>
                <p className="error">{errors.lastName?.message || "\u00A0"}</p>
              </div>
            </div>
            <div className="form-fields">
              <div className="input-fields">
                <div>
                  <label htmlFor="emailAddress">Email Addresss</label>
                  <input
                    type="email"
                    id="emailAddress"
                    placeholder="Email address"
                    {...register("email")}
                  ></input>
                  <p className="error">{errors.email?.message || "\u00A0"}</p>
                </div>
                <div>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    // pattern="\d{10}$"
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
                    placeholder="Enter password"
                    {...register("password")}
                  ></input>
                  <p className="error">
                    {errors.password?.message || "\u00A0"}
                  </p>
                </div>
                <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Re-enter password"
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
                  onChange={(e) => setIsSeller(e.currentTarget.checked)}
                  label="Seller"
                  size="sm"
                />
              </div>
            </div>
            <div>
              <Button
                className="register-button"
                text="Create Account"
                disabled={loading}
              />
            </div>
            <div>
              <p className="redirect">
                Already have an account?{" "}
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

export default Register;
