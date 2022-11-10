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
                setState({...state, myAppliedJobs: data})
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
    const jobs = myApplied?.map((job, index) => {
        return (
            <ApplicationDetails job={job} key={index} />
        );
    });

    return (
        <div id="applications">
            <JobsHeader />
            <h1>MY APPLICATIONS</h1>
            <div id="applied-jobs">
                {jobs}
            </div>
        </div>
    );
};

export default Applications;