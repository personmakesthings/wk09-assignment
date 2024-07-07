// DIRECTIVE
"use client"

// IMPORT COMPONENTS
import ReturnPrevPage from "@/components/ReturnPrevPage"


// PAGE
export default function PostNotFound() {

    return (
        <div className="page-container">
            <div className="top-nav">
                <ReturnPrevPage/>
            </div>
            
            <h1 className="page-title">Error: Post Not Found</h1>
            <p>Could not find post.</p>
        </div>
    )
}