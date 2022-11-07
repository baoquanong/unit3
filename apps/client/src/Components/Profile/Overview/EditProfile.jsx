import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { DataContext } from "../../../App";
import "./EditProfile.css";

const EditProfile = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const originalInfo = structuredClone(state.loggedIn);

    // setting up navigation
    const navigate = useNavigate();

    // setting up state
    const [edits, setEdits] = useState(originalInfo);

    // function to handleChange
    const handleChange = (event, field) => {
        setEdits({...edits, [`${field}`]: event.target.value});
    };

    // mapping skills array
    const skills = ["Handywork", "Cleaning", "Caregiving", "Pets", "Events", "Education"];
    const skillsInput = skills.map((skill, index) => {
        return (
            <label key={index}>
                <input
                    type="checkbox"
                    name={skill}
                />
                {skill}
            </label>
        );
    });

    // function to update profile information
    const handleUpdate = async (event) => {
        event.preventDefault();

        // formatting inputs
        const userData = Object.fromEntries(new FormData(event.target));
        const userKeys = Object.keys(userData).sort().reverse().splice(4);
        edits.skills = userKeys;
        
        const url = "/api/users/" + edits._id;

        try {
          const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(edits),
          });

          const data = await response.json();

          if (response.ok) {
            console.log("info successfully updated");
            setState({...state, loggedIn: edits});
            navigate("/user");
          }
        }
        catch (error) {
            console.log("error");
        }
    };

    return (
        <div id="edit-profile">
            <h1>EDIT PROFILE</h1>
            <form id="edit-profile-form" onSubmit={handleUpdate}>
                <img src={edits?.img} />
                <section id="edit-info">
                    <label>
                        Email:
                        <input
                            type="text"
                            name="email"
                            value={edits?.email}
                            onChange={() => handleChange(event, "email")}
                        />
                    </label>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={edits?.username}
                            onChange={() => handleChange(event, "username")}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={edits?.password}
                            onChange={() => handleChange(event, "password")}
                        />
                    </label>
                </section>
                <section id="skills">
                    <legend>Skills:</legend>
                    <div id="edit-skills">
                        {skillsInput}
                    </div>
                </section>
                <label id="description">
                    About Me:
                    <textarea
                        type="text"
                        name="description"
                        value={edits?.description}
                        onChange={() => handleChange(event, "description")}
                    />
                </label>
                <button id="update-btn">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;