import { coffeeFetch, userDataFetch } from "../api/dataApi"
import { useEffect, useState } from "react"
import Rating from '@mui/material/Rating';
import SeeReview from '../features/Coffee/SeeReview'
import AddCoffee from "../features/Coffee/AddCoffee"
import AddReview from "../features/Coffee/AddReview";
import EditReview from "../features/Coffee/EditReview";
import FavoriteButton from "../features/Coffee/FavoriteButton";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchBar from "../features/AutoFillSearch/SearchBar";
import '../index.css'

export default function Coffee() {
    const [ coffees, setCoffees ] = useState([])
    const [ addCoffeeForm, setAddCoffeeForm ] = useState(false)
    const [ openReviewIndex, setOpenReviewIndex] = useState (null)
    const [ addReviewForm, setAddReviewForm ] = useState(false)
    const [ editReviewForm, setEditReviewForm ] = useState(false)
    const [selectedCoffeeId, setSelectedCoffeeId] = useState(null);
    const [selectedUserReview, setSelectedUserReview] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [ favorites, setFavorites ] = useState(null)
    const [filteredCoffees, setFilteredCoffees] = useState([])

    const handleSearch = (filteredSuggestions) => {
        setFilteredCoffees(filteredSuggestions)
    }

    const handleClearSearch = () => {
        setFilteredCoffees([])
    }

    const getUserData = async () => {
        const fetchedData = await userDataFetch();
        setFavorites(fetchedData.favorites)
    }


    const handleAddCoffee = () => {
        setAddCoffeeForm(!addCoffeeForm)
        console.log(addCoffeeForm)
    }

    const handleAddReview = (coffeeId) => {
        console.log("Toggling addReviewForm");
        setSelectedCoffeeId(coffeeId)
        setAddReviewForm(!addReviewForm)
    }

    const handleEditReview = (coffeeId, userReview) => {
        setSelectedCoffeeId(coffeeId)
        setSelectedUserReview(userReview)
        setEditReviewForm(!editReviewForm)
    }

    useEffect(() => {
        getCoffeeData()
        const username = localStorage.getItem("username")
        setCurrentUser(username)
    }, [editReviewForm, addReviewForm])

    useEffect(() => {
        getUserData()
    }, [])



    const capitalizeWords = (str) => {
        return str
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      };

    const handleViewReviews = (index) => {
        if (index == openReviewIndex) {
            setOpenReviewIndex(null)
        } else {
            setOpenReviewIndex(index)
        }
    }

    const createCoffeeList = (selectedCoffees) => {
        return selectedCoffees.map( (coffee, index) => {
            const userReview = coffee.reviews.find(review => review.user.username === currentUser)
            const hasUserReview = !!userReview
            const isCoffeeFavorite = favorites && favorites.some((fav) => fav.id === coffee.id);


            const buttonHandler = hasUserReview ? () => handleEditReview(coffee.id, userReview) : () => handleAddReview(coffee.id)
            const buttonId = hasUserReview ? 'edit-review-button' : 'add-review-button'

            return (
                <div key={coffee.id}>
                    <div className="card mb-3 mx-auto rounded" style={{ maxWidth: '1200px', backgroundColor: 'rgba(180, 112, 52, 0.3)', border: '3px solid #3C180E', color: '#3C180E' }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={coffee.picture} className="img-thumbnail bg-warning-subtle rounded-start p-1 m-4" alt="Coffee Image" style={{ width: '250px', height: '250px'}}/>
                            </div>
                            <div className="col-md-8 d-flex flex-column">
                                <div className="card-body">
                                    <h5 className="card-title">{capitalizeWords(coffee.name)}</h5>
                                    <p className="card-text">{coffee.description}</p>
                                </div>
                                <div className="card-menu d-flex p-2 justify-content-between align-items-end">
                                    <div>
                                        <h4>{coffee.rating}<Rating name="read-only" value={parseInt(coffee.rating)} readOnly /></h4>
                                        <div className="caffeine-typography">
                                            <p>Caffeine: {coffee.caffeine}mg/Serving</p>
                                        </div>
                                    </div>
                                    <FavoriteButton coffee={coffee} isFavorite={isCoffeeFavorite} />
                                    <div>
                                        <button className='btn btn-link interactive-btn' onClick={() => handleViewReviews(index)}>
                                        {index === openReviewIndex ? 'Close Reviews' : 'See Reviews'}
                                        </button>
                                        <button type='button' className='btn btn-link interactive-btn' data-bs-toggle='modal' data-bs-target='#' id={buttonId} onClick={buttonHandler}>
                                        {hasUserReview ? 'Edit Review' : 'Add Review'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {openReviewIndex === index && (<SeeReview coffee={coffee} />)}
                </div>
            );
        });
    };

    const getCoffeeData = async () => {
        const fetchedCoffees = await coffeeFetch();
        setCoffees(fetchedCoffees)
    }

    return (
    <div className="coffee-page">
        <div className="d-flex justify-content-evenly align-items-center flex-column flex-md-row my-2">
            <div>
                <SearchBar state={coffees} setState={setCoffees} handleSearch={handleSearch} handleClearSearch={handleClearSearch}/>
            </div>
            <div>
            <button id='add-coffee-button'className="coffee-control-button" onClick={handleAddCoffee}><span className='coffee-control-icon'><AddCircleOutlineOutlinedIcon /></span> New Coffee</button>
            </div>
            </div>
    {filteredCoffees.length === 0 ? createCoffeeList(coffees) : createCoffeeList(filteredCoffees)}
    {addCoffeeForm && <AddCoffee handleAddCoffee={handleAddCoffee} getCoffeeData={getCoffeeData}/>}
    {addReviewForm && <AddReview handleAddReview={handleAddReview} coffeeId={selectedCoffeeId} />}
    {editReviewForm && <EditReview handleEditReview={handleEditReview} coffeeId={selectedCoffeeId} selectedUserReview={selectedUserReview} editReviewForm={editReviewForm}/>}
    </div>)
}