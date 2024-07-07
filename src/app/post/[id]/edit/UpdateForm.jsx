// DIRECTIVE
"use client"

// IMPORT HOOKS
import { useState } from "react"

// COMPONENT - UPDATE FORM
export default function UpdateForm({initialData, onSubmit}) {

    // FORM DATA - INITIAL DATA
    const [formData, setFormData] = useState({
        title: initialData.title,
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
    function submitPost(event) {
        event.preventDefault()
        onSubmit(formData)
    }

    // JSX
    return (
        <form onSubmit={submitPost} onChange={formInput} className="basic-form">
            <label htmlFor="title">Convo Title</label>
            <input name="title" placeholder="Convo Title" defaultValue={formData.title} required maxLength="200" />

            <label htmlFor="content">Your Message</label>
            <textarea name="content" placeholder="What's on your mind?" defaultValue={formData.content} required />

            <button type="submit" className="large-button">Update Convo</button>
        </form>
    )
}