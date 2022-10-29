import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../App";

const Preferences = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);

    return (
        <div id="preferences">
            <form id="preferences-form" autoComplete="off">
                <h1>PREFERENCES</h1>
                <p>
                    Tell us more about yourself and what you're looking for! <br />
                    Your preferences can always be updated later in your profile
                </p>
                <section id="interests">
                    <legend>I'm interested in helping/looking for help in these areas:</legend>
                    <div id="check-inputs">
                        <label>
                            <input type="checkbox" name="handywork" />
                            Handywork
                        </label>
                        <label>
                            <input type="checkbox" name="cleaning" />
                            Cleaning
                        </label>
                        <label>
                            <input type="checkbox" name="caregiving" />
                            Caregiving
                        </label>
                        <label>
                            <input type="checkbox" name="pets" />
                            Pets
                        </label>
                        <label>
                            <input type="checkbox" name="events" />
                            Events
                        </label>
                        <label>
                            <input type="checkbox" name="education" />
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