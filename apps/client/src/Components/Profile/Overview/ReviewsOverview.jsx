import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../../App";

const ReviewsOverview = ({ user }) => {
    // set up context
    const { state, setState } = useContext(DataContext);
    const myReviews = state.myReviews;

    // setting up navigation
    const navigate = useNavigate();

    // setting up state
    const [reviews, setReviews] = useState([]);

    // function to get all reviews
    const getReviews = async () => {
        try {
            const response = await fetch(`/api/reviews/${user._id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                console.log("successfully fetched reviews!");
                console.log("your reviews:", data);
                setState({...state, myReviews: data});
            } else {
                console.log("error:", data.error);
            }
        }
        catch (error) {
            console.log("error:", error);
        }
    };

    useEffect(() => {
        getReviews();
    }, []);

    // mapping out posted reviews
    const overview = myReviews?.map((review, index) => {
        return (
            <div className="review-overview" key={index}>
                <p id="msg">{review.message}</p>
                <p id="posted-by">Posted By: {review.postedBy.username}</p>
            </div>
        );
    });

    return (
        <div id="reviews-overview">
            <div className="jr-header" id="review-header">
                <h1>REVIEWS</h1>
                <p id="static">HERE'S WHAT OTHERS HAD TO SAY ABOUT YOU...</p>
            </div>
            <div className="listing" id="reviews">
                <div id="review-listing">
                    {
                        myReviews.length === 0 ?
                        <p className="no-msg">NO REVIEWS POSTED YET!</p> :
                        overview
                    }
                </div>
            </div>
        </div>
    );
};

export default ReviewsOverview;