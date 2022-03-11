import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Login_Page_Title } from "../utils/PageTitle";
import { loginUser } from "../redux/thunkApi/authApi";
import { useNavigate } from "react-router-dom";
import "../styles/login.scss";
import { toast } from "react-toastify";
import Button from "../components/Button";
import { PUBLIC_URL } from "../utils/BaseUrl";
import { useForm } from "react-hook-form";

const LogIn = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, message, isLoggedIn } = useSelector(
    (state) => state.authUser
  );

  const submitHandler = (data) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    document.title = Login_Page_Title;
    if (isLoggedIn) {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/");
      // setTimeout(() => navigate("/"), 2000);
    }

    if (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [isLoggedIn, error]);

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
                {...register("email", { required: true, maxLength: 30 })}
                // required
                // onChange={(e) => setEmail(e.target.value)}
              ></input>
              {errors.email?.type === "required" && <p>Email is required.</p>}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                {...register("password", { required: true, maxLength: 30 })}

                // required
                // onChange={(e) => setPassword(e.target.value)}
              ></input>
              {errors.password && <p>Please enter password.</p>}
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
            {/* {error && (
              <div>
                <label>{error.message}</label>
              </div>
            )} */}
            {/* {isLoggedIn && (
            <div>
              <label>{message}</label>
            </div>
          )} */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
