// DIRECTIVE
"use client"

// IMPORT HOOKS
import { useState } from "react"

// COMPONENT - UPDATE FORM
export default function UpdateComment({initialData, onSubmit}) {

    // FORM DATA - INITIAL DATA
    const [formData, setFormData] = useState({
        content: initialData.content,
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
    function submitComment(event) {
        event.preventDefault()
        onSubmit(formData)
    }

    // JSX
    return (
        <form onSubmit={submitComment} onChange={formInput} className="basic-form">

            <label htmlFor="content">Your Message</label>
            <textarea name="content" placeholder="What's on your mind?" defaultValue={formData.content} required />

            <button type="submit" className="large-button">Update Comment</button>
        </form>
    )
}