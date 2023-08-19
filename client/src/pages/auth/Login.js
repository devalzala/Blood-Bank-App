import React from "react";
import Form from "../../components/Shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/Shared/Spinner";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <>
      {error && alert(error)}
      
      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col-md-8 form-banner">
            <img src="./assets/images/banner1.jpg" alt="loginImage" />
          </div>
          <div className="col-md-4 form-container">
            <Form
              submitButton="Login"
              formTitle="Login Page"
              formType="login"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
