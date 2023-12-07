import { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom"
import { Rating } from "@mui/material";

export default function AddCoffee({handleAddCoffee, getCoffeeData={getCoffeeData}}){

    const navigate = useNavigate()
    const { userToken } = useContext(UserContext)
    const [ coffeeName , setCoffeeName ] = useState()
    const [ description, setDescription ] = useState()
    const [ picture, setPicture ] = useState()
    const [ caffeine, setCaffeine ] = useState()
    const [ rating, setRating ] = useState()
    const [errors, setErrors ] = useState()

    const addCoffeeFormRef = useRef(null)

    const handleCoffeeNameChange = (e) => setCoffeeName(e.target.value)
    const handleDescriptionChange = (e) => setDescription(e.target.value)
    const handleCaffeineChange = (e) => setCaffeine(e.target.value)
    const handleRatingChange = (e) => setRating(e.target.value)
    const handlePictureChange = (e) => setPicture(e.target.files[0])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const coffeeObject = {
            name: coffeeName,
            description: description,
            picture: picture,
            caffeine: caffeine,
            rating: rating
        }
        await addCoffee(coffeeObject)
        await handleAddCoffee()
        await getCoffeeData()
    }

    

    const addCoffee = async (coffeeObj) => {
        // const base_url = import.meta.env.VITE_BASE_URL
        const base_url = "127.0.0.1:8000"

        const url = `http://${base_url}/api/v1/coffee/`
        let formData = new FormData()
        formData.append("name", coffeeObj.name)
        formData.append("description", coffeeObj.description)
        formData.append("picture", coffeeObj.picture)
        formData.append("caffeine", coffeeObj.caffeine)
        formData.append("rating", coffeeObj.rating)
        const context = {
            method: "POST",
            body: formData,
            headers: {
                'Authorization': `token ${userToken}`,
                },
        }
        const response = await fetch(url, context)
        const body = await response.json()
        if (response.status === 400) {
            setErrors(body)
        } else {
            // navigate("/")
        }
    }
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the clicked element is NOT a child of the container
            if (
                addCoffeeFormRef.current &&
                !addCoffeeFormRef.current.contains(event.target) &&
                // Check if the clicked element is NOT the button that opens the form
                event.target !== document.querySelector("#add-coffee-button")
            ) {
                console.log("Click outside detected");
                // Run your handler function here
                handleAddCoffee();
            }
        };

        // Attach the event listener to the document
        document.addEventListener("click", handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [handleAddCoffee]);
    
    return (
    <>
    <div className="modal-overlay">
        <div className="modal-content" ref={addCoffeeFormRef}>
        <h1>Share your favorite coffee</h1>
            {errors && <h4>{JSON.stringify(errors)}</h4>}
            <div className="share-input">
                <input placeholder='Coffee Name' value={coffeeName} name="coffeeName" onChange={handleCoffeeNameChange}></input>
            </div>
            <div className="share-input">
                <textarea className='input-description' placeholder='Description' value={description} name="description" onChange={handleDescriptionChange}></textarea>
            </div>
            <div className="share-input">
                <input placeholder='Caffeine Content: mg/serving' value={caffeine} name="caffeine" onChange={handleCaffeineChange}></input>
            </div>
            <div className="share-input">
                <Rating name='rating' value={rating} precision={1} onChange={handleRatingChange}/>
            </div>
            <div className="share-input">
                <input type="file" name="coffeeImage" onChange={handlePictureChange}></input>
            </div>
            <div className="share-submit">
                <button className='share-button' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    </div>
    </>
    )
}