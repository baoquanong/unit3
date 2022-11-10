import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { DataContext } from "../../../App";
import "./EditProfile.css";

const EditProfile = () => {
    // setting up navigation
    const navigate = useNavigate();

    // setting up state
    const original = JSON.parse(localStorage.getItem("currUser"));
    const [edits, setEdits] = useState(original);
    const [error, setError] = useState("");

    // function to handleChange
    const handleChange = (event, field) => {
        setEdits({...edits, [`${field}`]: event.target.value});
    };

    // function to handle checkBox change
    const handleCheckbox = (event) => {
        if (edits.skills.includes(event.target.name)) {
            const newSkills = edits.skills.filter((skill) => skill !== event.target.name);
            setEdits({...edits, skills: newSkills});
        } else {
            setEdits({...edits, skills: [...edits.skills, event.target.name]});
        }
    };

    // mapping skills array
    const skills = ["Handywork", "Cleaning", "Caregiving", "Pets", "Events", "Education"];
    const skillsInput = skills.map((skill, index) => {
        return (
            <label key={index} className="skills-checkbox">
                <input
                    checked={edits?.skills.includes(skill) ? true : false}
                    type="checkbox"
                    name={skill}
                    onChange={handleCheckbox}
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
        console.log("user data:", userData);
        const userKeys = Object.keys(userData).sort().reverse().splice(4);
        console.log(userKeys);
        edits.skills = userKeys;

        try {
          const response = await fetch(`/api/users/update/${edits._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(edits),
          });

          const data = await response.json();

          if (response.ok) {
            console.log("info successfully updated");
            console.log("new data:", data)
            localStorage.setItem("currUser", JSON.stringify(data));
            navigate("/user");
          } else {
            console.log("results:", data);
            // setError(data.error);
          }
        }
        catch (error) {
            console.log("error:", error);
        }
    };

    return (
        <div id="edit-profile">
            {
                original === null ?
                <h1>Please log in to edit your profile</h1> :
                <>
                    <h1>EDIT PROFILE</h1>
                    <form id="edit-profile-form" onSubmit={handleUpdate} autoComplete="off">
                        <div id="inputs">
                            <section id="edit-info">
                                <img src="https://api.multiavatar.com/Sally.png" />
                                <label>
                                    EMAIL:
                                    <input
                                        type="text"
                                        name="email"
                                        value={edits?.email}
                                        onChange={() => handleChange(event, "email")}
                                    />
                                </label>
                                <label>
                                    USERNAME:
                                    <input
                                        type="text"
                                        name="username"
                                        value={edits?.username}
                                        onChange={() => handleChange(event, "username")}
                                    />
                                </label>
                                <label>
                                    PASSWORD:
                                    <input
                                        type="password"
                                        name="password"
                                        value={edits?.password}
                                        onChange={() => handleChange(event, "password")}
                                    />
                                </label>
                            </section>
                            <section id="skills">
                                <legend>SKILLS:</legend>
                                <div id="edit-skills">
                                    {skillsInput}
                                </div>
                                <legend id="description">ABOUT ME:</legend>
                                <textarea
                                    type="text"
                                    name="description"
                                    value={edits?.description}
                                    onChange={() => handleChange(event, "description")}
                                />
                            </section>
                        </div>
                        {
                            error === "" ?
                            <></> :
                            <p id="error-msg">{error}</p>
                        }
                        <button id="update-btn">Update Profile</button>
                    </form>
                </>
            }
        </div>
    );
};

export default EditProfile;