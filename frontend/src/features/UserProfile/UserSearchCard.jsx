import ReviewList from "../Favorites/ReviewList";
export default function UserSearchCard( { favorites, handleReviews, handleLikes, toggleListVisibility, isListVisible, reviews  }) {
  const capitalizeWords = (str) => {
      return str
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

  return (
      <>
      {favorites &&
        favorites?.map((coffee) => (
          <div key={coffee.id} className="col-lg-12 mb-4 ">
            <div className="card h-100">
              <div className="row g-0 bg-warning-subtle">
                {/* Thumbnail */}
                <div className="col-md-2">
                  <img
                    src={coffee.picture}
                    alt={coffee.name}
                    style={{height: '200px'}}
                    className="img-thumbnail"
                  />
                </div>
                {/* Card Body */}
                <div className="col-md-8 mx-auto">
                  <div className="card-body d-flex flex-column h-100">
                    {/* Title */}
                    <h5 className="card-title">
                      {capitalizeWords(coffee.name)}
                    </h5>
                    {/* Description (visible only on large screens) */}
                    <p className="card-text d-none d-md-block">
                      {coffee.description}
                    </p>
                    {/* Reviews, Likes, Remove (visible on small screens) */}
                    <div className="mt-auto">
                      <div className="d-flex">
                        <button className="btn btn-primary me-2" onClick={()=> handleReviews(coffee.reviews)}>
                          Reviews
                        </button>
                        <button className="btn btn-success mr-2" onClick={() => handleLikes(coffee)}>Likes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  
        ))}
        {isListVisible && (
      <div>
      <ReviewList reviews={reviews} toggleListVisibility={toggleListVisibility}/>
      </div>
    )}
      </>
  ) 
}