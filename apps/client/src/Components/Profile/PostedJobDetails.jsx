import { useContext } from "react";
import { DataContext } from "../../App";

const PostedJobDetails = ({ job, jobs, setPostedJobs }) => {
    // setting up context
    // const { state, setState } = useContext(DataContext);

    // mapping out applicants
    const applicants = job.applicants.map((user, index) => {
        return (
            <p key={index}>{user.username}</p>
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
            <div>Applicants: {applicants}</div>
            <button onClick={() => deleteJob(job._id)}>Delete Job</button>
        </div>
    );
};

export default PostedJobDetails;