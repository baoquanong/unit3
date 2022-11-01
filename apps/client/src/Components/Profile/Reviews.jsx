import { useContext } from "react";

import { DataContext } from "../../App";
import reviews from "./reviews";

const Reviews = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const user = state.currUserInfo;

    // mapping out user reveiws
    const userReviews = reviews.map((review, index) => {
        return (
            <div className="review" key={index}>
                <div>
                    <h4>{review.postedBy}</h4>
                    <p className="hired">
                        {review.type === "hired" ? "Hired Sally" : "Hired by Sally"}
                    </p>
                </div>
                <p className="rating">Rating: {review.stars}/5</p>
                <p>{review.review}</p>
            </div>
        );
    });

    return (
        <div id="user-reviews">
            <h3>Here's what other users had to say about you!</h3>
            <div id="reviews">
                {userReviews}
            </div>
        </div>
    );
};

export default Reviews;