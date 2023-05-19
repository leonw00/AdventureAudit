import "./index.css";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { checkLoggedIn } from "./utils/socialValidate";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to home only when logged in
    if (!checkLoggedIn()) {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<MainPage />} />
      </Routes>
    </div>
  );
};

export default App;
