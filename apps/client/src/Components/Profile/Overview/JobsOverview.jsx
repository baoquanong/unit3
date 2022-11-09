import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const JobsOverview = ({ user }) => {
    //setting up navigation
    const navigate = useNavigate();

    // setting up state
    const [jobs, setJobs] = useState([]);

    // function to fetch all posted jobs
    const getJobs = async () => {
        try {
            const response = await fetch(`/api/jobs/posted/${user._id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                console.log("successfully fetched posted jobs");
                console.log("posted jobs:", data)
                setJobs(data); // updating state
                localStorage.setItem("currUserPostedJobs", JSON.stringify(data)); // updating local storage
            } else {
                console.log("error:", error);
            }
        }
        catch (error) {
            console.log("error:", error)
        }
    };

    useEffect(() => {
        getJobs();
    }, []);

    // mapping out posted jobs
    const jobsArr = jobs.slice(0, 3);
    const overview = jobsArr.map((jobs, index) => {
        return (
            <div className="job-overview" key={index}>
                <div id="top">
                    <p id="title">{jobs.jobTitle.toUpperCase()}</p>
                    <p id="applicants">{jobs.applicants.length} Applicants</p>
                </div>
                <p id="date">{jobs.jobStart.slice(0, 10)} to {jobs.jobEnd.slice(0, 10)}</p>
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
                    jobs.length === 0 ?
                    <p>No jobs posted yet!</p> :
                    overview
                }
            </div>
        </div>
    );
};

export default JobsOverview;