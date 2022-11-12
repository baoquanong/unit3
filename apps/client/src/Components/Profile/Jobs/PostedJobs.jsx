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

    // function to get all posted reviews
    const getPosted = async () => {
        try {
            const response = await fetch(`/api/reviews/posted/${currUser._id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                console.log("successfully fetched reveiws!");
                console.log("posted reviews:", data);
                setState({...state, myPostedReviews: data});
            } else {
                console.log("error:", data.error);
            }
        }
        catch (error) {
            console.log("error:", error);
        }
    };

    useEffect(() => {
        getPosted();
    }, []);

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