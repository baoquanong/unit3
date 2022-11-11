import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../../App";
import "./ApplicantSelection.css";

import OtherUser from "../../OtherUser/OtherUser";

const ApplicantSelection = () => {
    // setting up navigation
    const navigate = useNavigate();

    // setting up context
    const { state, setState } = useContext(DataContext);
    const job = state.currViewedJob;

    // setting up state
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({});
    const [reviews, setReviews] = useState([]);

    // function to fetch reviews of a user
    const getReviews = async (user) => {
        try {
            const response = await fetch(`/api/reviews/${user._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok) {
                console.log("successfully fetched reviews!");
                console.log("reviews:", data);
                setReviews(data);
            } else {
                setReviews([]);
                console.log("error:", data.error);
            }
        }
        catch (error) {
            console.log("error:", error);
        }
    };

    // function to show user details
    const showDetails = (applicant) => {
        getReviews(applicant);
        setShow(true);
        setUser(applicant);
    };

    return (
        <div id="selection-page">
            <div id="selection-content">
                <div id="selection-details">
                    <h2>{job?.title?.toUpperCase()}</h2>
                    <p id="posted-by">Posted By: {job?.postedBy?.username}</p>
                    <p id="description">{job?.description}</p>
                    <div id="job-info">
                        <h3>JOB DETAILS:</h3>
                        <p className="detail">
                            <span>JOB TYPE:</span> {job?.type}
                        </p>
                        <p className="detail">
                            <span>DATE:</span> {job?.start?.slice(0, 10)} to{" "}
                            {job?.end?.slice(0, 10)}
                        </p>
                        <p className="detail">
                            <span>LOCATION:</span> {job?.location ? job?.location : "TBC"}
                        </p>
                        <p className="detail">
                            <span>COMPENSATION: </span>${job?.price ? job?.price : "TBC"}
                        </p>
                    </div>
                    <div id="applicant-info">
                        <h3>APPLICANTS:</h3>
                        <div id="applicants">
                            {
                                job?.applicants?.map((applicant) => {
                                    return (
                                        <p onClick={() => showDetails(applicant)} className="applicant">{applicant?.username?.toUpperCase()}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {
                    show === true ?
                    <OtherUser reviews={reviews} user={user} setShow={setShow} /> :
                    <></>
                }
            </div>
            <button onClick={() => navigate("/user/postedjobs")} id="back-btn">BACK</button>
        </div>
    );
};

export default ApplicantSelection;