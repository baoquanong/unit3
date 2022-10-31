import React, { useState, useContext } from "react";

import Reviews from "./Reviews";
import { DataContext } from '../../App';
import "./Profile.css";

function Profile() {
  // setting up context
  const { state, setState } = useContext(DataContext);
  const user = state.currUserInfo;

  return (
    <div id="profile">
      <div id="user-info">
        <img src={user.img} />
        <h2>{user.username.toUpperCase()}</h2>
        <div id="about-me">
          <p className="header">ABOUT ME</p>
          <p>{user.aboutMe}</p>
        </div>
        <div id="user-interests">
          <p className="header">INTERESTS/CAPABILITIES</p>
          <div id="interests">
            {
              user?.interests.map((interest, index) => {
                return(
                  <p key={index} className="interest">{interest}</p>
                )
              })
            }
          </div>
        </div>
        <button>Edit Profile</button>
      </div>
      <Reviews />
    </div>
  );
};

export default Profile;