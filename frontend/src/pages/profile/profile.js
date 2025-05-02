import React, { useState } from "react";
import "./profile.css";
import profileImage from "../../assets/images/profile-4.jpg";
import { useSelector } from "react-redux";
import { getUserSelectors } from "../../selectors/selectors";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import Model from "../../components/model/model";

function Profile() {
  const [showModel, setShowModal] = React.useState(false);
  const user = useSelector(getUserSelectors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleModalOpen = () => {
    setShowModal(true);
  };
  const handleLogout = () => {
    dispatch(logout());
    handleModalClose();
    navigate("/");
  };

  return (
    <div className="profile">
      <h1>Profile Page</h1>
      <div className="user-profile">
        <h2>User Information</h2>
        <img
          src={profileImage}
          alt="Profile"
          style={{ borderRadius: "50%", marginBottom: "20px", width: 160 }}
        />
        <p>
          <strong>Name: </strong>
          {user.Name}{" "}
        </p>
        <p>
          <strong>Email: </strong>
          {user.Email}{" "}
        </p>
        <p>
          <strong>Country: </strong>
          {user.Country}
        </p>

        <div className="user-profile-button">
          <button className="logout-btn" onClick={() => handleModalOpen()}>
            Logout
          </button>
        </div>
        {showModel && (
          <Model>
            <div className="model-content">
              <h2>Are you sure you want to logout?</h2>
              <div className="model-buttons">
                <button
                  className="model-button confirm-btn"
                  onClick={handleLogout}
                >
                  Yes
                </button>
                <button
                  className="model-button cencel-btn"
                  onClick={handleModalClose}
                >
                  No
                </button>
              </div>
            </div>
          </Model>
        )}
      </div>
    </div>
  );
}

export default Profile;
