import { useContext } from "react";
import { DataContext } from "../../../App";

import Profile from "./Profile";
import JobsOverview from "./JobsOverview";
import ReviewsOverview from "./ReviewsOverview";

const Overview = () => {
    // setting up state
    const { state, setState } = useContext(DataContext);

    const currUser = JSON.parse(localStorage.getItem("currUser"));

    return (
        <div id="overview">
            <Profile user={currUser} />
            <div id="jobs-reviews">
                <JobsOverview user={currUser} />
                <ReviewsOverview user={currUser} />
            </div>
        </div>
    );
};

export default Overview;