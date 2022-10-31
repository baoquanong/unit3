import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateJobs from "./Components/CreateJobs/CreateJobs";
import FindJobs from "./Components/FindJobs/FindJobs";
import JobDetails from "./Components/JobDetails/JobDetails";

import Navbar from "./Components/Navbar/Navbar";

const App = () => {
  return (
    <div id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={"Home Page"} />
            <Route path="/jobs" element={<FindJobs/>} />
            <Route path="/jobs/create" element={<CreateJobs/>} />
            <Route path="/jobs/:id" element={<JobDetails/>} />
            <Route path="/user" element={"My User Page"} />
            <Route path="/user/info" element={"My User Info"} />
            <Route path="/user/jobs" element={"My Job Info"} />
            <Route path="/user/reviews" element={"My User Reviews"} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
