import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../App";
import "./CreateJobs.css";

function CreateJobs() {
  // setting up navigation
  const navigate = useNavigate();

  // setting up variables
  const currUser = JSON.parse(localStorage.getItem("currUser"));
  let date = new Date();
  console.log("1");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const jobInfo = Object.fromEntries(new FormData(event.target));
    jobInfo.postedBy = currUser._id;

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobInfo),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("success");
        navigate("/jobs");
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="create-job">
      <h1>CREATE A JOB</h1>
      <div id="create">
        <form
          id="create-form"
          method="post"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div id="job-name">
            <label>
              JOB TITLE:
              <input type="text" name="title" required={true} />
            </label>
            <label required={true}>
              DESCRIPTION:
              <textarea
                rows="10"
                cols="30"
                name="description"
                required={true}
              />
            </label>
          </div>
          <div id="job-logs">
            <label>
              JOB TYPE:
              <select name="type" required={true}>
                <option>Select Type</option>
                <option>Handywork</option>
                <option>Caregiving</option>
                <option>Events</option>
                <option>Cleaning</option>
                <option>Pets</option>
                <option>Education</option>
                <option>Others</option>
              </select>
            </label>
            <label>
              COMPENSATION:
              <input type="number" name="price" required={true} />
            </label>
            <label>
              LOCATION:
              <input type="text" name="location" required={true} />
            </label>
          </div>
          <div id="job-dates">
            <label>
              START DATE:
              <input
                type="date"
                name="start"
                required={true}
                min={"2023-12-01"}
              />
            </label>
            <label>
              END DATE:
              <input type="date" name="end" required={true} />
            </label>
          </div>
          <button>POST JOB</button>
        </form>
      </div>
    </div>
  );
}

export default CreateJobs;
