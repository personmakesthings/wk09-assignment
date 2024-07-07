// DIRECTIVE
"use client"

// IMPORT COMPONENTS
import ReturnPrevPage from "@/components/ReturnPrevPage"


// PAGE
export default function CommentNotFound() {

    return (
        <div className="page-container">
            <div className="top-nav">
                <ReturnPrevPage/>
            </div>
            
            <h1 className="page-title">Error: Comment Not Found</h1>
            <p>Could not find comment.</p>
        </div>
    )
}