import { useContext, useEffect, useState } from "react";

import { DataContext } from "../../../App";
import "./Jobs.css";

import PostedJobDetails from "./PostedJobDetails";
import JobsHeader from "./JobsHeader";

const PostedJobs = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);

    // state
    const posted = JSON.parse(localStorage.getItem("currUserPostedJobs"))
    const [postedJobs, setPostedJobs] = useState(posted);

    // useEffect
    useEffect(() => {
        localStorage.setItem("currUserPostedJobs", JSON.stringify(postedJobs));
    }, [postedJobs]);

    const jobs = postedJobs.map((job, index) => {
        return (
            <PostedJobDetails 
                setPostedJobs={setPostedJobs}
                jobs={postedJobs}
                job={job}
                key={index}
            />
        );
    });

    return (
        <div id="posted-jobs">
            <JobsHeader />
            <h1>JOBS POSTED BY ME</h1>
            <div id="posted-listings">
                {jobs}
            </div>
        </div>
    );
};

export default PostedJobs;