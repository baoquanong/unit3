import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import JobCard from "../JobCard/JobCard";
import "./FindJobs.css";

function FindJobs() {
  const [filter, setFilter] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

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
  }, []);

  const handleFilter = () => {
    const selectFilter = document.querySelector(
      'input[name="filterJobs"]:checked'
    ).value;
    const array = jobs.filter((job) => job.jobType === selectFilter);
    console.log(array);
    setFilteredJobs(array);
  };

  const mappedJobs = jobs.map((job, index) => {
    return <JobCard key={index} job={job} />;
  });

  const mappedFilteredJobs = filteredJobs.map((job, index) => {
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
          value="Handywork"
          onClick={handleFilter}
        />
        <label for="caregiving">Caregiving</label>
        <input
          id="caregiving"
          name="filterJobs"
          type="radio"
          value="Caregiving"
          onClick={handleFilter}
        />
        <label for="events">Events</label>
        <input
          id="events"
          name="filterJobs"
          type="radio"
          value="Events"
          onClick={handleFilter}
        />
        <label for="cleaning">Cleaning</label>
        <input
          id="cleaning"
          name="filterJobs"
          type="radio"
          value="Cleaning"
          onClick={handleFilter}
        />
        <label for="pets">Pets</label>
        <input
          id="pets"
          name="filterJobs"
          type="radio"
          value="Pets"
          onClick={handleFilter}
        />
        <label for="education">Education</label>
        <input
          id="education"
          name="filterJobs"
          type="radio"
          value="Education"
          onClick={handleFilter}
        />
        <label for="others">Others</label>
        <input
          id="others"
          name="filterJobs"
          type="radio"
          value="others"
          onClick={handleFilter}
        />
      </section>
      <div id="mapped-jobs">
        {filteredJobs.length === 0 ? mappedJobs : mappedFilteredJobs}
      </div>
    </div>
  );
}

export default FindJobs;
