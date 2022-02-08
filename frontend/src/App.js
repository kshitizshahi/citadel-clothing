import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import RegisterScreen from "./screens/RegisterScreen";
import LogInScreen from "./screens/LogInScreen";
import UserProfileScreen from "./screens/UserProfileScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/login" element={<LogInScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<UserProfileScreen />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
