import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../App";

function CreateJobs() {
  // const [ message, setMessage] = useState("")
  const navigate = useNavigate();

  // setting up context
  const { state, setState } = useContext(DataContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const jobInfo = Object.fromEntries(new FormData(event.target));
    jobInfo.postedBy = state.loggedIn._id;

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
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <label for="jobTitle">Job Title: </label>
        <input
          type="text"
          placeholder="text"
          name="jobTitle"
          required={true}
        ></input>
        <br />
        <label for="jobDescription" required={true}>
          Job Description:{" "}
        </label>
        <textarea
          rows="10"
          cols="30"
          name="jobDescription"
          required={true}
        ></textarea>
        <br />
        <label for="jobType">Job Type: </label>
        <select name="jobType" required={true}>
          <option>Select Type</option>
          <option>Handywork</option>
          <option>Caregiving</option>
          <option>Events</option>
          <option>Cleaning</option>
          <option>Pets</option>
          <option>Education</option>
          <option>Others</option>
        </select>
        <br />
        <label for="jobPrice">Job Price: </label>
        <input
          type="number"
          placeholder="num"
          name="jobPrice"
          required={true}
        ></input>
        <br />
        <label for="jobLocation" required={true}>
          Job Location:{" "}
        </label>
        <input
          type="text"
          placeholder="text"
          name="jobLocation"
          required={true}
        ></input>
        <br />
        <label for="jobStart">Job Start Date: </label>
        <input
          type="date"
          placeholder="text"
          name="jobStart"
          required={true}
        ></input>
        <br />
        <label for="jobEnd">Job End Date: </label>
        <input type="date" placeholder="text" name="jobEnd"></input>
        <br />
        <button>POST JOB</button>
        {/* need to add the fetch to post job */}
      </form>
      {/* <p>{message}</p> */}
    </div>
  );
}

export default CreateJobs;
