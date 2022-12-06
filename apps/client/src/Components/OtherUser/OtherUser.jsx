import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../App";
import "./OtherUser.css";

const OtherUser = ({ setShow, user, reviews }) => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const myPosted = state.myPostedJobs;
    const currJob = state.currViewedJob;

    // setting up navigation
    const navigate = useNavigate();

    // mapping out reviews
    const mappedReviews = reviews?.map((review) => {
        return (
            <div className="review">
                <p id="msg">{review.message}</p>
                <p id="score">{review.rating}/5</p>
            </div>
        );
    });

    // calculating score
    const ratingSum = reviews?.reduce((total, review) => total + review.rating, 0);
    const myAvg = ratingSum/(reviews?.length);

    // function to stop showing details
    const toggleShow = () => {
        setShow(false);
    };

    // function to select an applicant
    const selectApplicant = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/jobs/accept/${currJob._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ acceptedBy: user._id, status: "completed" }),
            });
            
            const data = await response.json();

            if (response.ok) {
                console.log("successfully accepted applicant!");
                const newPosted = myPosted?.filter((j) => j._id !== data._id);
                newPosted.unshift(data);
                setState({...state, myPostedJobs: newPosted, currViewedJob: data});
                setShow(false);
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
                        {
                            reviews.length === 0 ?
                            <p>Not Available</p> :
                            <p>{Math.round(myAvg)}/5</p>
                        }
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
            <div id="reviews">
                <h3>REVIEWS:</h3>
                {
                    reviews.length === 0 ?
                    <p>No reviews available</p> :
                    <div id="reviews-list">
                        {mappedReviews}
                    </div>
                }
            </div>
            <button onClick={selectApplicant}>SELECT {user?.username?.toUpperCase()}</button>
        </div>
    );
};

export default OtherUser;