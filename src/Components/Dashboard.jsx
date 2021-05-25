import React, { useContext, useState } from "react";
import swal from "sweetalert";
import UserStore from "../Store";
import kitten from "../assets/img/kitten.jpg";
import fire from "../Firebase";
import Todo from "./Todo";
import { Helmet } from "react-helmet";

import todo from "../assets/img/todo.png";

function Dashboard() {
  const { userData, setUserData } = useContext(UserStore);
  const [name, setName] = useState(
    userData.data.displayName ? userData.data.displayName : "User"
  );
  //console.log(userData);
  const [files, setFiles] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateProfileModal = async () => {
    try {
      let user = fire.auth().currentUser;
      let childRef = "images";
      if (!files) return swal("Please select a file", "", "error");
      setUploading(true);
      let file = files[0];
      let storageRef = fire.storage().ref(`${childRef}/${file.name}`);
      let metaData = {
        contentType: "images/jpeg",
      };
      storageRef
        .put(file, metaData)
        .then((response) => {
          let progress =
            (response.bytesTransferred / response.totalBytes) * 100;
          setProgress(progress);

          response.ref.getDownloadURL().then((downloadURL) => {
            user
              .updateProfile({
                displayName: name,
                photoURL: downloadURL,
              })

              .then(() => {
                swal("Profile updated successfully", "", "success");
                setUploading(false);
                user = fire.auth().currentUser;

                setUserData({
                  ...userData,
                  data: user,
                });
              });
          });
        })
        .catch((error) => swal(error.message, "Try again later", "error"));
    } catch (error) {
      swal(error.message);
    }
  };

  return (
    <div className="d-flex flex-sm-row flex-column justify-content-sm-evenly justify-content-between">
       <Helmet>
        <link rel="icon" type="image/jpg" href={todo} sizes="16x16" />
        <title>Dashboard - {name}</title>
        <meta name="description" content="Free Web tutorials" />
        <meta name="keywords" content="HTML, CSS, JavaScript" />
        <meta name="author" content="Arnab Bhakta" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className="align-self-center card" style={{ maxWidth: "35%" , fontSize: "auto"}}>
        <img
          src={userData.data.photoURL ? userData.data.photoURL : kitten}
          className="card-img-top"
          alt={""}
        />
        <div className="card-body text-center">
          <p className="card-text">
            Hello, <strong>{name}</strong>
          </p>
          <p>
            {userData.data.email}{" "}
            {userData.data.emailVerified ? (
              <span className="badge rounded-pill bg-success">Verified</span>
            ) : (
              <span className="badge rounded-pill bg-warning text-dark">
                Unverified
              </span>
            )}
          </p>
          <button
            className="btn btn-outline-dark"
            data-bs-toggle="modal"
            data-bs-target="#updateProfileModal"
          >
            Update profile
          </button>
        </div>
      </div>
      <div
        className="modal fade"
        id="updateProfileModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update your details here
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Update image
                </label>
                <input
                  accept="image/png, image/jpeg"
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              {uploading ? (
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {progress}%
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="modal-footer">
              <button
                onClick={updateProfileModal}
                type="button"
                className="btn btn-success"
              >
                Update profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <Todo/>
    </div>
  );
}

export default Dashboard;
