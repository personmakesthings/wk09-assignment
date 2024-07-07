// DIRECTIVE
"use client"

// IMPORT MODULES
import { useRouter } from "next/navigation"


// COMPONENT
export default function ReturnPrevPage() {
    const router = useRouter()
    return (
        <h4 onClick={() => router.back()} className="pointer hover">← Previous page</h4>
    )
}