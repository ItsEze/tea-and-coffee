import { useState, useContext, useRef, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { addCoffeeReview, editCoffeeReview, removeCoffeeReview } from "../../api/dataApi";
import { MdNoAdultContent } from "react-icons/md";

export default function EditReview({ coffeeId, handleEditReview, selectedUserReview, editReviewForm }) {
  const navigate = useNavigate();
  const { userToken } = useContext(UserContext);
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState(null);

  const deleteData = {
    coffee_id: coffeeId,
    pk: selectedUserReview.id,
  }

  console.log('this is my review object check it for pk', selectedUserReview)
  console.log(coffeeId, selectedUserReview.id)

  const handleDelete = async (deleteData) => {
    console.log(deleteData)
    console.log('The coffee id is', deleteData.coffee_id)
    console.log('The review id is', deleteData.pk)
    await removeCoffeeReview(deleteData)
    handleEditReview()
  }

  const handleTextChange = (e) => setText(e.target.value);
  const handleRatingChange = (e) => setRating(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      coffee_id: coffeeId,
      text: text,
      rating: rating,
      pk: selectedUserReview.id,
    };

    try {
      await editCoffeeReview(reviewData);
      // Optionally, you can navigate or update the UI in other ways
    } catch (error) {
        setErrors(error);
    } finally {
        handleEditReview()
    }
  };

    const handleOffClick = (event) => {
        const modalContent = document.querySelector('.modal-content')
        if (!modalContent.contains(event.target)) {
            handleEditReview()
        }
    }

  return (
    <>
      <div className="modal-overlay" onClick={handleOffClick}>
        <div className="modal-content">
        <button className="btn btn-danger" onClick={()=> handleDelete(deleteData)}>Delete Review</button>
          <h1>Edit Your Review</h1>
          {errors && <h4>{JSON.stringify(errors)}</h4>}
        

          <div className="share-input">
            <textarea
              className="input-description"
              placeholder="Review Text"
              value={text}
              onChange={handleTextChange}
            ></textarea>
          </div>

          <div className="share-input">
            <input
              placeholder="Rating"
              value={rating}
              onChange={handleRatingChange}
            ></input>
          </div>

          <div className="share-submit">
            <button className="share-button" onClick={handleSubmit}></button>
          </div>
        </div>
      </div>
    </>
  );
}