// import { useContext, useEffect } from "react";
// import { DataContext } from "../../../App";

// const Reviews = () => {
//     // setting up context
//     const { state, setState } = useContext(DataContext);
//     const user = state.loggedIn;

//     // function to fetch all reviews for a person
//     const getReviews = async () => {
//         try {
//             const response = await fetch(`/api/reviews/${user._id}`, {
//                 method: "GET",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 console.log("successfully fetched reviews!")
//                 console.log("reviews:", data);
//                 setState({...state, reviews: data});
//             } else {
//                 console.log("error:", data.error);
//             }
//         }
//         catch (error) {
//             console.log("error:", error);
//         }
//     };

//     useEffect(() => {
//         getReviews();
//     }, []);

//     // mapping out user reveiws
//     const userReviews = state.reviews.map((review, index) => {
//         return (
//             <div className="review" key={index}>
//                 <div>
//                     <h4>Posted By: {review.postedBy.username}</h4>
//                     <p className="rating">Rating: {review.rating}/5</p>
//                 </div>
//                 <p>{review.message}</p>
//             </div>
//         );
//     });

//     return (
//         <div id="user-reviews">
//             <h3>Here's what other users had to say about you!</h3>
//             <div id="reviews">
//                 {userReviews}
//             </div>
//         </div>
//     );
// };

// export default Reviews;