// DIRECTIVE
"use client"

// IMPORT MODULES
import { useState } from "react"

// IMPORT FUNCTION
import { handleDelete } from "./handleDelete"

// COMPONENT
export function PostActionsDeleteBtn({ postId }) {
    const [confirmDelete, setConfirmDelete] = useState(false)

    function initialClick() {
        setConfirmDelete(true)
    }

    function confirmClick() {
        handleDelete(postId)
    }

    // JSX
    return (
        <>
            {confirmDelete ? (
                <button onClick={confirmClick} className="small-button">
                    Are you sure? Click again to delete
                </button>
            ) : (
                <button onClick={initialClick} className="small-button">
                    Delete Convo
                </button>
            )}
        </>
    )
}
