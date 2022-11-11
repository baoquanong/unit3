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
  const [error, setError] = useState("");

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
        alert("Successfully applied for job!");
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
        <button
          id={
            job?.postedBy?.username === currUser?.username ?
            "disabled-btn" :
            "apply-btn"
          }
          onClick={() => applyJob(job?._id)}
          disabled={job?.postedBy?.username === currUser.username ? true : false}
        >
          APPLY
        </button>
      </div>
      <button id="back-btn" onClick={() => navigate("/jobs")}>
        BACK
      </button>
    </div>
  );
}

export default JobDetails;
