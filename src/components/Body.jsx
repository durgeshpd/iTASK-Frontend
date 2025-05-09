import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../redux/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();  // Get the current route path
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);  // Store user data

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(res.data));
      setUser(res.data);  // Store user data
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");  // Redirect to login if not authorized
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Determine if the current route is '/login'
  const isLoginPage = location.pathname === "/login";

  // If the page is not login, the sidebar is shown
  const shouldRenderSidebar = !isLoginPage;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="loader">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {shouldRenderSidebar && <Sidebar />} {/* Only show Sidebar if not on the login page */}
        <div className="flex-1 p-4 overflow-y-auto bg-base-100 text-base-content transition-colors duration-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Body;
