import { coffeeFetch, userDataFetch } from "../api/dataApi"
import { useEffect, useState } from "react"
import Rating from '@mui/material/Rating';
import SeeReview from '../features/Coffee/SeeReview'
import AddCoffee from "../features/Coffee/AddCoffee"
import AddReview from "../features/Coffee/AddReview";
import EditReview from "../features/Coffee/EditReview";
import FavoriteButton from "../features/Coffee/FavoriteButton";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SearchBar from "../features/AutoFillSearch/SearchBar";
import SearchIcon from '@mui/icons-material/Search';
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

    console.log(coffees, 'THESE ARE COFFEES')

    // const currentUser = localStorage.getItem("username")

    console.log(favorites, 'THIS IS FAVORITES')

    const handleAddCoffee = () => {
        setAddCoffeeForm(!addCoffeeForm)
        console.log(addCoffeeForm)
    }
    console.log('rendering coffee')

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

                <div key={index}>
                    <div className="coffee-card">
                        <div className="coffee-header-image">
                            <img className="img-fluid" src={coffee.picture}/>
                        </div>
                        <div className="coffee-interactive-info">
                            <h1>{capitalizeWords(coffee.name)}</h1> 
                            <p>{coffee.description}</p>
                            <div className="interactive-footer">
                                <h4>{coffee.rating}<Rating name="read-only" value={coffee.rating}readOnly/></h4>
                                <div className="caffeine-typography">
                                <h4>Caffeine:</h4>
                                <h4>{coffee.caffeine}mg/Serving</h4>
                                </div>
                                <FavoriteButton coffee={coffee} isFavorite={isCoffeeFavorite}/>
                                <h4 className='interactive-h4' onClick={() => handleViewReviews(index)}> {index == openReviewIndex ? 'Close Reviews' : 'See Reviews'}</h4>
                                <h4 className='interactive-h4' id={buttonId} onClick={buttonHandler}>

                                    {hasUserReview ? 'Edit Review' : 'Add Review'}
                                </h4>
                            </div>
                        </div>
                    </div>
                {openReviewIndex == index && (<SeeReview coffee={coffees[openReviewIndex]}/>)}
                </div>
                )
            })
        }

    const getCoffeeData = async () => {
        const fetchedCoffees = await coffeeFetch();
        setCoffees(fetchedCoffees)
    }

    return (
    <div className="coffee-page">
    <div className="add-a-coffee">
        <div className="add-a-coffee-left">
        <h4>Welcome to the Echo Coffee Co.!</h4>
        <ul>
            <li>Browse our coffee database</li>
            <li>Add your own coffees to the database</li>
            <li>Favorite, Leave reviews, and interact with the community!</li>
        </ul>
        </div>
        <div className="add-a-coffee-right">
        <button id='add-coffee-button'className="coffee-control-button" onClick={handleAddCoffee}><span className='coffee-control-icon'><AddCircleOutlineOutlinedIcon /></span> New Coffee</button>
        {/* <button className="coffee-control-button"><AutoAwesomeOutlinedIcon /> Suggest a feature</button> */}
        <button className="coffee-control-button"><span className='coffee-control-icon'><AutoAwesomeOutlinedIcon /></span> Suggest a feature</button>
        <SearchBar state={coffees} setState={setCoffees} handleSearch={handleSearch} handleClearSearch={handleClearSearch}/>
        </div>
    </div>

    {filteredCoffees.length === 0 ? createCoffeeList(coffees) : createCoffeeList(filteredCoffees)}
    {addCoffeeForm && <AddCoffee handleAddCoffee={handleAddCoffee}/>}
    {addReviewForm && <AddReview handleAddReview={handleAddReview} coffeeId={selectedCoffeeId} />}
    {editReviewForm && <EditReview handleEditReview={handleEditReview} coffeeId={selectedCoffeeId} selectedUserReview={selectedUserReview} editReviewForm={editReviewForm}/>}
   

    </div>)
}