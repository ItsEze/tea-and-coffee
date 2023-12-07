


export default function DeleteReview({handleDelete, deleteData, handleDeleteConfirmation}) {

    return (
        <div className="delete-container-overlay">
        <div className="delete-container">
        <p>Are you sure you want to delete your review?</p>
        <p>This action can't be reversed.</p>
        <div className="delete-review-popup-btns">
        <button className="cancel-review-popup-btn" onClick={() => handleDeleteConfirmation()}> Cancel </button>
        <button className="delete-review-popup-btn" onClick={() => handleDelete(deleteData)}> Confirm Delete </button>
        </div>
        </div>
        </div>
    )
}