import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Reviews from "./Reviews";
import { DataContext } from '../../App';
import reviews from "./reviews";
import "./Profile.css";

function Profile() {
  // setting up context
  const { state, setState } = useContext(DataContext);
  const user = state.loggedIn;

  // setting up navigate
  const navigate = useNavigate();

  // calculating ratings
  const totalRating = reviews.reduce((total, num) => total + num.stars, 0);
  const avgRating = totalRating/reviews.length;

  return (
    <div id="profile">
      <div id="user-info">
        <img src={user?.img} />
        <h2>{user?.username.toUpperCase()}</h2>
        <p id="rating">Average Rating: {avgRating}/5</p>
        {
          !user.description ?
          <></> :
          <div id="about-me">
            <p className="header">ABOUT ME</p>
            <p>{user?.description}</p>
          </div>
        }
        {
          user.skills.length === 0 ?
          <></> :
          <div id="user-skills">
            <p className="header">INTERESTS/CAPABILITIES</p>
            <div id="skills">
              {
                user?.skills.map((skill, index) => {
                  return(
                    <p key={index} className="skill">{skill}</p>
                  )
                })
              }
            </div>
          </div>
        }
        <button onClick={() => navigate("/user/edit")}>Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;