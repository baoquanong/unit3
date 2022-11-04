import { useContext, useEffect, useState } from "react";

import { DataContext } from "../../App";

const PostedJobs = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const user = state.loggedIn;

    // state
    const [postedJobs, setPostedJobs] = useState([]);

    // function to fetch posted jobs
    const getPostedJobs = async () => {
      try {
        const response = await fetch(`/api/jobs/posted/${user._id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            console.log("successfully fetched jobs posted by current user");
            console.log("posted jobs:", data);
            setPostedJobs(data);
        } else {
            console.log("error:", data.error);
        }
      }
      catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
        getPostedJobs();
    }, []);

    const jobs = postedJobs.map((job, index) => {
        return (
            <div key={index} className="job" style={{background: "lightsteelblue"}}>
                <p>{job.jobDescription}</p>
                <p>Job Type: {job.jobType}</p>
                <p>Accepted By: {job.acceptedBy.username}</p>
            </div>
        );
    });

    return (
        <div id="posted-jobs">
            <h1>MY POSTED JOBS</h1>
            <div>
                {jobs}
            </div>
        </div>
    );
};

export default PostedJobs;