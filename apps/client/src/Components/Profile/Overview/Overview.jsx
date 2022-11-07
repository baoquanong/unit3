import { useEffect, useState } from "react";

import Profile from "./Profile";
import JobsOverview from "./JobsOverview";

const Overview = () => {
    // setting up state
    const currUser = JSON.parse(localStorage.getItem("currUser"));
    const [user, setUser] = useState(currUser);

    return (
        <div id="overview">
            <Profile user={user} />
            <div id="jobs-reviews">
                <JobsOverview user={user} />
            </div>
        </div>
    );
};

export default Overview;