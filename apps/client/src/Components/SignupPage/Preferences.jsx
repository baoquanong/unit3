import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../App";

const Preferences = () => {
    // setting up context
    // const { state, setState } = useContext(DataContext);
    // const currUserInfo = state.loggedIn;

    // setting up localStorage
    const user = JSON.parse(localStorage.getItem("currUser"));

    // setting up navigation
    const navigate = useNavigate();

    // function to handle onSubmit
    const handleSubmit = async (event) => {
        event.preventDefault();

        // formatting data from form to fit format required by schema
        const userData = Object.fromEntries(new FormData(event.target));
        const userSkills = Object.keys(userData);
        userSkills.pop();

        const userPrefs = {
            skills: userSkills,
            description: userData.description,
            img: `https://api.multiavatar.com/${user.username}.png`
        };

        try {
            const response = await fetch(`/api/users/preferences/${user._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userPrefs),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("successfully updated user details!");
                // setState({...state, loggedIn: data.userInfo});
                localStorage.setItem("currUser", JSON.stringify(data));
                navigate("/user");
            } else {
                console.log("data error:", data.error);
            }
        }
        catch (error) {
            console.log("error:", error);
        }
    };

    return (
        <div id="preferences">
            <form
                id="preferences-form"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <h1>WELCOME, {user.username.toUpperCase()}</h1>
                <p>
                    Tell us more about yourself and what you're looking for! <br />
                    Your preferences can always be updated later in your profile
                </p>
                <section id="interests">
                    <legend>These are my skills:</legend>
                    <div id="check-inputs">
                        <label>
                            <input type="checkbox" name="Handywork" />
                            Handywork
                        </label>
                        <label>
                            <input type="checkbox" name="Cleaning" />
                            Cleaning
                        </label>
                        <label>
                            <input type="checkbox" name="Caregiving" />
                            Caregiving
                        </label>
                        <label>
                            <input type="checkbox" name="Pets" />
                            Pets
                        </label>
                        <label>
                            <input type="checkbox" name="Events" />
                            Events
                        </label>
                        <label>
                            <input type="checkbox" name="Education" />
                            Education
                        </label>
                    </div>
                </section>
                <label id="description">
                    A little bit about myself/my skills:
                    <textarea type="text" name="description" />
                </label>
                <button>Create My Account</button>
            </form>
        </div>
    );
};

export default Preferences;