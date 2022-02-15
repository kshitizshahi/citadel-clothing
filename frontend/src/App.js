import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <main
                style={{
                  padding: "1rem",
                  backgroundColor: "burlywood",
                  height: "50vh",
                }}
              >
                <p>Home Page</p>
              </main>
            }
          />
          {/* {!userInfo && ( */}
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
