import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (
        <div id="home-layout">
            <div id="left">
                <p id="welcome">WELCOME TO YOUR</p>
                <h1><span>SIDE</span>HUSTLE</h1>
                <p id="connect">WHERE PEOPLE AND JOBS CONNECT</p>
            </div>
            <Outlet />
        </div>
    );
};

export default HomeLayout;