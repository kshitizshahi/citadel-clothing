import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import RegisterScreen from "./screens/RegisterScreen";
import SignInScreen from "./screens/SignInScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
