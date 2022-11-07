import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../App";
import "./OtherUser.css";
import OtherUserReviews from "./OtherUserReviews";

const OtherUser = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const user = state.currViewedProfile;

    // setting up navigation
    const navigate = useNavigate();

    return (
        <div id="other-user">
            <div id="ou-profile">
                <img src="https://api.multiavatar.com/Sally.png" />
                <div id="ou-info">
                    <div id="personal-info">
                        <h2>{user?.username}</h2>
                        <p id="rating">Average Rating: /5</p>
                    </div>
                    {
                        !user?.description ?
                        <></> :
                        <div id="about-me">
                            <p className="header">ABOUT ME</p>
                            <p>{user?.description}</p>
                        </div>
                    }
                    {
                        user?.skills.length === 0 ?
                        <></> :
                        <div id="user-skills">
                            <p className="header">SKILLS</p>
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
                </div>
                <OtherUserReviews id={user._id} />
            </div>
            <button onClick={() => navigate("/user/postedjobs")}>BACK TO JOBS</button>
        </div>
    );
};

export default OtherUser;