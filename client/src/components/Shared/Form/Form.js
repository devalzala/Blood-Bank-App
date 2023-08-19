import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ submitButton, formTitle, formType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    if (formType === "login") {
      handleLogin(e, email, password, role);
    } else if (formType === "register") {
      handleRegister(
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
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">{formTitle}</h1>
        <hr />

        <div className="d-flex mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label className="form-check-label">Donar</label>
          </div>

          <div className="form-check ms-2">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label className="form-check-label">Admin</label>
          </div>

          <div className="form-check ms-2">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label className="form-check-label">Hospital</label>
          </div>

          <div className="form-check ms-2">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="organizationRadio"
              value={"organization"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label className="form-check-label">Organization</label>
          </div>
        </div>

        {/* switch statement */}
        {(() => {
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    name="email"
                    labelText="Email Address"
                    labelFor="forEmail"
                    inputType="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />

                  <InputType
                    name="password"
                    labelText="Password"
                    labelFor="forPassword"
                    inputType="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </>
              );
            }

            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <InputType
                      name="name"
                      labelText="Name"
                      labelFor="forName"
                      inputType="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  )}

                  {role === "organization" && (
                    <InputType
                      name="organizationName"
                      labelText="Organization Name"
                      labelFor="forOrganizationName"
                      inputType="text"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      placeholder="Enter your organization name"
                    />
                  )}
                  
                  <InputType
                    name="email"
                    labelText="Email Address"
                    labelFor="forEmail"
                    inputType="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />

                  <InputType
                    name="password"
                    labelText="Password"
                    labelFor="forPassword"
                    inputType="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />

                  {role === "hospital" && (
                    <InputType
                      name="hospitalName"
                      labelText="Hospital Name"
                      labelFor="forHospitalName"
                      inputType="text"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      placeholder="Enter your hospital name"
                    />
                  )}

                  <InputType
                    name="website"
                    labelText="Website"
                    labelFor="forWebsite"
                    inputType="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Enter your website"
                  />

                  <InputType
                    name="address"
                    labelText="Address"
                    labelFor="forAddress"
                    inputType="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                  />

                  <InputType
                    name="phone"
                    labelText="Phone"
                    labelFor="forPhone"
                    inputType="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone"
                  />
                </>
              );
            }

            default:
              break;
          }
        })()}

        <div className="d-flex justify-content-between">
          {formType === "login" ? (
            <p>
              <Link to="/register" className="text-decoration-none">
                Not registered yet ? Register
              </Link>
            </p>
          ) : (
            <p>
              <Link to="/login" className="text-decoration-none">
                Already registered ? Login
              </Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitButton}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
