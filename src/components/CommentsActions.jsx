// IMPORT MODULES
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"

// IMPORT COMPONENTS
import { CommentActionsDeleteBtn } from "./CommentsActionsDeleteBtn"


// COMPONENT
export default function CommentsActions({ commentUserId, commentId }) {

    // AUTHENTICATE USER
    const {userId, sessionClaims} = auth()

    if (userId === commentUserId
        || sessionClaims?.metadata.role === "moderator"
        || sessionClaims?.metadata.role === "admin"
        ) {
        return (
            <div className="actions-comments">
                <Link href={`/edit-comment/${commentId}`}><h6 className="pointer">Edit</h6></Link>
                <CommentActionsDeleteBtn commentId={commentId} />
            </div>
        )
        } else {
            return <></>
    }
}