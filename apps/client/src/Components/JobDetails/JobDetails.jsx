import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { DataContext } from "../../App";

function JobDetails() {
  const { state, setState } = useContext(DataContext);
  const job = state.currViewedJob;
  const navigate = useNavigate();

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
      <button> Apply </button>
    </div>
  );
}

export default JobDetails;
