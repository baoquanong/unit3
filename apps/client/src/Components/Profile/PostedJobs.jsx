import { useContext, useEffect, useState } from "react";

import { DataContext } from "../../App";
import PostedJobDetails from "./PostedJobDetails";

const PostedJobs = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const user = state.loggedIn;

    // state
    const [postedJobs, setPostedJobs] = useState([]);
    // const [showDetails, setShowDetails] = useState("false");

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