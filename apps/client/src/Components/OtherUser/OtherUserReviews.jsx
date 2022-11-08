import { useEffect, useState } from "react";

const OtherUserReviews = ({ id }) => {
    // setting up state for reviews
    const [reviews, setReviews] = useState([]);

    // function to fetch user reviews
    const getReviews = async () => {
        try {
            const response = await fetch(`/api/reviews/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log("fetched reviews!");
                console.log("reviews:", data);
                setReviews(data);
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

    const mappedReviews = reviews.map((review, index) => {
        return (
            <div className="review" key={index}>
                <p id="msg">{review.message}</p>
                <p id="posted-by">Posted By: {review.postedBy.username}</p>
            </div>
        );
    });

    return (
        <div id="other-reviews">
            <h2>REVIEWS</h2>
            <div id="listing">
                {
                    reviews.length === 0 ?
                    <p>No reviews about this user yet!</p> :
                    mappedReviews
                }
            </div>
        </div>
    );
};

export default OtherUserReviews;