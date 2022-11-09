import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../App";
import "./SubmitReview.css";

const SubmitReview = () => {
    // setting up variables
    const ratings = [1, 2, 3, 4, 5];

    // setting up context
    const { state, setState } = useContext(DataContext);
    const reviewing = state.currReviewing;

    // setting up navigate
    const navigate = useNavigate();

    // setting up state
    const poster = JSON.parse(localStorage.getItem("currUser"));

    const [review, setReview] = useState({
        postedBy: poster._id,
        postedFor: reviewing.acceptedBy._id,
        job: reviewing._id,
        message: "",
        rating: 0,
    });

    const [error, setError] = useState("");

    // function to detect change
    const handleChange = (event) => {
        setReview({...review, message: event.target.value});
    };

    // function to handle submit
    const submitReview = async (event) => {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target));
        review.rating = parseInt(data.rating);
        console.log("review:", review);

        const form = document.querySelector("form");
        form.reset();

        try {
            const response = await fetch("/api/reviews/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(review),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("successfully added review");
                console.log("review:", data);
                alert("successfully added review!");
            } else {
                console.log("error:", data.error);
                setError(data.error);
            }
        }
        catch (error) {
            console.log("error:", error);
        }
    };

    return (
        <div id="review-page">
            <img src="https://storage.googleapis.com/gd-wagtail-prod-assets/original_images/design_reviews_going_beyond_the_surface_2x1.jpg" />
            <h1>LEAVE A REVIEW</h1>
            <p>
                We're glad you found someone suitable for the job! <br />
                Let them know how they did so that they'll do even better next time!
                <br />
                <br />
                Your review will be displayed on their public profile. <br />
                Please only leave a review if the job has been completed.
            </p>

            <form id="review-form" onSubmit={submitReview}>
                <div id="review-info">
                    <p>
                        <span>Currently Reviewing: </span>
                        {reviewing?.acceptedBy?.username.toUpperCase()}
                    </p>
                    <p>
                        <span>Job Done: </span>
                        {reviewing?.jobTitle.toUpperCase()}
                    </p>
                </div>
                <section>
                    <p>RATING:</p>
                    <div id="score-options">
                        {
                            ratings.map((rating, index) => {
                                return (
                                    <label key={index} className="score" htmlFor={rating}>
                                        <input type="radio" name="rating" value={rating} />
                                        {rating}
                                    </label>
                                )
                            })
                        }
                    </div>
                </section>
                <section>
                        <p>COMMENTS/FEEDBACK:</p>
                        <textarea
                            name="message"
                            value={review.message}
                            onChange={handleChange}
                        ></textarea>
                </section>
                {
                    error === "" ?
                    <></> :
                    <p id="error-msg">{error}</p>
                }
                <button>SUBMIT REVIEW</button>
            </form>
            <button onClick={() => navigate("/user/postedjobs")}>BACK TO JOBS</button>
        </div>
    );
};

export default SubmitReview;