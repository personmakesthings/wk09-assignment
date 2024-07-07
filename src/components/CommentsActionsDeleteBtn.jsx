// DIRECTIVE
"use client"

// IMPORT MODULES
import { usePathname } from "next/navigation"
import { useState } from "react"

// IMPORT FUNCTION
import { handleDeleteComment } from "./CommentActions-handleDelete"


// COMPONENT
export function CommentActionsDeleteBtn({commentId}) {
    
    // Pass current path to delete function to revalidate path & redirect to current page
    const pageId = usePathname()
    console.log(pageId)


    // Delete confirmation functions
    const [confirmDelete, setConfirmDelete] = useState(false)

    function initialClick() {
        setConfirmDelete(true)
    }

    function confirmClick() {
        handleDeleteComment(commentId, pageId)
        setConfirmDelete(false)
    }

    // JSX
    return (
        <>
            {confirmDelete ? (
                <button onClick={confirmClick} className="unset-btn pointer">
                    <h6>Are you sure? Click again to delete.</h6>
                </button>
            ) : (
                <button onClick={initialClick} className="unset-btn pointer">
                    <h6>Delete Comment</h6>
                </button>
            )}
        </>
    )
}
