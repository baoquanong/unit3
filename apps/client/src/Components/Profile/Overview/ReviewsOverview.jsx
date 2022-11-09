import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReviewsOverview = ({ user }) => {
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
                setReviews(data);
                localStorage.setItem("currUserReviews", JSON.stringify(data));
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
    const reviewsArr = reviews.slice(0, 3);
    const overview = reviewsArr.map((review, index) => {
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
            </div>
            <div className="listing" id="reviews">
                <div id="review-listing">
                    {overview}
                </div>
            </div>
        </div>
    );
};

export default ReviewsOverview;