import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../App";

function JobCard({ job }) {
  // setting up navigation
  const navigate = useNavigate();

  // setting up state
  const { state, setState } = useContext(DataContext);

  // assigning local storage variable
  const currUser = JSON.parse(localStorage.getItem("currUser"));

  const handleClick = () => {
    if (currUser === null) {
      alert("Please log in to view job details!");
    } else {
      console.log("clicked");
      setState({
        ...state,
        currViewedJob: job,
      });
      navigate(`/jobs/${job._id}`);
    }
  };

  return (
    <div onClick={handleClick} className="job-card">
      <h4>{job?.title?.toUpperCase()}</h4>
      <div id="job-content">
        <p id="jd">{job?.description}</p>
        <p id="date">{job?.start?.slice(0, 10)} <br />to<br /> {job?.end?.slice(0, 10)}</p>
        <p id="poster">Posted By: {job?.postedBy?.username}</p>
      </div>
    </div>
  );
}

export default JobCard;
