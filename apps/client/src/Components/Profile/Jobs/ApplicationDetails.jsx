const ApplicationDetails = ({ job }) => {
    // setting up variables
    const user = JSON.parse(localStorage.getItem("currUser"));

    return (
        <div className="applied">
            <h4>{job?.title?.toUpperCase()}</h4>
            <div id="applied-content">
                <p id="jd">{job?.description}</p>
                <p id="duration">{job?.start?.slice(0, 10)} to {job?.end?.slice(0, 10)}</p>
                <p>${job?.price}</p>
                <p>Singapore {job?.location}</p>
                <p id="poster">Posted by {job?.postedBy?.username}</p>
                {
                    job?.status === open ?
                    <p id="pending">PENDING RESULTS</p> :
                    <>
                        {
                            job?.acceptedBy?._id === user?._id ?
                            <p id="selected">SELECTED</p> :
                            <p id="not-selected">NOT SELECTED</p>
                        }
                    </>
                }
            </div>
        </div>
    );
};

export default ApplicationDetails;