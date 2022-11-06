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
    <div onClick={handleClick}>
      <h4>{job.jobTitle}</h4>
      <p>{job.jobDescription}</p>
      <p>{job.jobType}</p>
      <p>{job.jobStatus}</p>
      <p>{job.jobPrice}</p>
      <p>{job.jobLocation}</p>
      <p>{job.jobStart.slice(0, 10)}</p>
      <p>{job.jobEnd.slice(0, 10)}</p>
      <p>{job.postedBy.username}</p>
    </div>
  );
}

export default JobCard;
