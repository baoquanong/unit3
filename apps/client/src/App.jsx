import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeLayout from "./Components/HomePage/HomeLayout";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignupPage from "./Components/SignupPage/SignupPage";
import Preferences from "./Components/SignupPage/Preferences";
import CreateJobs from "./Components/CreateJobs/CreateJobs";
import FindJobs from "./Components/FindJobs/FindJobs";
import JobDetails from "./Components/JobDetails/JobDetails";
import SideBar from "./Components/Profile/SideBar";
import Profile from "./Components/Profile/Profile";
import Reviews from "./Components/Profile/Reviews";
import EditProfile from "./Components/Profile/EditProfile";
import PostedJobs from "./Components/Profile/PostedJobs";
import Applications from "./Components/Profile/Applications";

export const DataContext = createContext();

const App = () => {
    // setting up global state
    const [state, setState] = useState({
        loggedIn: {}, // details of person who is logged in
        postedJobs: [],
        reviews: [],
        currViewedJob: {},
    });

    return (
        <div id="app">
            <DataContext.Provider value={{state, setState}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomeLayout />}>
                            <Route index element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/signup/preferences" element={<Preferences />} />
                        </Route>
                        <Route path="/" element={<Navbar />}>
                            <Route path="/jobs" element={<FindJobs />} />
                            <Route path="/jobs/create" element={<CreateJobs />} />
                            <Route path="/jobs/:id" element={<JobDetails />} />
                            <Route path="/user" element={<SideBar />}>
                                <Route index element={<Profile />} />
                                <Route path="/user/reviews" element={<Reviews />} />
                                <Route path="/user/edit" element={<EditProfile />} />
                                <Route path="/user/postedjobs" element={<PostedJobs />} />
                                <Route path="/user/appliedjobs" element={<Applications />} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </DataContext.Provider>
        </div>
    );
};

export default App;
