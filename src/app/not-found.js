// IMPORT COMPONENTS
import ReturnPrevPage from "@/components/ReturnPrevPage"


// PAGE
export default function NotFound() {
    return (
        <div className="page-container">
            <div className="top-nav">
                <ReturnPrevPage/>
            </div>
            
            <h1>404 Not Found</h1>
            <p>The page you requested cannot be found on this website.</p>
        </div>
    )
}