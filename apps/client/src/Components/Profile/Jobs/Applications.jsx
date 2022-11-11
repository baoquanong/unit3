import { useContext, useEffect } from "react";

import { DataContext } from "../../../App";
import "./Jobs.css";

import JobsHeader from "./JobsHeader";
import ApplicationDetails from "./ApplicationDetails";

const Applications = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const myApplied = state.myAppliedJobs;

    // setting up variables
    const user = JSON.parse(localStorage.getItem("currUser"));

    // mapping out the jobs
    const jobs = myApplied?.map((job, index) => {
        return (
            <ApplicationDetails job={job} key={index} />
        );
    });

    return (
        <div id="applications">
            {
                user === null ?
                <h2>PLEASE LOG IN TO VIEW YOUR JOBS</h2> :
                <>
                    <JobsHeader />
                    <h1>MY APPLICATIONS</h1>
                    <div id="applied-jobs">
                        {
                            myApplied?.length === 0 ?
                            <p id="error-msg">NO JOB APPLICATIONS YET!</p> :
                            jobs
                        }
                    </div>
                </>
            }

        </div>
    );
};

export default Applications;