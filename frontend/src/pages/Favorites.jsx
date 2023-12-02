import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { userDataFetch, removeFavorite } from '../api/dataApi';

export default function Favorites(){
    const [ userData, setUserData ] = useState(null)
    const [ favorites, setFavorites ] = useState(null)
    const [ selectedCoffee, setSelectedCoffee ] = useState([])
    const [ likesTotalList, setLikesTotalList ] = useState([])
    const [ likesTotalCount, setLikesTotalCount ] = useState(0)
    const [ showLikesInfo, setShowLikesInfo ] = useState(false)
    
    console.log(userData, 'our userData')

    const handleReviews = (reviews) => {
        console.log('handlin')
        console.log(reviews, 'THESE ARE REVIEWS')
    }

    const handleClose = () => {
        setShowLikesInfo(false);
      };
      console.log('status of showlikes', showLikesInfo)
    

    const handleLikes = (coffee) => {
        setSelectedCoffee(coffee)
        const reviews = coffee.reviews
        const uniqueUsernames = new Set();
    
        reviews.forEach((review) => {
            if (review.liked_by && review.liked_by.length > 0) {
                review.liked_by.forEach((username) => {
                    uniqueUsernames.add(username);
                });
            }
        });
    
        setLikesTotalList([...uniqueUsernames]); // Convert Set to an array if needed
        setLikesTotalCount(uniqueUsernames.size); // Get the count of unique usernames
        setShowLikesInfo(true)
        
        console.log(likesTotalList, 'this is total likes in state')
        console.log(likesTotalCount, 'this is our count in state')
    };

    const capitalizeWords = (str) => {
        return str
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      };

    const getUserData = async () => {
        const fetchedData = await userDataFetch();
        setUserData(fetchedData)
        setFavorites(fetchedData.favorites)
    }

    const removeFromFavorites = async (coffeeId) => {
        await removeFavorite(coffeeId)
        setFavorites((prevFavorites) => prevFavorites.filter((coffee) => coffee.id !== coffeeId));
    }
    
    console.log(favorites, 'THESE ARE FAVORITES MY FAVORITES')
    useEffect(() => {
        getUserData()
    }, [])

    console.log(getUserData)



    return (
        <div className='container' style={{ maxWidth: '70%' }}>
        <h2>Search to find what other users have added to their favorites list!</h2>
        <input></input>
        {showLikesInfo && (
  <div className="modal-favorites">
    <div className="modal-content">
      <span className="close" onClick={handleClose}>
        &times;
      </span>
      <h6>{capitalizeWords(selectedCoffee.name)}</h6>
      <p>Total Likes: {likesTotalCount}</p>
      <p>Liked by: {likesTotalList.join(', ')}</p>
    </div>
  </div>
)}
      <div className="row">
        {userData &&
          favorites &&
          favorites?.map((coffee) => (
            <div key={coffee.id} className="col-lg-12 mb-4">
              <div className="card h-100">
                <div className="row g-0">
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
                          <div className="flex-grow-1"></div>{" "}
                          {/* This will push the "Remove" button to the right */}
                          <button className="btn btn-danger" onClick={() => removeFromFavorites(coffee.id)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      

    </div>
  );
}