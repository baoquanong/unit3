import { useContext, useState } from "react";

import { DataContext } from "../../App";
import "./EditProfile.css";

const EditProfile = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const originalInfo = structuredClone(state.loggedIn);

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
                    // checked={skills[{skill}]}
                    // onChange={handleCheckChange}
                />
                {skill}
            </label>
        );
    });

    // function to update profile information
    const handleUpdate = async (event) => {
        event.preventDefault();

        const userData = Object.fromEntries(new FormData(event.target));
        console.log("userData:", userData);

        const userKeys = Object.keys(userData).sort();
        console.log("userKeys:", userKeys);
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
                            name="username"
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
                        onChange={() => handleEdits(event, "description")}
                    />
                </label>
                <button id="update-btn">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;