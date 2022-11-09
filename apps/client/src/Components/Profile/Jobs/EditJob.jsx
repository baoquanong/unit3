import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../App";

const EditJob = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const job = state.currEditJob;

    // setting up navigation
    const navigate = useNavigate();

    // function to handle onChange
    const handleChange = (event, field) => {
        console.log(event.target.value);
        setState({...state, currEditJob: {
            ...job,
            [`${field}`]: event.target.value
        }});
    };

    // function to update local storage array
    const updateLocal = (updatedJob) => {
        const jobs = JSON.parse(localStorage.getItem("currUserPostedJobs"));
        const filteredJobs = jobs.filter((j) => j._id !== updatedJob._id);
        filteredJobs.push(updatedJob);
        localStorage.setItem("currUserPostedJobs", JSON.stringify(filteredJobs));
    };

    // function to edit job
    const editJob = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/jobs/edit/${job._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(job),
            });
            
            const data = await response.json();

            if (response.ok) {
                console.log("successfully updated job!");
                console.log("updated job:", data);
                updateLocal(job);
                navigate("/user/postedjobs");
            } else {
                console.log("error:", data.error)
            }
        }
        catch (error) {
            console.log("error:", error)
        }
    };

    return (
        <div id="create-job">
            <form id="create-job-form" onSubmit={editJob} autoComplete="off">
                <div id="job-name">
                <label>
                    JOB TITLE:
                    <input
                    type="text"
                    name="jobTitle"
                    required={true}
                    value={job.jobTitle}
                    onChange={() => handleChange(event, "jobTitle")}
                    />
                </label>
                <label required={true}>
                    DESCRIPTION:
                    <textarea
                    rows="10"
                    cols="30"
                    name="jobDescription"
                    required={true}
                    value={job.jobDescription}
                    onChange={() => handleChange(event, "jobDescription")}
                    />
                </label>
                </div>
                <div id="job-logs">
                <label>
                    JOB TYPE:
                    <select name="jobType" required={true}>
                        <option>Select Type</option>
                        <option>Handywork</option>
                        <option>Caregiving</option>
                        <option>Events</option>
                        <option>Cleaning</option>
                        <option>Pets</option>
                        <option>Education</option>
                        <option>Others</option>
                    </select>
                </label>
                <label>
                    COMPENSATION:
                    <input
                    type="number"
                    name="jobPrice"
                    required={true}
                    value={job.price}
                    onChange={() => handleChange(event, "price")}
                    />
                </label>
                <label>
                    LOCATION:
                    <input
                    type="text"
                    name="location"
                    required={true}
                    value={job.location}
                    onChange={() => handleChange(event, "location")}
                    />
                </label>
                </div>
                <button>UPDATE JOB</button>
            </form>
        </div>
    );
};

export default EditJob;