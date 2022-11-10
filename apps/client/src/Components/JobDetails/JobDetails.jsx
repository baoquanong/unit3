import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { DataContext } from "../../App";
import "./JobDetails.css";

function JobDetails() {
  // setting up context
  const { state, setState } = useContext(DataContext);
  const job = state.currViewedJob;

  // set up state
  const currUser = JSON.parse(localStorage.getItem("currUser"));
  const [user, setUser] = useState(currUser);

  // setting up navigation
  const navigate = useNavigate();

  const applyJob = async (id) => {
    try {
      const response = await fetch(`/api/jobs/apply/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        alert("successfully updated job!");
        console.log(data);
        // navigate("/jobs");
      } else {
        alert("error:", data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="job-details">
      <div id="curr-job">
        <h1>{job.jobTitle.toUpperCase()}</h1>
        <p id="description">
          <span>JOB DESCRIPTION:</span> {job.jobDescription}
        </p>
        <div id="job-info">
          <p>
            <span>POSTED BY:</span> {job.postedBy.username}
          </p>
          <p>
            <span>JOB TYPE:</span> {job.jobType}
          </p>
          <p>
            <span>DATE:</span> {job.jobStart.slice(0, 10)} to{" "}
            {job.jobEnd.slice(0, 10)}
          </p>
          <p>
            <span>LOCATION:</span> {job.jobLocation ? job.jobLocation : "TBC"}
          </p>
          <p>
            <span>PRICE:</span> {job.jobPrice ? job.jobPrice : "TBC"}
          </p>
        </div>
        <div id="details-buttons">
          <button onClick={() => navigate("/jobs")}>BACK</button>
          <button onClick={() => applyJob(job._id)}>APPLY</button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
