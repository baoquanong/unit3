import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../App";

const Applications = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const user = state.loggedIn;

    // setting up state
    const [appliedJobs, setAppliedJobs] = useState([]);

    // function to fetch jobs
    const getJobs = async () => {
        try {
            const response = await fetch(`/api/jobs/applied/${user._id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                console.log("successfully fetched");
                console.log("applied jobs:", data);
                setAppliedJobs(data);
            } else {
                console.log(data.error);
            }
        }
        catch (error) {
            console.log("error:", error);
        }
    };

    useEffect(() => {
        getJobs();
    }, []);

    // mapping out the jobs
    const jobs = appliedJobs.map((job, index) => {
        return (
            <h3 key={index}>{job.jobDescription}</h3>
        );
    });

    return (
        <div id="applications">
            <h1>MY APPLICATIONS</h1>
            <div id="applied-jobs">
                {jobs}
            </div>
        </div>
    );
};

export default Applications;