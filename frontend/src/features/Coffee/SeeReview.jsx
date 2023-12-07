import { Rating } from '@mui/material'
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
                    {console.log(review, 'this is the review object i am looking for. I want to plug in ratings')}
                    <div className='review-like'>
                    <LikeButton review={review} isLiked={review.liked_by.some(username => username === localStorage.getItem('username'))}/>
                    </div>
                    <div>
                    <h3 style={{padding: '0', margin: 0, borderBottom: '2px solid black'}}>{review.user.username} <Rating name="read-only" value={parseInt(review.rating)} readOnly /></h3>
                    <p style={{padding: '0', margin: 0, fontSize: '1.2rem'}}>{review.text}</p>
                    </div>
                </div>
            ))}
        </div>
        :
        <div className="no-review-error">No Reviews to Display</div>
        }
        </>
    )
}