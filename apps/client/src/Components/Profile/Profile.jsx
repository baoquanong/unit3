import React, { useState, useContext } from "react";

import Reviews from "./Reviews";
import { DataContext } from '../../App';
import reviews from "./reviews";
import "./Profile.css";

function Profile() {
  // setting up context
  const { state, setState } = useContext(DataContext);
  const user = state.currUserInfo;

  const totalRating = reviews.reduce((total, num) => total + num.stars, 0);
  const avgRating = totalRating/reviews.length;

  return (
    <div id="profile">
      <div id="user-info">
        <img src={user.img} />
        <h2>{user.username.toUpperCase()}</h2>
        <p id="rating">Average Rating: {avgRating}/5</p>
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