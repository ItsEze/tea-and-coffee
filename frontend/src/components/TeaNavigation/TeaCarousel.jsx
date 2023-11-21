import { useEffect, useState, useContext } from 'react'
import '../css/TeaCarousel.css'
import { teaFetch } from '../../api/dataApi';
import DetailedView from './DetailedView';
import UserContext from '../../contexts/UserContext';
import SkeletonTeaCarousel from '../Skeletons/SkeletonTeaCarousel';

export default function TeaCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [teaData, setTeaData] = useState([]) 
  const [selectedTea, setSelectedTea] = useState(null)
  const teasPerPage = 3;
  const userToken = useContext(UserContext)

  useEffect(() => {
    async function fetchTeas() {
      const data = await teaFetch()
      console.log(data)
      setTeaData(data)
    } 
    if (userToken) {
      fetchTeas()
    }
  }, [userToken])


  const nextPage = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % teaData.length
    );
  };

  const prevPage = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + teaData.length) % teaData.length 
    );
  };

  const handleDetailView = (tea) => {
    console.log(tea)
    setSelectedTea(tea)
  }

  if (teaData.length === 0 ) {
    return <SkeletonTeaCarousel />
  }

  return (
    !selectedTea ? (
      <div className='tea-carousel-page'>
        <button onClick={prevPage}>Previous</button>
        <div className='tea-card-container'>
          {[...teaData, ...teaData].slice(currentIndex, currentIndex + teasPerPage).map((tea, index) => (
            <div className={`tea-card ${index === 1 ? 'middle-tea-card' : ''}`} onClick={() => handleDetailView(tea)} key={index}>
              <img className='teaImage' src={tea.image} alt={tea.name} />
              <p className='teaName'>{tea.name}</p>
            </div>
          ))}
        </div>
        <button onClick={nextPage}>Next</button>
      </div>
    ) : (
      <div>
        <DetailedView selectedTea={selectedTea} setSelectedTea={setSelectedTea}/>
      </div>
    )
  );
} 