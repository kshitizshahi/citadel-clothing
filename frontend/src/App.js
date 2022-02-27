import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./routes/PrivateRoute";
import { getUser } from "./redux/thunkApi/userApi";
import { validateUser } from "./redux/thunkApi/authApi";
import { useEffect } from "react";
import Loading from "./components/Loading";
import HomePage from "./pages/HomePage";

function App() {
  const { isLoggedIn, loading } = useSelector((state) => state.authUser);
  // const { isLoggedIn } = user;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateUser({}));
  }, []);

  if (loading) {
    // navigate("/login");
    // return (
    //   <div>
    //     <Loading />
    //   </div>
    // );
  }

  return (
    <Router>
      <div className="App">
        <NavBar />
        {/* style={{ minHeight: window.innerHeight }} */}
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* {!isLoggedIn && ( */}
            <>
              <Route path="/login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
            </>
            {/* )} */}

            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<UserProfile />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
