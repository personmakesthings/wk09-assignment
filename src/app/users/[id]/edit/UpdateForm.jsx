// DIRECTIVE
"use client"

// IMPORT HOOKS
import { useState } from "react"


// COMPONENT - UPDATE FORM
export default function UpdateForm({initialData, onSubmit}) {

    // FORM DATA - INITIAL DATA
    const [formData, setFormData] = useState({
        avatar: initialData.avatar,
        location: initialData.location,
        bio: initialData.bio,
    })

    // FUNCTION TO CHANGE FORM DATA AS USER TYPES
    function formInput(event) {
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }

    // SUBMIT FORM
    // Data passed back to parent through onSubmit prop
    function submitUser(event) {
        event.preventDefault()
        onSubmit(formData)
    }

    // JSX
    return (
        <form onSubmit={submitUser} onChange={formInput} className="basic-form">

            <label htmlFor="avatar">Upload Profile Avatar</label>
            <input name="avatar" placeholder="URL to avatar image" maxLength="500" defaultValue={formData.avatar} required></input>

            <label htmlFor="location">Your Location</label>
            <input name="location" placeholder="Where are you from?" defaultValue={formData.location} maxLength="30" required></input>

            <label htmlFor="bio">About You</label>
            <textarea name="bio" placeholder="Tell us a little bit more about you!" maxLength="255" defaultValue={formData.bio} required></textarea>

            <button type="submit" className="large-button">Submit</button>

        </form>
    )
}