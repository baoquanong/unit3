import { Outlet, useNavigate } from "react-router-dom";

import "./SideBar.css";

const SideBar = () => {
    // setting up navigation
    const navigate = useNavigate();

    return (
        <div id="side-bar">
            <div id="profile-tabs">
                <div
                    className="tab-div"
                    onClick={() => navigate("/user")}
                >
                    <h3>INFORMATION</h3>
                </div>
                <div
                    className="tab-div"
                    onClick={() => navigate("/user/reviews")}
                >
                    <h3>REVIEWS</h3>
                </div>
                <div className="tab-div">
                    <h3>JOBS</h3>
                    <p onClick={() => navigate("/user/postedjobs")}>Posted By Me</p>
                    <p>My Applications</p>
                    <p>Favourites</p>
                </div>
                <div
                    className="tab-div"
                    onClick={() => navigate("/user/reviews")}
                >
                    <h3>REQUESTS</h3>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default SideBar;