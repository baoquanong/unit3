import { useContext } from "react";
import { DataContext } from "../../../App";

const PostedJobDetails = ({ job, jobs, setPostedJobs }) => {
    // setting up context
    // const { state, setState } = useContext(DataContext);

    // function to select user for a job
    const selectUser = async (id) => {
        try {
            const response = await fetch(`/api/jobs/update/${job._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ acceptedBy: id })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("successfully assigned job to user!");
                console.log("updated job info:", data);
            } else {
                console.log("error:", data.error);
            }
        }
        catch (error) {
            console.log("error:", error)
        }
    };

    // mapping out applicants
    const applicants = job.applicants.map((user, index) => {
        return (
            <div style={{display: "flex", gap: "10px"}}>
                <p key={index}>{user.username}</p>
                <button onClick={() => selectUser(user._id)}>Select</button>
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
        <div
            id="pj-details"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "200px",
                background: "lightblue",
                padding: "20px",
                borderRadius: "10px"
            }}
        >
            <h4 style={{margin: "0"}}>{job.jobDescription}</h4>
            <p>Job Type: {job.jobType}</p>
            <div style={{gap: "10px"}}>Applicants: {applicants}</div>
            <button onClick={() => deleteJob(job._id)}>Delete Job</button>
        </div>
    );
};

export default PostedJobDetails;