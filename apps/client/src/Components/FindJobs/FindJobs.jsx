import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JobCard from '../JobCard/JobCard'

function FindJobs() {
  let navigate = useNavigate();
  const [filter, setFilter] = useState(false);
  
  const toggleFilter = () => {
    setFilter(prev => !prev);
  }


  const handleClick = () =>{
    console.log("clicked");
    navigate("/jobs/:id");
  }


  return (
    <div >
      <h1>FindJobs</h1>
      <br/>
      <button onClick={toggleFilter}>Filter</button>
      <section style={{visibility: filter ? "" : "hidden"}}>
        <label for="handywork">Handywork</label>
        <input id="handywork" name="filterJobs" type="radio" value="handywork"/>
        <label for="caregiving">Caregiving</label>
        <input id="caregiving" name="filterJobs" type="radio" value="caregiving"/>
        <label for="events">Events</label>
        <input id="events" name="filterJobs" type="radio" value="events"/>
        <label for="cleaning">Cleaning</label>
        <input id="cleaning" name="filterJobs" type="radio" value="cleaning"/>
        <label for="pets">Pets</label>
        <input id="pets" name="filterJobs" type="radio" value="pets"/>
        <label for="education">Education</label>
        <input id="education" name="filterJobs" type="radio" value="education"/>
        <label for="others">Others</label>
        <input id="others" name="filterJobs" type="radio" value="others"/>
        <button>Search</button> 
        {/* need to add the submit function to search  */}
      </section>
      <div style={{display: "flex"}}>
      <JobCard onClick={handleClick}/>
      <JobCard onClick={handleClick}/>
      <JobCard onClick={handleClick}/>
      <JobCard onClick={handleClick}/>
      </div>


    </div>
  )
}

export default FindJobs