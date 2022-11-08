import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../App";

function JobCard({ job }) {
  let navigate = useNavigate();

  const { state, setState } = useContext(DataContext);

  const handleClick = () => {
    console.log("clicked");
    setState({
      ...state,
      currViewedJob: job,
    });
    navigate("/jobs/:id");
  };

  return (
    <div onClick={handleClick} className="job-card">
      <h4>{job.jobTitle.toUpperCase()}</h4>
      <p id="jd">{job.jobDescription}</p>
      <p id="date">{job.jobStart.slice(0, 10)} <br />to<br /> {job.jobEnd.slice(0, 10)}</p>
      <p id="poster">Posted By: {job.postedBy.username}</p>
    </div>
  );
}

export default JobCard;
