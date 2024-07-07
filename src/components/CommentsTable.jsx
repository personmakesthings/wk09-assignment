// IMPORT MODULES
import Link from "next/link"

// IMPORT COMPONENTS
import CommentsActions from "./CommentsActions"


// IMPORT DATABASE CONNECTION
import { db } from "@/utils/connect"


// COMPONENT
export default async function CommentsTable({postId, userId}) {

    // QUERY DATABASE
    const comments = (await db.query(
        `
        SELECT
            wk09_comments.id,
            wk09_comments.content,
            wk09_comments.post_id,
            wk09_comments.user_id,
            wk09_users.clerk_id,
            wk09_users.username,
            wk09_users.avatar
        FROM
            wk09_comments
        INNER JOIN
            wk09_users
        ON
            wk09_comments.user_id = wk09_users.clerk_id
        WHERE
            ($1::INTEGER IS NULL OR wk09_comments.post_id = $1::INTEGER)
        AND
            ($2::VARCHAR IS NULL OR wk09_comments.user_id = $2::VARCHAR)
        ORDER BY
            wk09_comments.id DESC
        `
        , [postId, userId])).rows

    console.log(comments.clerk_id)

    // JSX
    if (comments.length === 0) {
        return (
        <p>No comments currently available.</p>
        )
    }

    return (
        <div>
            {comments.map((comment)=>{
                return (
                    <div>

                        <div className="comment-card">
                            <div>
                                <div className="table-card-info justify-text">
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                            
                            <Link href={`/users/${comment.user_id}`}>
                                <div className="table-card-user">
                                    <p>{comment.username}</p>
                                    <div className="table-card-user-img-container">
                                        <img src={comment.avatar} className="table-card-user-img"/>
                                    </div>
                                </div>
                            </Link>
                            
                        </div>
                        <CommentsActions commentUserId={comment.clerk_id} commentId={comment.id}/>
                        
                        
                    </div>
                )
            })}

            

        </div>
    )
}