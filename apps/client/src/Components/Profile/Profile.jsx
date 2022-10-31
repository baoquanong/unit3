import React, { useState, useContext } from "react";
import { DataContext } from '../../App';

function Profile() {
  // setting up context
  const { state, setState } = useContext(DataContext);
  const user = state.currUserInfo;

  return (
    <div id="profile">
      <div>
        <img src="https://xsgames.co/randomusers/avatar.php?g=female" />
        <h3>{user.username}</h3>
        <div id="profile-interests">
          <p>Interests/Capabilities</p>
          <div id="interests">
            {
              user.interests.map((interest, index) => {
                return(
                  <p key={index}>{interest}</p>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;