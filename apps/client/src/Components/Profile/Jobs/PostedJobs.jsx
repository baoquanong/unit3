import { useContext, useEffect, useState } from "react";

import { DataContext } from "../../../App";
import "./Jobs.css";

import PostedJobDetails from "./PostedJobDetails";
import JobsHeader from "./JobsHeader";
import OtherUser from "../../OtherUser/OtherUser";

const PostedJobs = () => {
    // state
    const posted = JSON.parse(localStorage.getItem("currUserPostedJobs"))
    const [postedJobs, setPostedJobs] = useState(posted);
    const [show, setShow] = useState({
        userDetails: false,
        selection: false
    });

    // useEffect
    useEffect(() => {
        localStorage.setItem("currUserPostedJobs", JSON.stringify(postedJobs));
    }, [postedJobs]);

    const jobs = postedJobs.map((job, index) => {
        return (
            <PostedJobDetails 
                setShow={setShow}
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
            <div id="posted-content">
                <div id="posted-listings">
                    {jobs}
                </div>
                {
                    !show.userDetails ?
                    <></> :
                    <OtherUser show={show} setShow={setShow} />
                }
            </div>
        </div>
    );
};

export default PostedJobs;