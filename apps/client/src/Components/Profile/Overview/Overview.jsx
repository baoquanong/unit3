import { useContext } from "react";
import { DataContext } from "../../../App";

import Profile from "./Profile";
import JobsOverview from "./JobsOverview";
import ReviewsOverview from "./ReviewsOverview";

const Overview = () => {
    // setting up state
    const { state, setState } = useContext(DataContext);
    
    // getting variables
    const currUser = JSON.parse(localStorage.getItem("currUser"));

    return (
        <div id="overview">
            {
               currUser === null ?
               <h1>PLEASE LOG IN TO VIEW YOUR PROFILE</h1> :
               <>
                    <Profile user={currUser} />
                    <div id="jobs-reviews">
                        <JobsOverview />
                        <ReviewsOverview user={currUser} />
                    </div>
               </>
            }
        </div>
    );
};

export default Overview;