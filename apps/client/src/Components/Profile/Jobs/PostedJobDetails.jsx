import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../../App";

const PostedJobDetails = ({ job, jobs, setPostedJobs, setShow }) => {
    // setting up context
    const { state, setState } = useContext(DataContext);

    // setting up navigation
    const navigate = useNavigate();

    // function to view another user profile
    const viewProfile = (user) => {
        setState({...state, currViewedProfile: user});
        setShow({userDetails: true, selection: false});
    };

    // mapping out applicants
    const applicants = job.applicants.map((user, index) => {
        return (
            <div className="applicant" key={index}>
                <p onClick={() => viewProfile(user)}>{user.username}</p>
            </div>
        );
    });

    // function to delete job
    const deleteJob = async (id) => {
        try {
            const response = await fetch(`/api/jobs/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: null,
            });

            const data = await response.json();

            if (response.ok) {
                console.log("job successfully deleted!");
                console.log(data);
                const newJobs = jobs.filter((job) => job._id !== data._id);
                setPostedJobs(newJobs);
            } else {
                console.log("error:", data.error)
            }
        }
        catch (error) {
            console.log("error:", error);
        }
    };

    return (
        <div id="pj-details">
            <h4>{job.jobTitle.toUpperCase()}</h4>
            <label>
                DESCRIPTION:
                <p id="jd">{job.jobDescription}</p>
            </label>
            <label>
                JOB TYPE:
                <p id="jt">{job.jobType}</p>
            </label>
            <label>
                APPLICANTS:
                <div id="applicants">
                    {
                        job.applicants.length === 0 ?
                        <p>No Applicants</p> :
                        applicants
                    }
                </div>
            </label>
            <div id="job-buttons">
                <button>EDIT</button>
                <button onClick={() => deleteJob(job._id)}>DELETE</button>
            </div>
        </div>
    );
};

export default PostedJobDetails;