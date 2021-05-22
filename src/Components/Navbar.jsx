import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserStore from "../Store";
import fire from "../Firebase";

function Navbar() {
  const { userData, setUserData } = useContext(UserStore);

  const signOut = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        setUserData({
          ...userData,
          auth: false,
          data: null,
        });
        localStorage.removeItem("userData");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light navbar-right"
      style={{ backgroundColor: "#14D362" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Todo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            {userData.auth ? (
              <Link onClick={signOut} className="nav-link" to="/">
                Sign Out
              </Link>
            ) : (
              <Link className="nav-link" to="/login">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
