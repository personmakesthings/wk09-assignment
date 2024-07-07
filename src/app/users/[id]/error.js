// DIRECTIVE
"use client"

// IMPORT MODULES
import { usePathname } from "next/navigation"

// IMPORT COMPONENTS
import ReturnPrevPage from "@/components/ReturnPrevPage"


// PAGE
export default function UserNotFound() {
    const userId = (usePathname()).substring(7)

    return (
        <div className="page-container">
            <div className="top-nav">
                <ReturnPrevPage/>
            </div>
            
            <h1 className="page-title">Error: User Not Found</h1>
            <p>Could not find user with ID "{userId}".</p>
        </div>
    )
}