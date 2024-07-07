// IMPORT MODULES
import Link from "next/link"

// IMPORT DB CONNECTION
import { db } from "@/utils/connect"

// COMPONENTS
import Spacer from "@/components/Spacer"
import SpacerBar from "@/components/SpacerBar"
import ReturnPrevPage from "@/components/ReturnPrevPage"
import CommentsTable from "@/components/CommentsTable"
import CommentForm from "./CommentForm"
import PostActions from "./PostActions"


// PAGE
export default async function PostPage({params}) {
    const postInfo = (await db.query(
        `
        SELECT
            wk09_posts.id,
            wk09_posts.title,
            wk09_posts.content,
            wk09_posts.created_at,
            wk09_posts.user_id,
            wk09_users.username,
            wk09_users.avatar,
            wk09_users.location
        FROM
            wk09_posts
        INNER JOIN
            wk09_users
        ON
            wk09_posts.user_id = wk09_users.clerk_id
        WHERE
            wk09_posts.id = $1
        `
        , [params.id])).rows[0]

    return (
        <div className="page-container">
            <div className="top-nav">
                <ReturnPrevPage/>
            </div>

            {/* POST */}
            <div className="mc-box">

                {/* CONTENT*/}
                <div className="mc-content">
                    <h2>{postInfo.title}</h2>
                    <p>{postInfo.content}</p>
                </div>

                {/* PROFILE BOX */}
                <Link href={`/users/${postInfo.user_id}`}>
                    <div className="mc-profile-box">
                        <p>Posted By</p>
                        <div className="mc-profile-img-container">
                            <img src={postInfo.avatar} alt={`Avatar of user ${postInfo.username}`} className="mc-profile-img" />
                        </div>
                        <h4>{postInfo.username}</h4>
                    </div>
                </Link>
            </div>

            <PostActions postId={params.id} postUserId={postInfo.user_id}/>

            <SpacerBar />

            <h2>Leave a comment</h2>
            <CommentForm postId={params.id}/>
            
            <SpacerBar />

            <h2>Latest comments</h2>
            <CommentsTable postId={params.id}/>

            <Spacer />
        </div>
    )
}