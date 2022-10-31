import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateJobs from "./Components/CreateJobs/CreateJobs";
import FindJobs from "./Components/FindJobs/FindJobs";
import JobDetails from "./Components/JobDetails/JobDetails";

import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignupPage from "./Components/SignupPage/SignupPage";
import Preferences from "./Components/SignupPage/Preferences";
import Profile from "./Components/Profile/Profile";

export const DataContext = createContext();

const App = () => {
  // setting up state
  const [state, setState] = useState({
    currSignupInfo: {}, // info of person currently in signup process
    currUserInfo: {
      // user info of person currently logged in
      email: "sally@mail.com",
      username: "Sally Ng",
      password: "secret",
      interests: ["Handywork", "Elderly"],
      aboutMe:
        "Currently live with and take care of my Grandparents. Am able to do simple handywork and minor repairs",
    },
  });

  return (
    <div id="app">
      <DataContext.Provider value={{ state, setState }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signup/preferences" element={<Preferences />} />
              <Route path="/jobs" element={<FindJobs />} />
              <Route path="/jobs/create" element={<CreateJobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user" element={"My User Page"} />
              <Route path="/user/info" element={"My User Info"} />
              <Route path="/user/jobs" element={"My Job Info"} />
              <Route path="/user/reviews" element={"My User Reviews"} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataContext.Provider>
    </div>
  );
};

export default App;
