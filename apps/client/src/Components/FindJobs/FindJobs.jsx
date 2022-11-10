import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import JobCard from "../JobCard/JobCard";
import "./FindJobs.css";
import { DataContext } from "../../App";

function FindJobs() {
  // setting up context
  const { state, setState } = useContext(DataContext);
  const jobs = state.allJobs;

  // getting current user info
  const currUser = JSON.parse(localStorage.getItem("currUser"));

  // setting up state
  const [filter, setFilter] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [error, setError] = useState("");

  // function to toggle filter
  const toggleFilter = () => {
    setFilter((prev) => !prev);
  };

  // function to get all jobs
  const getAllJobs = async () => {
    try {
      const res = await fetch("api/jobs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        console.log("successfully fetched all jobs");
        setState({...state, allJobs: data});
      } else {
        console.log("error:", data.error);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  // function to filter jobs on click
  const handleFilter = () => {
    const selectFilter = document.querySelector(
      'input[name="filterJobs"]:checked'
    ).value;

    const array = jobs.filter((job) => 
      job.type === selectFilter
      &&
      !job.acceptedBy
    );

    if (array.length == 0) {
      setError("NO JOBS FOUND");
    } else {
      setError("");
    }

    setFilteredJobs(array);
  };

  const mappedJobs = jobs.map((job, index) => {
    if (!job.acceptedBy) {
      return <JobCard key={index} job={job} />;
    }
  });

  const mappedFilteredJobs = filteredJobs.map((job, index) => {
    return <JobCard key={index} job={job} />;
  });

  const handleClear = () => {
    const selection = document.getElementsByName("filterJobs");
    for (let i = 0; i < selection.length; i++) {
      selection[i].checked = false;
    }
    setFilteredJobs([]);
    setError("");
  };

  return (
    <div id="find-jobs">
      <img src="https://cdn.shopify.com/s/files/1/0070/7032/files/side-hustle-ideas_8c2b7d4b-80c4-47d6-9eb6-9c4de9b6f44b.jpg?v=1602859207" />
      <h1>FIND JOBS</h1>
      <button onClick={toggleFilter} id="filter-btn">Filter</button>
      <section style={{ display: filter ? "" : "none" }} id="filter">
        <div id="radio">
          <label>
            Handywork
              <input
              id="handywork"
              name="filterJobs"
              type="radio"
              value="Handywork"
              onClick={handleFilter}
            />
          </label>
          <label>
            Caregiving
            <input
              id="caregiving"
              name="filterJobs"
              type="radio"
              value="Caregiving"
              onClick={handleFilter}
            />
          </label>
          <label>
            Events
            <input
              id="events"
              name="filterJobs"
              type="radio"
              value="Events"
              onClick={handleFilter}
            />
          </label>
          <label>
            Cleaning
            <input
              id="cleaning"
              name="filterJobs"
              type="radio"
              value="Cleaning"
              onClick={handleFilter}
            />
          </label>
          <label>
            Pets
            <input
              id="pets"
              name="filterJobs"
              type="radio"
              value="Pets"
              onClick={handleFilter}
            />
          </label>
          <label>
            Education
            <input
              id="education"
              name="filterJobs"
              type="radio"
              value="Education"
              onClick={handleFilter}
            />
          </label>
          <label>
            Others
            <input
              id="others"
              name="filterJobs"
              type="radio"
              value="others"
              onClick={handleFilter}
            />
          </label>
        </div>
        <button id="showall-btn" onClick={handleClear}>Show All Jobs</button>
      </section>
      {error === "" ? <></> : <p id="error-msg">{error}</p>}
      <div id="mapped-jobs">
        {filteredJobs.length === 0 && error === ""
          ? mappedJobs
          : mappedFilteredJobs}
      </div>
    </div>
  );
}

export default FindJobs;
