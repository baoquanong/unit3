import React from 'react'
import { useNavigate } from 'react-router-dom'
import JobCard from '../JobCard/JobCard'

function FindJobs() {
  let navigate = useNavigate();
  
  const handleClick = () =>{
    console.log("clicked");
    navigate("/jobs/:id");
  }

  return (
    <div >
      <h1>FindJobs</h1>
      <br/>
      <button>Filter</button>
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