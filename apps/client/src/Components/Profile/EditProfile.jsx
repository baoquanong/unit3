import { useContext, useState } from "react";

import { DataContext } from "../../App";

const EditProfile = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const originalInfo = structuredClone(state.loggedIn);

    // setting up state
    const [edits, setEdits] = useState(originalInfo);

    return (
        <div id="edit-profile">
            <h1>Edit Profile</h1>
            <form>
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={edits?.email}
                    />
                </label>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={edits?.username}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="username"
                        value={edits?.password}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="username"
                        value={edits?.password}
                    />
                </label>
            </form>
        </div>
    );
};

export default EditProfile;