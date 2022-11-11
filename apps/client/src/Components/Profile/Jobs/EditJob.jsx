import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../../App";
import "./EditJob.css";

const EditJob = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const job = state.currEditJob;
    const myPosted = state.myPostedJobs;

    // variables
    const currUser = JSON.parse(localStorage.getItem("currUser"));
    const today = new Date();

    // setting up navigation
    const navigate = useNavigate();

    // function to handle onChange
    const handleChange = (event, field) => {
        console.log(event.target.value);
        setState({...state, currEditJob: {
            ...job,
            [`${field}`]: event.target.value
        }});
    };

    // function to edit job
    const editJob = async (event) => {
        event.preventDefault();


        try {
            const response = await fetch(`/api/jobs/edit/${job._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(job),
            });
            
            const data = await response.json();

            if (response.ok) {
                console.log("successfully updated job!");
                console.log("updated job:", data);

                const newPosted = myPosted.filter((j) => j._id !== job._id);
                newPosted.unshift(job);

                setState({...state, myPostedJobs: newPosted});

                navigate("/user/postedjobs");
            } else {
                console.log("error:", data.error)
            }
        }
        catch (error) {
            console.log("error:", error)
        }
    };

    return (
        <div id="edit-job-page">
            <h1>EDIT JOB</h1>
            <div id="edit-job">
                <form id="edit-job-form" onSubmit={editJob} autoComplete="off">
                    <div id="job-name">
                        <label>
                            JOB TITLE:
                            <textarea
                            type="text"
                            name="title"
                            required={true}
                            value={job?.title}
                            onChange={() => handleChange(event, "title")}
                            />
                        </label>
                        <label required={true}>
                            DESCRIPTION:
                            <textarea
                            rows="10"
                            cols="30"
                            name="description"
                            required={true}
                            value={job?.description}
                            onChange={() => handleChange(event, "description")}
                            />
                        </label>
                    </div>
                    <div id="job-logs">
                        <label>
                            JOB TYPE:
                            <select
                                name="type"
                                required={true}
                                value={job?.type}
                                onChange={() => handleChange(event, "type")}
                            >
                                <option>Select Type</option>
                                <option>Handywork</option>
                                <option>Caregiving</option>
                                <option>Events</option>
                                <option>Cleaning</option>
                                <option>Pets</option>
                                <option>Education</option>
                                <option>Others</option>
                            </select>
                        </label>
                        <label>
                            COMPENSATION:
                            <input
                                type="number"
                                name="price"
                                required={true}
                                value={job?.price}
                                onChange={() => handleChange(event, "price")}
                            />
                        </label>
                        <label>
                            LOCATION:
                                <input
                                type="text"
                                name="location"
                                required={true}
                                value={job?.location}
                                onChange={() => handleChange(event, "location")}
                            />
                        </label>
                    </div>
                    <div id="job-dates">
                        <label>
                            START DATE:
                            <input
                                type="date"
                                id="start"
                                value={job?.start?.slice(0, 10)}
                                onChange={() => handleChange(event, "start")}
                                min={`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`}
                            />
                        </label>
                        <label>
                            END DATE:
                            <input
                                type="date"
                                id="end"
                                value={job?.end?.slice(0, 10)}
                                onChange={() => handleChange(event, "start")}
                                min={`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`}
                            />
                        </label>
                    </div>
                    <button>UPDATE JOB</button>
                </form>
            </div>
            <button onClick={() => navigate("/user/postedjobs")}>BACK</button>
        </div>
    );
};

export default EditJob;