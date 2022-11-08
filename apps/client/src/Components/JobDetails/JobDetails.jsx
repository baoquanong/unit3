import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { DataContext } from "../../App";

function JobDetails() {
  const { state, setState } = useContext(DataContext);
  const job = state.currViewedJob;
  const navigate = useNavigate();

  const applyJob = async (id) => {
    //const user = JSON.parse(localStorage.getItem("currUser"))
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.loggedIn),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/jobs");
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      By Posted By : {job.postedBy.username}
      <br />
      Description : {job.jobDescription}
      <br />
      Job Type : {job.jobType}
      <br />
      Status: {job.jobStatus}
      <br />
      Job Start : {job.jobStart.slice(0, 10)}
      <br />
      Job End : {job.jobEnd.slice(0, 10)}
      <br />
      Location : {job.jobLocation}
      <br />
      Price : {job.jobPrice}
      <br />
      <button
        onClick={() => {
          navigate("/jobs");
        }}
      >
        {" "}
        Back{" "}
      </button>
      <button
        onClick={() => {
          applyJob(job._id);
        }}
      >
        {" "}
        Apply{" "}
      </button>
    </div>
  );
}

export default JobDetails;
