import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../../App";

const JobsOverview = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const myJobs = state.myPostedJobs;

    //setting up navigation
    const navigate = useNavigate();

    // mapping out posted jobs
    const jobsArr = myJobs.slice(0, 3);
    const overview = jobsArr.map((jobs, index) => {
        return (
            <div className="job-overview" key={index}>
                <div id="top">
                    <p id="title">{jobs?.title?.toUpperCase()}</p>
                    <p id="applicants">{jobs?.applicants?.length} Applicants</p>
                </div>
                <p id="date">{jobs?.start?.slice(0, 10)} to {jobs?.end?.slice(0, 10)}</p>
            </div>
        );
    });

    return (
        <div id="jobs-overview">
            <div className="jr-header">
                <h1>JOBS POSTED</h1>
                <p onClick={() => navigate("/user/postedjobs")}>VIEW ALL {">"}</p>
            </div>
            <div className="listing">
                {
                    myJobs.length === 0 ?
                    <p className="no-msg">NO JOBS POSTED YET!</p> :
                    overview
                }
            </div>
        </div>
    );
};

export default JobsOverview;