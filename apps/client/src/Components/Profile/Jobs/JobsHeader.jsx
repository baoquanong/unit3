import { Link } from "react-router-dom";

const JobsHeader = () => {
    return (
        <div id="jobs-header">
            <Link to="/user/postedjobs">POSTED BY ME</Link>
            <Link to="/user/appliedjobs">MY APPLICATIONS</Link>
        </div>
    );
};

export default JobsHeader;