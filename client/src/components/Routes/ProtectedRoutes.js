import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../redux/reducers/auth/authActions";
import { Navigate } from "react-router-dom";
import API from "../../services/API";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();

  //get current user
  const getUser = async () => {
    try {
      const { data } = await API.get("/auth/current-user");

      if (data && data.success) {
        dispatch(getCurrentUser(data));
      }
    } catch (error) {
      localStorage.clear();
      console.log(error, "get user error protected routes");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
