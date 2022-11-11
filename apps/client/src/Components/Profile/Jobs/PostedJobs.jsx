import { useContext, useEffect, useState } from "react";

import { DataContext } from "../../../App";
import "./Jobs.css";

import PostedJobDetails from "./PostedJobDetails";
import JobsHeader from "./JobsHeader";

const PostedJobs = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const myPosted = state.myPostedJobs;

    const currUser = JSON.parse(localStorage.getItem("currUser"));

    return (
        <div id="posted-jobs">
            {
                currUser === null ?
                <h2>PLEASE LOG IN TO VIEW YOUR JOBS</h2> :
                <>
                    <JobsHeader />
                    <h1>JOBS POSTED BY ME</h1>
                    <div id="posted-listings">
                        {
                            myPosted.length === 0 ?
                            <p id="error-msg">NO JOBS POSTED YET!</p> :
                            myPosted?.map((job, index) => {
                                return (
                                    <PostedJobDetails 
                                        job={job}
                                        key={index}
                                    />
                                );
                            })
                        }
                    </div>
                </>
            }
        </div>
    );
};

export default PostedJobs;