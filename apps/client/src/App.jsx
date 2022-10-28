import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignupPage from "./Components/SignupPage/SignupPage";

const App = () => {
    return (
        <div id="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route index element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/jobs" element={"Find Jobs Page"} />
                        <Route path="/jobs/create" element={"Create Job Page"} />
                        <Route path="/jobs/:id" element={"Job Detail Page"} />
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