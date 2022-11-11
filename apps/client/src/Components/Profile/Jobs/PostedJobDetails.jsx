import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../../App";

const PostedJobDetails = ({ job }) => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const myPosted = state.myPostedJobs;
    const allJobs = state.allJobs;

    // setting up navigation
    const navigate = useNavigate();

    // mapping out applicants
    const applicants = job?.applicants?.map((user, index) => {
        return (
            <div className="applicant" key={index}>{user.username}</div>
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
                const newPosted = myPosted?.filter((job) => job._id !== data._id);
                const newJobs = allJobs?.filter((job) => job._id !== data._id)
                setState({...state, allJobs: newJobs, myPostedJobs: newPosted});
            } else {
                console.log("error:", data.error)
            }
        }
        catch (error) {
            console.log("error:", error);
        }
    };

    // function to edit job
    const editJob = () => {
        setState({...state, currEditJob: job});
        navigate("/user/edit/job")
    };

    // function to leave review
    const leaveReview = () => {
        setState({...state, currReviewing: job});
        navigate("/submit-review");
    }

    // function to see more details
    const seeDetails = () => {
        setState({...state, currViewedJob: job});
        navigate(`/user/postedjobs/${job._id}`);
    }

    return (
        <div id="pj-details">
            <h4>{job?.title?.toUpperCase()}</h4>
            <div id="job-content">
                <p id="jd">{job?.description}</p>
                {
                    job?.acceptedBy ?
                    <label>
                        SELECTED APPLICANT:
                        <p className="applicant">{job?.acceptedBy?.username}</p>
                    </label>
                    :
                    <label>
                        APPLICANTS:
                        <div id="applicants">
                            {
                                job?.applicants.length === 0 ?
                                <p id="no-msg">No Applicants</p> :
                                applicants
                            }
                        </div>
                    </label>
                }
                <div id="job-buttons">
                    {
                        job.acceptedBy ?
                        <>
                            <button onClick={seeDetails}>VIEW MORE DETAILS</button>
                            <button onClick={leaveReview}>REVIEW {job.acceptedBy.username.toUpperCase()}</button>
                        </>
                        :
                        <>
                            <button onClick={seeDetails}>VIEW MORE DETAILS</button>
                            <button onClick={editJob}>EDIT</button>
                            <button onClick={() => deleteJob(job._id)}>DELETE</button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default PostedJobDetails;