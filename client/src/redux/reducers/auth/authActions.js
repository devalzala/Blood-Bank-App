import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

// login

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", {
        role,
        email,
        password,
      });

      if (data?.success) {
        localStorage.setItem("token", data.token);
        toast.success("User Login Successfully");
        window.location.replace("/");
      }

      return data;
    } catch (error) {
      console.log(error, "Error in login api");
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// register

export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      email,
      password,
      role,
      organizationName,
      hospitalName,
      website,
      address,
      phone,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
        role,
        organizationName,
        hospitalName,
        website,
        address,
        phone,
      });

      if (data?.success) {
        alert("User Registered Successfully");
        toast.success("User Registered Successfully");
        window.location.replace("/login");
      }
    } catch (error) {
      console.log(error, "Error in register api");
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// current user

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async ({ rejectWithValue }) => {
    try {
      const res = await API.get("/auth/current-user");

      if (res && res.data) {
        return res.data;
      }
    } catch (error) {
      console.log(error, "Error in getting current user");
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
