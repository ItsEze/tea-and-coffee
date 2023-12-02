import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function AddProfile( { handleAddProfile }) {
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const profileData = {
            first_name: firstName,
            last_name: lastName,
            picture: picture,
            about_me: aboutMe
        }
        console.log('what is profile data,', profileData)
        addProfile(profileData)
        handleAddProfile()
    }

    console.log('LOOK AT THESE')
    console.log(firstName)
    console.log(lastName)

    const addProfile = async (profileData) => {
        console.log(profileData, 'this is getting into addProfile')
        // const base_url = import.meta.env.VITE_BASE_URL
        const base_url = "localhost:8000"
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
        <h1>What is this</h1>
        {errors && <h4>{JSON.stringify(errors)}</h4>}
        <div className="share-input">
                <input placeholder='first name' value={firstName} name="firstName" onChange={handleFirstNameChange}></input>
            </div>
            <div className="share-input">
                <input placeholder='last name' value={lastName} name="lastName" onChange={handleLastNameChange}></input>
            </div>
            <div className="share-input">
                <textarea className='input-description' placeholder='Something about you' name="aboutMe" value={aboutMe}  onChange={handleAboutMeChange}></textarea>
            </div>
            <div className="share-input">
                <input type="file" name="profileImage" onChange={handlePictureChange}></input>
            </div>
            <div className="share-submit">
                <button className='share-button' onClick={handleSubmit}>Submit</button>
            </div>
        </>
    )
}