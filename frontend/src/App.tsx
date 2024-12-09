import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Register from "./auth/register";
import Login from "./auth/login";
import ForgotPasswordWithLinks from "./auth/ForgotPassword";
import { ToastContainer } from "react-toastify";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute
              element={<Homepage />}
              restricted={true}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={<Dashboard />}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasswordWithLinks />} />
      </Routes>
    </Router>
  );
};

export default App;
