import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useState } from 'react';
import { handleLikesFetch } from '../../api/dataApi';

export default function LikeButton({ review, isLiked }) {
    const [ like, setLike ] = useState(isLiked)
    const [ likesList, setLikesList ] = useState(review.liked_by)
 

    const handleLike = async (likeData) => {
        setLike(prevLike => !prevLike);
        const likes = await handleLikesFetch(likeData)
        setLikesList(likes.liked_by)
    }
    console.log(likesList, 'our running like list')

    const handleToggleLike = () => {
        handleLike(review.id)
        
  
    }
  
    return (
        <>
        <button onClick={handleToggleLike}>{like ? <ThumbUpIcon/> : <ThumbUpOffAltIcon />}</button>
        <p> Likes {likesList.length}</p>
        </>
    )
}