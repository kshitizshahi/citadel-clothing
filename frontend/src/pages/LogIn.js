import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Login_Page_Title } from "../utils/PageTitle";
import { loginUser } from "../redux/thunkApi/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import { PUBLIC_URL } from "../utils/BaseUrl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../styles/login.scss";

const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email address.")
      .required("This field is required."),
    password: yup.string().required("This field is required."),
  })
  .required();

const LogIn = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  let redirect;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn } = useSelector((state) => state.authUser);

  if (location.search && location.search.includes("redirect")) {
    redirect = location.search.split("=")[1];
  } else {
    redirect = "/";
  }

  // const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = (data) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    document.title = Login_Page_Title;
    if (isLoggedIn) {
      navigate(redirect);
      // setTimeout(() => navigate("/"), 2000);
    }
  }, [isLoggedIn, redirect]);

  useEffect(() => {
    if (location.search && location.search.includes("success")) {
      const message = decodeURI(location.search.split("=")[1]);
      toast.success(message);
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="login-container">
          <div className="image-container">
            <img src={`${PUBLIC_URL}/images/login.jpg`} alt="login-image" />
          </div>
          <div className="form-container">
            <div className="heading">
              <h1>Log In</h1>
            </div>
            <div>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                // value={email}
                {...register("email")}
              />

              <p className="error">{errors.email?.message || "\u00A0"}</p>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                {...register("password")}
              />
              <p className="error">{errors.password?.message || "\u00A0"}</p>
            </div>
            <div>
              <Button className="login-button" text="Login" />
            </div>

            <div>
              <p className="redirect">
                New Customer?{" "}
                <Link className="link" to={`/register`}>
                  Create your account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
