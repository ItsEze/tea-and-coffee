import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContext from './contexts/UserContext';
import ResponsiveAppBar from './features/AppBar/AppBar';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Coffee from './pages/Coffee';
import './index.css'
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import { userDataFetch, coffeeFetch } from './api/dataApi';
import Contacts from './pages/Contacts';
import UserSearch from './pages/UserSearch';

function App() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [userToken, setUserToken] = useState(null)
  const [checked, setChecked] = useState(false)
  const [signUp, setSignUp ] = useState(false)
  const [ userData, setUserData ] = useState(null)
  const [userSearchData, setUserSearchData ] = useState(null)
  const [ coffees, setCoffees ] = useState([])
  const [searchInfo, setSearchInfo] = useState("");

  const getCoffeeData = async () => {
    const fetchedCoffees = await coffeeFetch();
    setCoffees(fetchedCoffees)
}

  const getUserData = async () => {
    const fetchedData = await userDataFetch();
    setUserData(fetchedData)
}


  useEffect( () => {
    const token = localStorage.getItem("token")
    getUserData()
    getCoffeeData()
    console.log(token)
    if(token) {
      setUserToken(token)
    }

  }, [])
  
  const handleToken = (token, username) => {
    console.log("handleToken")
    setFormData({ username: '', password: '' })
    if (token) {
      localStorage.setItem("token", token)
      localStorage.setItem('username', username)
      setUserToken(token)
    }
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnClick = () => {
    setChecked(!checked);
  }

  const handleSignUp = () => {
    setSignUp(true)
  }

  const handleLogout = () => {
    var keyToRemove = 'token';
    var usernameKeyToRemove = 'username';
  localStorage.removeItem(keyToRemove);
  localStorage.removeItem(usernameKeyToRemove)
  setUserToken(false)
  setSignUp(false)
  }


  return (
    <>
    <UserContext.Provider value={{userToken, userData, setUserData, coffees, setCoffees, userSearchData, setUserSearchData , searchInfo, setSearchInfo}}>
      <Router>
        {userToken && (<ResponsiveAppBar handleLogout={handleLogout} />)}
        <Routes>
          <Route path="/" element={<Login setChecked={setChecked} checked={checked} handleOnClick={handleOnClick} handleInputChange={handleInputChange} formData={formData} handleToken={handleToken} token={userToken} signUp={signUp} handleSignUp={handleSignUp}/>} />
          <Route path="favorites" element={<Favorites/>}/>
          <Route path="profile" element={<Profile getUserData={getUserData}/>}/>
          <Route path="userSearch" element={<UserSearch />}/>
          <Route path="coffee" element={<Coffee />}/>
          <Route path="home" element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="contacts" element={<Contacts/>}/>
      </Routes>
      </Router>
      
      </UserContext.Provider>
    </>
  )
}

export default App
