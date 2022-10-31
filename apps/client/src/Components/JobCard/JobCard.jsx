import React from 'react'

function JobCard({ onClick }) {
  return (
    <div onClick={onClick}>
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