import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserStore from "../Store";
import fire from "../Firebase";
import todo from "../assets/img/todo.png";

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
        localStorage.removeItem("userTodos");
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
          <img
            src={todo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
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
              <Link
                onClick={signOut}
                className="nav-link fa fa-sign-out"
                to="/"
              >
                {" "}
                Sign Out
              </Link>
            ) : (
              <Link className="nav-link fa fa-sign-in" to="/login">
                {" "}
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
