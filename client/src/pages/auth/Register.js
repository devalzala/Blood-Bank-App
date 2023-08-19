import React from "react";
import Form from "../../components/Shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/Shared/Spinner";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <>
      {error && alert(error)}

      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col-md-8 form-banner">
            <img src="./assets/images/banner2.jpg" alt="loginImage" />
          </div>
          <div className="col-md-4 form-container">
            <Form
              submitButton="Register"
              formTitle="Register Page"
              formType="register"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
