import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";

const SignInScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    document.title = "Login Page";
    // if (userInfo) {
    //   props.history.push("/");
    // }
    // }, [props.history, userInfo]);
  }, []);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Log In</h1>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
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
          <label />
          <button type="submit">Sign In</button>
        </div>
        <div>
          <label />
          <div>
            New Customer? <Link to={`/register`}>Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInScreen;
