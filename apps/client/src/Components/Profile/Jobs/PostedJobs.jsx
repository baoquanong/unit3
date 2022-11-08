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

    return (
        <div id="posted-jobs">
            <JobsHeader />
            <h1>JOBS POSTED BY ME</h1>
            <div id="posted-content">
                <div id="posted-listings">
                    {
                        !postedJobs ?
                        <p>No jobs posted yet!</p> :
                        postedJobs.map((job, index) => {
                            return (
                                <PostedJobDetails 
                                    setShow={setShow}
                                    setPostedJobs={setPostedJobs}
                                    jobs={postedJobs}
                                    job={job}
                                    key={index}
                                />
                            );
                        })
                    }
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