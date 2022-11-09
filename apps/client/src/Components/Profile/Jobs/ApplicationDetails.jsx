const ApplicationDetails = ({ job }) => {
    // setting up variables
    const user = JSON.parse(localStorage.getItem("currUser"));

    return (
        <div className="applied">
            <h4>{job?.jobTitle.toUpperCase()}</h4>
            <p>
                <span>DESCRIPTION:</span>
                {job?.jobDescription}
            </p>
            <p>
                <span>DATE:</span>
                {job?.jobStart.slice(0, 10)} to {job?.jobEnd.slice(0, 10)}
            </p>
            <p>
                <span>POSTED BY:</span>
                {job?.postedBy?.username}
            </p>
            {
                job.status === open ?
                <p id="pending">PENDING RESULTS</p> :
                <>
                    {
                        job.acceptedBy._id === user._id ?
                        <p id="selected">SELECTED</p> :
                        <p id="not-selected">NOT SELECTED</p>
                    }
                </>
            }
        </div>
    );
};

export default ApplicationDetails;