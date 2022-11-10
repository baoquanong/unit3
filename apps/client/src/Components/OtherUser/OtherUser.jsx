import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../App";
import ReviewsOverview from "../Profile/Overview/ReviewsOverview";
import "./OtherUser.css";
import OtherUserReviews from "./OtherUserReviews";

const OtherUser = ({ show, setShow }) => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const user = state.currViewedProfile;
    const job = state.jobToAccept;

    // setting up variables
    const jobs = JSON.parse(localStorage.getItem("currUserPostedJobs"));

    // setting up navigation
    const navigate = useNavigate();

    // function to stop showing details
    const toggleShow = () => {
        setShow({...show, userDetails: false});
    };

    // function to select an applicant
    const selectApplicant = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/jobs/accept/${job._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ acceptedBy: user._id }),
            });
            
            const data = await response.json();

            if (response.ok) {
                console.log("successfully accepted applicant!");
                const revIndex = jobs.indexOf((j) => j._id === job._id);
                jobs[revIndex] = data;
                localStorage.setItem("currUserPostedJobs", JSON.stringify(jobs));
            }
        }
        catch (error) {
            console.log("error:", error);
        }
    }

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
            <button onClick={selectApplicant}>SELECT {user?.username.toUpperCase()}</button>
        </div>
    );
};

export default OtherUser;