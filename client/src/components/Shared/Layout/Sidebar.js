import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/Layout.css";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const isActive = location.pathname;

  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          
          {(() => {
            switch (user && user.role) {
              case "admin":
                return (
                  <>
                    <div
                      className={`menu-item ${
                        isActive === "/donar-list" && "active"
                      }`}
                    >
                      <i className="fa-solid fa-warehouse" />
                      <Link to="/donar-list">Donar List</Link>
                    </div>

                    <div
                      className={`menu-item ${
                        isActive === "/hospital-list" && "active"
                      }`}
                    >
                      <i className="fa-solid fa-hand-holding-medical" />
                      <Link to="/hospital-list">Hospital List</Link>
                    </div>

                    <div
                      className={`menu-item ${
                        isActive === "/org-list" && "active"
                      }`}
                    >
                      <i className="fa-regular fa-hospital"></i>
                      <Link to="/org-list">Organization List</Link>
                    </div>
                  </>
                );

              case "organization":
                return (
                  <>
                    <div
                      className={`menu-item ${isActive === "/" && "active"}`}
                    >
                      <i className="fa-solid fa-warehouse" />
                      <Link to="/">Inventory</Link>
                    </div>

                    <div
                      className={`menu-item ${
                        isActive === "/donar" && "active"
                      }`}
                    >
                      <i className="fa-solid fa-hand-holding-medical" />
                      <Link to="/donar">Donar</Link>
                    </div>

                    <div
                      className={`menu-item ${
                        isActive === "/hospital" && "active"
                      }`}
                    >
                      <i className="fa-regular fa-hospital"></i>
                      <Link to="/hospital">Hospital</Link>
                    </div>
                  </>
                );

              case "donar":
                return (
                  <>
                    <div
                      className={`menu-item ${
                        isActive === "/organization" && "active"
                      }`}
                    >
                      <i className="fa-solid fa-sitemap" />
                      <Link to="/organization">Organization</Link>
                    </div>

                    <div
                      className={`menu-item ${
                        isActive === "/donation" && "active"
                      }`}
                    >
                      <i className="fa-solid fa-sitemap" />
                      <Link to="/donation">Donation</Link>
                    </div>
                  </>
                );

              case "hospital":
                return (
                  <>
                    <div
                      className={`menu-item ${
                        isActive === "/organization" && "active"
                      }`}
                    >
                      <i className="fa-solid fa-sitemap" />
                      <Link to="/organization">Organization</Link>
                    </div>

                    <div
                      className={`menu-item ${
                        isActive === "/consumer" && "active"
                      }`}
                    >
                      <i className="fa-solid fa-sitemap" />
                      <Link to="/consumer">Consumers</Link>
                    </div>
                  </>
                );

              default:
                return null;
            }
          })()}

          {/* {userMenu.map((menu, index) => {
            const isActive = location.pathname === menu.path;
            return (
              <div className={`menu-item ${isActive && "active"}`} key={index}>
                <i>{menu.icon}</i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
