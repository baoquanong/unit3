const PostedJobDetails = ({ job, jobs, setPostedJobs }) => {
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
            <div className="applicant" key={index}>
                <p>{user.username}</p>
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