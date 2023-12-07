import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function AddProfile( { handleAddProfile, getUserData }) {
    const navigate = useNavigate()
    const [ firstName , setFirstName ] = useState()
    const [ lastName, setLastName ] = useState()
    const [ picture, setPicture ] = useState()
    const [ aboutMe, setAboutMe ] = useState()
    const [errors, setErrors ] = useState()


    const handleFirstNameChange = (e) => setFirstName(e.target.value)
    const handleLastNameChange = (e) => setLastName(e.target.value)
    const handleAboutMeChange = (e) => setAboutMe(e.target.value)
    const handlePictureChange = (e) => setPicture(e.target.files[0])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const profileData = {
            first_name: firstName,
            last_name: lastName,
            picture: picture,
            about_me: aboutMe
        }
        console.log('what is profile data,', profileData)
        await addProfile(profileData)
        await handleAddProfile()
        await getUserData()
    }


    const addProfile = async (profileData) => {
        console.log(profileData, 'this is getting into addProfile')
        // const base_url = import.meta.env.VITE_BASE_URL
        const base_url = "127.0.0.1:8000"

        const url = `http://${base_url}/api/v1/users/profile`
        let formData = new FormData()
        formData.append("first_name", profileData.first_name)
        formData.append("last_name", profileData.last_name)
        formData.append("picture", profileData.picture)
        formData.append("about_me", profileData.about_me)
        const context = {
            method: "PUT",
            body: formData,
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`,
                },
        }
        const response = await fetch(url, context)
        const body = await response.json()
        if (response.status === 400) {
            setErrors(body)
        } else {
            navigate("/")
        }


    }
    return (
        <>
        {errors && <h4>{JSON.stringify(errors)}</h4>}
        <div className="modal-dialogue modal-dialogue-centered">
            <div className="modal-dialogue">
                <div className="modal-content" style={{width: "30%"}}>
                    <div className="modal-header">
                        <h3 className="modal-title">
                        Update your profile!
                        </h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal-dialogue" aria-label="Close" onClick={handleAddProfile}></button>
                    </div>
        
        <div className="" style={{width: "90%"}}>
        <div className="input-group mb-2 mt-2">
                <input placeholder='first name' className="form-control" value={firstName} name="firstName" onChange={handleFirstNameChange}></input>
            </div>
            <div className="input-group mb-2">
                <input placeholder='last name' className="form-control" value={lastName} name="lastName" onChange={handleLastNameChange}></input>
            </div>
            <div className="input-group mb-2">
                <textarea className="form-control" placeholder='Something about you' name="aboutMe" value={aboutMe}  onChange={handleAboutMeChange}></textarea>
            </div>
            <div className="input-group mb-2">
                <input type="file" className="form-control" name="profileImage" onChange={handlePictureChange}></input>
            </div>

            </div>
            <div className="share-submit">
                <button className='share-button' onClick={handleSubmit}>Submit</button>
            </div>

            </div>
            </div>
        </div>
        </>
    )
}