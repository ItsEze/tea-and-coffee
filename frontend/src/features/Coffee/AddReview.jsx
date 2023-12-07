import { useState, useContext, useRef, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { addCoffeeReview } from "../../api/dataApi";
import { Rating } from "@mui/material";

export default function AddReview({ coffeeId, handleAddReview }) {
  const navigate = useNavigate();
  const { userToken } = useContext(UserContext);
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState(null);

  const handleTextChange = (e) => setText(e.target.value);
  const handleRatingChange = (e) => setRating(parseInt(e.target.value));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      coffee_id: coffeeId,
      text: text,
      rating: rating,
    };

    console.log(reviewData)

    try {
      await addCoffeeReview(reviewData);
      // Optionally, you can navigate or update the UI in other ways
    } catch (error) {
      setErrors(error);
    } finally {
      handleAddReview()
  }
  };

  const handleOffClick = (event) => {
    const modalContent = document.querySelector('.modal-content')
    if (!modalContent.contains(event.target)) {
        handleAddReview()
    }
}

  return (
    <>
      <div className="modal-overlay" onClick={handleOffClick}>
        <div className="modal-content">
          <h1>Add a Review</h1>
          {errors && <h4>{JSON.stringify(errors)}</h4>}

          <div className="share-input">
          <Rating name='rating' value={rating} precision={1} onChange={handleRatingChange}/>
          </div>

          <div className="share-input">
            <textarea
              className="input-description"
              placeholder="Review Text"
              value={text}
              onChange={handleTextChange}
              rows={5}
            ></textarea>
          </div>

          <div className="share-submit">
            <button className="share-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

