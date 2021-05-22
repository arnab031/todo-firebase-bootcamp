import React, {useState} from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import fire from "../Firebase";

function ResetPass() {
  const auth = fire.auth();
  const [loading, setLoading] = useState(false);

  const resetHandler = async () => {
    setLoading(true);
    const emailAddress = document.getElementById("email").value;
    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function () {
        swal("Email has sent!", "", "success");
        setLoading(false);
      })
      .catch(function (error) {
        swal(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="shadow p-3 mb-5 bg-body rounded">
      <div className="card">
        <div className="card-header">Reset your password here</div>
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
          <button
            type="submit"
            onClick={resetHandler}
            className="btn btn-warning"
          >
            Reset Password{" "}
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
            Don't have account? <Link to="/">Sign Up</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ResetPass;
