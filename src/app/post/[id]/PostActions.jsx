// IMPORT MODULES
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"

// IMPORT COMPONENTS
import { PostActionsDeleteBtn } from "./PostActionsDeleteBtn"


// COMPONENT
export default function PostActions({ postId, postUserId }) {

    // AUTHENTICATE USER
    const {userId, sessionClaims} = auth()
    
    console.log(postId)

    if (userId === postUserId
        || sessionClaims?.metadata.role === "moderator"
        || sessionClaims?.metadata.role === "admin"
        ) {
        return (
            <div className="actions">
                <h4>Post Actions</h4> 
                <div className="action-btns">
                    <Link href={`/post/${postId}/edit`}>
                        <button className="small-button">
                            Edit
                        </button>
                    </Link>
                    <PostActionsDeleteBtn postId={postId}/>
                </div>
            </div>
        )
        } else {
            return <></>
    }
}