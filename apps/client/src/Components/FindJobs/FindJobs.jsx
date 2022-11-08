import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import JobCard from "../JobCard/JobCard";
import "./FindJobs.css";

function FindJobs() {
  const [filter, setFilter] = useState(false);
  const [jobs, setJobs] = useState([]);

  const toggleFilter = () => {
    setFilter((prev) => !prev);
  };

  const getAllJobs = async () => {
    try {
      const res = await fetch("api/jobs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllJobs();
  });

  const mappedJobs = jobs.map((job, index) => {
    return <JobCard key={index} job={job} />;
  });

  return (
    <div id="find-jobs">
      <img src="https://cdn.shopify.com/s/files/1/0070/7032/files/side-hustle-ideas_8c2b7d4b-80c4-47d6-9eb6-9c4de9b6f44b.jpg?v=1602859207" />
      <h1>FIND JOBS</h1>
      <button onClick={toggleFilter}>Filter</button>
      <section style={{ display: filter ? "" : "none" }}>
        <label for="handywork">Handywork</label>
        <input
          id="handywork"
          name="filterJobs"
          type="radio"
          value="handywork"
        />
        <label for="caregiving">Caregiving</label>
        <input
          id="caregiving"
          name="filterJobs"
          type="radio"
          value="caregiving"
        />
        <label for="events">Events</label>
        <input id="events" name="filterJobs" type="radio" value="events" />
        <label for="cleaning">Cleaning</label>
        <input id="cleaning" name="filterJobs" type="radio" value="cleaning" />
        <label for="pets">Pets</label>
        <input id="pets" name="filterJobs" type="radio" value="pets" />
        <label for="education">Education</label>
        <input
          id="education"
          name="filterJobs"
          type="radio"
          value="education"
        />
        <label for="others">Others</label>
        <input id="others" name="filterJobs" type="radio" value="others" />
        <button>Search</button>
        {/* need to add the submit function to search  */}
      </section>
      <div id="mapped-jobs">
        {mappedJobs}
      </div>
    </div>
  );
}

export default FindJobs;
