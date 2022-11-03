import React from 'react'
import { useNavigate } from 'react-router-dom' 

function JobCard() {
  let navigate = useNavigate();

  const handleClick = () =>{
    console.log("clicked");
    navigate("/jobs/:id");
  }
  return (
    <div onClick={handleClick}>
        <h4>
        Job
        </h4>
        <p>
        Job Description
        </p>
        {/* <button >go to </button> */}


    </div>
  )
}

export default JobCard