import { useRef } from "react";

function CreateJobs() {
  return (
    <div>
      <br />
      <br />
      <label for="jobTitle">Job Title: </label>
      <input type="text" placeholder="text" name="jobTitle"></input>
      <br />
      <label for="jobDescription">Job Description: </label>
      <textarea rows="10" cols="30" name="jobDescription"></textarea>
      <br />
      <label for="jobType">Job Type: </label>
      <select name="jobType">
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
      <label for="jobTitle">Job Price: </label>
      <input type="text" placeholder="text" name="jobTitle"></input>
      <br />
      <label for="jobTitle">Job Location: </label>
      <input type="text" placeholder="text" name="jobTitle"></input>
      <br />
      <label for="jobTitle">Job Date: </label>
      <input type="text" placeholder="text" name="jobTitle"></input>
      <br />
      <button>POST JOB</button>
      {/* need to add the submit function to post job */}
    </div>
  );
}

export default CreateJobs;
