import { useState, useContext } from "react"
import UserContext from "../contexts/UserContext"
import AddProfile from "../features/UserProfile/AddProfile"
import defaultProfile from "../assets/logo_2b_720.png"

export default function Profile ( { getUserData }) {

    const {userData } = useContext(UserContext)
    const [ addProfileForm, setAddProfileForm ] = useState(false)
    const handleAddProfile = async () => {
        setAddProfileForm(!addProfileForm)
        // await getUserData()
    }
    console.log(userData, 'in Profile')
    return (
        <>
        <div className="container-fluid mt-4">
            </div>
            <div className="d-inline-flex flex-column ms-4">
            {userData?.picture ? (
      <img src={userData.picture} alt="profile pic" style={{ width: '200px' }} className="img-thumbnail round align-self-start" />
    ) : (
      <img src={defaultProfile} alt="placeholder" style={{ width: '200px', border: '3px solid #3C180E' }} className="img-thumbnail round align-self-start bg-warning-subtle mb-2" />
    )}

        <button id="add-coffee-button" className="align-self-center" onClick={handleAddProfile}>update profile</button>
        </div>
        {userData && (<>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-body rounded" style={{ backgroundColor: 'rgba(180, 112, 52, 0.5)', border: '3px solid #3C180E', color: '#3C180E'}}>
                        <h2 className="card-title ms-2">Username: {userData.username}</h2>
                        <h5 className="card-subtitle ms-4 mb-3">Name: {userData.first_name}</h5>
                        <h3 className="card-text p-4 ms-2">About Me: {userData.about_me}</h3>
                    </div>
                </div>
            </div>
            </>

        )}
        
        {addProfileForm && <AddProfile handleAddProfile={handleAddProfile} getUserData={getUserData}/>}
        </>
    )
}