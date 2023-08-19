import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <>
      <nav className="navbar d-flex align-items-center">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <BiSolidDonateBlood color="red" /> Blood Bank App
          </Link>

          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">
                Welcome{" "}
                {user &&
                  (user.name || user.hospitalName || user.organizationName)}
                <span
                  className="badge badge-pill ms-2"
                  style={{ background: "#dc3545" }}
                >
                  {user && user.role}
                </span>
              </p>
            </li>
            {location.pathname === "/" ||
            location.pathname === "/donar" ||
            location.pathname === "/hospital" ? (
              <li className="nav-item mx-3">
                <Link to="/analytics" className="nav-link">
                  Analytics
                </Link>
              </li>
            ) : (
              <li className="nav-item mx-3">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
            )}
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={logoutHandler}>
                <FiLogOut /> Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
