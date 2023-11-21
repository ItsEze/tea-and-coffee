import '../css/Skeleton.css'



export default function SkeletonTeaCarousel() {
    return (
        <div className="tea-carousel-page">
            <div className="tea-card-container">
                <div className="skeleton-tea-card"></div>
                <div className="skeleton-middle-card"></div>
                <div className="skeleton-tea-card"></div>
            </div>
        </div>
    )
}