import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../App";
import "./OtherUser.css";
import OtherUserReviews from "./OtherUserReviews";

const OtherUser = ({ show, setShow }) => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const user = state.currViewedProfile;

    // setting up navigation
    const navigate = useNavigate();

    // function to stop showing details
    const toggleShow = () => {
        setShow({...show, userDetails: false});
    };

    return (
        <div id="other-user">
            <h3 onClick={toggleShow}>X</h3>
            <div id="personal-info">
                <div id="pi-left">
                    <img src="https://api.multiavatar.com/Sally.png" />
                    <h3>{user?.username.toUpperCase()}</h3>
                </div>
                <div id="pi-content">
                    <div className="about-div">
                        <h4>CONTACT:</h4>
                        <p>9177 2770</p>
                    </div>
                    <div className="about-div">
                        <h4>RATING:</h4>
                        <p>4/5</p>
                    </div>
                    {
                        !user?.description ?
                        <></> :
                        <div className="about-div">
                            <h4>ABOUT ME:</h4>
                            <p>{user.description}</p>
                        </div>
                    }
                    {
                        user?.skills.length === 0 ?
                        <></> :
                        <div className="about-div">
                            <h4>SKILLS:</h4>
                            <div id="skills">
                                {
                                    user?.skills.map((skill, index) => {
                                        return (
                                            <p key={index} className="skill">{skill}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
            <OtherUserReviews id={user._id} />
        </div>
    );
};

export default OtherUser;

// <div id="other-user">
// <div id="ou-profile">
//     <div id="ou-info">
//         <div id="personal-info">
//             
//             <div id="pi-content">

//             </div>
//         </div>

//     </div>
//     <OtherUserReviews id={user._id} />
// </div>
// <button onClick={() => navigate("/user/postedjobs")}>BACK TO JOBS</button>
// </div>