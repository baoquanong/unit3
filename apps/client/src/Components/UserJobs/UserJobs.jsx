import React from "react";
import jobs from "./jobs";
import "./UserJobs.css";

function UserJobs() {
  return (
    <div id="user-jobs">
      <h1>MY JOBS</h1>
      <div id="jobs">
        {
          jobs.map((job, index) => {
            return (
              <div className="job">
                <h3>{job.type}</h3>
                <p className="user">Posted By: {job.postedBy}</p>
                <p className="user">Accepted By: {job.acceptedBy}</p>
                <p className="date">{job.startDate} - {job.endDate}</p>
                <p>{job.description}</p>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default UserJobs;
