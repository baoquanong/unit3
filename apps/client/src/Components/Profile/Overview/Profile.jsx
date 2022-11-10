import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../../App";
import "./Profile.css";

function Profile({ user }) {
  // setting up navigate
  const navigate = useNavigate();

  return (
    <div id="profile">
      <div id="user-info">
        {
          user.img ?
          <img src={user?.img} /> :
          <div id="img-ph">:-)</div>
        }
        
        <h2>{user?.username.toUpperCase()}</h2>
        <p id="rating">Average Rating: 4/5</p>
        {
          !user?.description ?
          <></> :
          <div id="about-me">
            <p className="header">ABOUT ME:</p>
            <p id="description">{user?.description}</p>
          </div>
        }
        {
          user.skills.length === 0 ?
          <></> :
          <div id="user-skills">
            <p className="header">SKILLS:</p>
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
        <button onClick={() => navigate("/user/edit")}>EDIT PROFILE</button>
      </div>
    </div>
  );
};

export default Profile;