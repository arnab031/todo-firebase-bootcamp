import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import fire from "../Firebase";
import UserStore from "../Store";
import { Helmet } from "react-helmet";
import swal from "sweetalert";

import todo from "../assets/img/todo.png";

function Login() {
  const { userData, setUserData } = useContext(UserStore);

  const [loading, setLoading] = useState(false);

  const loginHandler = async () => {
    setLoading(true);
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      setLoading(false);
      return;
    }
    try {
      const userCredentials = await fire
        .auth()
        .signInWithEmailAndPassword(email, password);
      setLoading(false);
      setUserData({
        ...userData,
        auth: true,
        data: userCredentials.user,
      });
      localStorage.setItem("userData", JSON.stringify(userCredentials.user));
      
    } catch (error) {
      setLoading(false);
      swal(error.message, "", "error");
      console.log(error.message);
    }
  };

  return (
    <div className="shadow p-3 mb-5 bg-body rounded">
      <Helmet>
        <link rel="icon" type="image/jpg" href={todo} sizes="16x16" />
        <title>Login - Todo App</title>
        <meta name="description" content="Free Web tutorials" />
        <meta name="keywords" content="HTML, CSS, JavaScript" />
        <meta name="author" content="Arnab Bhakta" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
          <div className="d-flex justify-content-end">
            <span className="form-text mx-4">
              Forget password? <Link to="/reset-password">Reset here</Link>
            </span>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={loginHandler}
          >
            Login{" "}
            {loading ? (
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              ""
            )}
          </button>
          <span className="form-text mx-4">
            Don't have any account?<Link to="/">Sign Up</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
