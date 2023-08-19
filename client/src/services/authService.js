import { toast } from "react-toastify";
import { userLogin, userRegister } from "../redux/reducers/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();

  try {
    if (!role || !email || !password) {
      toast.error("Please provide all fields");
    } else {
      store.dispatch(
        userLogin({
          role,
          email,
          password,
        })
      );
    }
  } catch (error) {
    console.log(error, "handlelogin function");
  }
};

export const handleRegister = (
  e,
  name,
  email,
  password,
  role,
  organizationName,
  hospitalName,
  website,
  address,
  phone
) => {
  e.preventDefault();

  try {
    if (
      !email ||
      !password ||
      !role ||
      !address ||
      !phone
    ) {
      toast.error("Please provide all fields");
    } else {
      store.dispatch(
        userRegister({
          name,
          email,
          password,
          role,
          organizationName,
          hospitalName,
          website,
          address,
          phone,
        })
      );
    }
  } catch (error) {
    console.log(error, "handleRegister function");
  }
};
