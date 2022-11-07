import { useContext, useEffect, useState } from "react";

import { DataContext } from "../../../App";
import PostedJobDetails from "./PostedJobDetails";

const PostedJobs = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);

    // state
    const posted = JSON.parse(localStorage.getItem("currUserPostedJobs"))
    const [postedJobs, setPostedJobs] = useState(JSON.parse(localStorage));

    const jobs = postedJobs.map((job, index) => {
        return (
            <PostedJobDetails 
                setPostedJobs={setPostedJobs}
                jobs={postedJobs}
                job={job} key={index}
            />
        );
    });

    return (
        <div id="posted-jobs">
            <h1>MY POSTED JOBS</h1>
            <div
                style={{
                    display: "flex",
                    gap: "20px"
                }}
            >
                {jobs}
            </div>
        </div>
    );
};

export default PostedJobs;