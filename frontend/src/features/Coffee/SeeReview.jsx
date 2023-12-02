import '../../components/css/CoffeeReviews.css'
import LikeButton from './LikeButton'



export default function SeeReview({coffee}) {
    console.log(coffee, 'this is what we start with')
    console.log(coffee.reviews, 'THESE SHOULD BE OUR REVIEWS')
    


    return (
        <>
        {coffee.reviews.length !== 0 ?
        <div className='reviews-container'>
            <h1> Reviews </h1>
            {coffee.reviews.map(( review, index ) => (
                <div key={index} className='review-container'>
                    <h5>{review.user.username}</h5>
                    <p>{review.text}</p>
                    <LikeButton review={review} isLiked={review.liked_by.some(username => username === localStorage.getItem('username'))}/>
                </div>
            ))}
        </div>
        :
        <div className="no-review-error">No Reviews to Display</div>
        }
        </>
    )
}