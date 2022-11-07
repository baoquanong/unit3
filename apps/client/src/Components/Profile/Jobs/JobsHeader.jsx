import { Link } from "react-router-dom";

const JobsHeader = () => {
    return (
        <div id="jobs-header">
            <Link to="/postedjobs">POSTED BY ME</Link>
            <Link to="/postedjobs">MY APPLICATIONS</Link>
            <Link to="/postedjobs">CALENDAR VIEW</Link>
        </div>
    );
};

export default JobsHeader;