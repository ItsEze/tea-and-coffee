import { useState, useContext, useRef, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { addCoffeeReview } from "../../api/dataApi";
import { Rating } from "@mui/material";

export default function AddReview({ coffeeId, handleAddReview }) {
  const navigate = useNavigate();
  const { userToken, coffees } = useContext(UserContext);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(null);
  const [errors, setErrors] = useState(null);

  const capitalizeWords = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

 
  const coffee = coffees.find((coffee) => coffee.id === coffeeId);
  const coffeeName = coffee ? capitalizeWords(coffee.name) : "";
  console.log(coffeeName) 

  

  const handleTextChange = (e) => setText(e.target.value);
  const handleRatingChange = (e) => setRating(e.target.value);

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
    const modalContent = document.querySelector('.popup-addreview-center')
    if (!modalContent.contains(event.target)) {
        handleAddReview()
    }
}

  return (
    <>
      <div className="popup-overlay" onClick={handleOffClick}>
        <div className="rounded bg-warning-subtle p-4 popup-addreview-center">
          <h3 className="modal-title">Review {coffeeName}</h3>
          {errors && <h4>{JSON.stringify(errors)}</h4>}

          <div className="d-flex align-items-center my-2">
            <span className="fs-4 me-4">Rate this coffee:</span>
          <Rating name='rating' value={rating} precision={1} onChange={handleRatingChange}/>
          </div>

          <div className="">
            <textarea
              className="input-group-lg w-100 mt-2"
              placeholder="Review Text"
              value={text}
              onChange={handleTextChange}
              rows={5}
            ></textarea>
          </div>

          <div className="share-submit">
            <button className="btn btn-success" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

