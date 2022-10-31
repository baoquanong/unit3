import { useContext } from "react";
import { DataContext } from "../../App";

const Reviews = () => {
    // setting up context
    const { state, setState } = useContext(DataContext);
    const user = state.currUserInfo;

    return (
        <div id="user-reviews">
            <h3>Here's what other users had to say about you!</h3>
            <div id="reviews">
                <div className="review">
                    <h4>Derek W.</h4>
                    <p className="hired">Hired Sally</p>
                    <p>Sally did a great job of checking in and sending food to my Mother when I was overseas. She even helped her to fix her TV remote. Would hire Sally again!</p>
                </div>
                <div className="review">
                    <h4>Aaron H.</h4>
                    <p className="hired">Hired Sally</p>
                    <p>Did a decent job, although not very familiar with more complicated repairs/work (as stated in her profile).</p>
                </div>
                <div className="review">
                    <h4>Mary T.</h4>
                    <p className="hired">Hired by Sally</p>
                    <p>Sally was responsive and gave clear instructions on what she needed me to do. Would work for her again!</p>
                </div>
                <div className="review">
                    <h4>Rachel L.</h4>
                    <p className="hired">Hired by Sally</p>
                    <p>Had a slight miscommunication but Sally was nice and we managed to resolve it properly.</p>
                </div>
                <div className="review">
                <h4>Megan N.</h4>
                    <p className="hired">Hired Sally</p>
                    <p>Told me she had experience with electrical rewiring but wasn't able to complete the job. 2 stars for service recovery as she recommended a replacement who turned out to be great and affordably priced.</p>
                </div>
            </div>
        </div>
    );
};

export default Reviews;