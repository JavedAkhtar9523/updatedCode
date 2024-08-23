// import React, { Fragment, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import "./profileInfo.css";
// import ChangePassword from "./ChangePassword";

// const ProfileInfo = () => {
//   const { user, loading, isAuthenticated } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//     }
//   }, [navigate, isAuthenticated]);

//   return (
//     <Fragment>
//       <div className="profileContainer">
//         <div className="profileDetails">
//           <h1>My Profile</h1>
//           {user?.avatar && (
//             <img
//               src={user?.avatar[0]?.url}
//               alt={user.firstName}
//               className="profileImage"
//             />
//           )}
//           <Link to="/me/update" className="editProfileButton">
//             Edit Profile
//           </Link>
//         </div>
//         <div className="profileInfo">
//           <div className="infoItem">
//             <h4>Full Name</h4>
//             <p>
//               {user?.firstName} {user?.lastName}
//             </p>
//           </div>
//           <div className="infoItem">
//             <h4>Email</h4>
//             <p>{user?.email}</p>
//           </div>
//           <div className="infoItem">
//             <h4>Username</h4>
//             <p>{user?.username}</p>
//           </div>
//           <div className="infoItem">
//             <h4>Joined On</h4>
//             <p>{user?.createdAt ? String(user.createdAt).substr(0, 10) : ""}</p>
//           </div>
//           <div className="infoItem">
//             <h4>My Address</h4>
//             <p>{user?.address}</p>
//           </div>
//           <div className="changePasswordLink">
//             <Link
//               to="#"
//               data-bs-toggle="modal"
//               data-bs-target="#changePasswordModal"
//             >
//               Change Password
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Change Password Modal */}
//       <div
//         className="modal fade"
//         id="changePasswordModal"
//         tabIndex="-1"
//         aria-labelledby="changePasswordModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="changePasswordModalLabel">
//                 Change Password
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <ChangePassword user={user} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default ProfileInfo;

// -----------------------------------

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./profileInfo.css";
import ChangePassword from "./ChangePassword";
import defaultBanner from "../../assets/8.jpg";
import defaultAvatar from "../../assets/admin.png";

const ProfileInfo = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(user?.avatar[0]?.url || defaultAvatar);
  const [banner, setBanner] = useState(
    user?.coverImage[0]?.url || defaultBanner
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      // Here you would typically upload the file to your server
      // and update the user's avatar in your database
    }
  };
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBanner(URL.createObjectURL(file));
      // Here you would typically upload the file to your server
      // and update the user's banner in your database
    }
  };

  return (
    <Fragment>
      <div className="profileContainer">
        <div className="info-left" style={{ width: "40%" }}>
          <div className="info-banner_img">
            <div className="profile-banner">
              <img
                src={banner}
                alt="Banner"
                onClick={() => document.getElementById("banner-upload").click()}
                style={{
                  cursor: "pointer",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                style={{ display: "none" }}
                id="banner-upload"
              />
            </div>
            <div className="info-banner_profile">
              <img
                src={avatar}
                alt={user?.firstName}
                onClick={() => document.getElementById("avatar-upload").click()}
                style={{ cursor: "pointer" }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
                id="avatar-upload"
              />
            </div>
          </div>
          <div className="profile-data">
            <h1>
              {user?.firstName} {user?.lastName}
            </h1>
            <p>
              {user?.bio ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </p>
            <h5>
              Profile last updated:{" "}
              {user?.updatedAt
                ? new Date(user.updatedAt).toLocaleDateString()
                : "N/A"}
            </h5>
            <div className="stats-data">
              <p>Average Views: {user?.averageViews || "0"}</p>
              <p>Average Likes: {user?.averageLikes || "0"}</p>
              <p>Recent Visits: {user?.recentVisits || "0"}</p>
              <p>Search Appearances: {user?.searchAppearances || "0"}</p>
              <p>Total Time Spent: {user?.totalTimeSpent || "0"}</p>
              <p>Opportunities Applied: {user?.opportunitiesApplied || "0"}</p>
              <p>Opportunities Won: {user?.opportunitiesWon || "0"}</p>
            </div>
          </div>
          <button className="share-button">Share</button>
        </div>
        <div className="info">
          <h3 className="info-blank">Info</h3>
          <div className="profileInfo">
            <div className="infoItem">
              <h4>Full Name</h4>
              <p>
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div className="infoItem">
              <h4>Email</h4>
              <p>{user?.email}</p>
            </div>
            <div className="infoItem">
              <h4>Username</h4>
              <p>{user?.username}</p>
            </div>
            <div className="infoItem">
              <h4>Joined On</h4>
              <p>
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : ""}
              </p>
            </div>
            <div className="infoItem">
              <h4>My Address</h4>
              <p>{user?.address}</p>
            </div>
            <div className="changePasswordLink">
              <Link
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#changePasswordModal"
              >
                Change Password
              </Link>
            </div>
            <Link to="/me/update" className="editProfileButton">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <div
        className="modal fade"
        id="changePasswordModal"
        tabIndex="-1"
        aria-labelledby="changePasswordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="changePasswordModalLabel">
                Change Password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ChangePassword user={user} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileInfo;
