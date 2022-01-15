import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignInScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/users/sign_in", {
      email: email,
      password: password,
    });
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
  }, [props.history, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
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
