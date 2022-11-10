import { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeLayout from "./Archive/HomeLayout";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignupPage from "./Components/SignupPage/SignupPage";
import Preferences from "./Components/SignupPage/Preferences";

import Navbar from "./Components/Navbar/Navbar";
import CreateJobs from "./Components/CreateJobs/CreateJobs";
import FindJobs from "./Components/FindJobs/FindJobs";
import JobDetails from "./Components/JobDetails/JobDetails";

import Overview from "./Components/Profile/Overview/Overview";
import EditProfile from "./Components/Profile/Overview/EditProfile"

import PostedJobs from "./Components/Profile/Jobs/PostedJobs"
import EditJob from "./Components/Profile/Jobs/EditJob";
import Applications from "./Components/Profile/Jobs/Applications";
import SubmitReview from "./Components/SubmitReview/SubmitReview";

export const DataContext = createContext();

const App = () => {
    // setting up global state
    const [state, setState] = useState({
        allJobs: [], // state containing all jobs
        currViewedJob: {}, // contains details of job currently being viewed
        currViewedProfile: {}, // contains details of other user profile currently being viewed
        jobToAccept: {}, // contains details of job user is about to accept applicant for
        currReviewing: {}, // contains details of job user is leaving review for
        currEditJob: {}, // contains details of job currently being edited
    });

    return (
        <div id="app">
            <DataContext.Provider value={{state, setState}}>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/signup/preferences" element={<Preferences />} />
                        <Route path="/" element={<Navbar />}>
                            <Route path="/jobs" element={<FindJobs />} />
                            <Route path="/jobs/create" element={<CreateJobs />} />
                            <Route path="/jobs/:id" element={<JobDetails />} />
                            <Route path="/user" element={<Overview />} />
                            <Route path="/user/edit" element={<EditProfile />} />
                            <Route path="/user/postedjobs" element={<PostedJobs />} />
                            <Route path="/user/appliedjobs" element={<Applications />} />
                            <Route path="/submit-review" element={<SubmitReview />} />
                            <Route path="/user/edit/job" element={<EditJob />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </DataContext.Provider>
        </div>
    );
};

export default App;
