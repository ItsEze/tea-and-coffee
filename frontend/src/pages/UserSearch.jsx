import { useState, useContext, useEffect } from "react"
import UserContext from "../contexts/UserContext"
import UserSearchCard from "../features/UserProfile/UserSearchCard";


export default function UserSearch () {
  const {userSearchData} = useContext(UserContext)
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState(null);
  const [selectedCoffee, setSelectedCoffee] = useState([]);
  const [likesTotalList, setLikesTotalList] = useState([]);
  const [likesTotalCount, setLikesTotalCount] = useState(0);
  const [showLikesInfo, setShowLikesInfo] = useState(false);
  const [isListVisible, setListVisible] = useState(false);

  const toggleListVisibility = () => {
    setListVisible(!isListVisible);
  };

  const handleReviews = (reviews) => {
    setReviews(reviews);
    toggleListVisibility();
  };

  const handleClose = () => {
    setShowLikesInfo(false);
  };

  const handleLikes = (coffee) => {
    setSelectedCoffee(coffee);
    const reviews = coffee.reviews;
    const uniqueUsernames = new Set();

    reviews.forEach((review) => {
      if (review.liked_by && review.liked_by.length > 0) {
        review.liked_by.forEach((username) => {
          uniqueUsernames.add(username);
        });
      }
    });

    setLikesTotalList([...uniqueUsernames]);
    setLikesTotalCount(uniqueUsernames.size);
    setShowLikesInfo(true);
  };

  const capitalizeWords = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    if (userSearchData) {
      // Set favorites to userSearchData.favorites
      setFavorites(userSearchData.favorites);

      // Set reviews by mapping over favorites and joining reviews
      const allReviews = userSearchData.favorites.flatMap(
        (favorite) => favorite.reviews || []
      );
      setReviews(allReviews);
    } else {
      // If userSearchData is not available, reset the state
      setFavorites(null);
      setReviews([]);
    }
  }, [userSearchData]);
    console.log(userSearchData, 'if this works...')
    console.log(userSearchData.favorites, 'these are the favorites supposably')
    return (
        <>
        <div className="container">
        <div className="flex-column">
        <h1 className="mt-4 mb-4">{userSearchData.username}</h1>
        <img src={userSearchData.picture} alt="Profile Pic" className="round img-fluid float-start" style={{width: '200px'}}/>
        </div>
        <div className="row">
        <h3 className="p-4 row m-4 text-start">{userSearchData.about_me}</h3>
        <h3>more info</h3>
        <h3>And even more info</h3>
        </div>
       
        </div>
        <div className="container" style={{ maxWidth: '70%' }}>
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
            <UserSearchCard
              favorites={favorites}
              handleReviews={handleReviews}
              handleLikes={handleLikes}
              isListVisible={isListVisible}
              toggleListVisibility={toggleListVisibility}
              reviews={reviews}
            />
        </div>
        </div>
        </>
    )
}