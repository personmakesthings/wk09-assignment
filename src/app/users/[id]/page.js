// IMPORT MODULES
import Link from "next/link"

// IMPORT DB CONNECTION
import { db } from "@/utils/connect"

// IMPORT COMPONENTS
import PostTable from "@/components/PostTable"
import Spacer from "@/components/Spacer"
import SpacerBar from "@/components/SpacerBar"
import ReturnPrevPage from "@/components/ReturnPrevPage"
import CommentsTable from "@/components/CommentsTable"
import UserActions from "../UserActions"


// PAGE
export default async function Page({params}) {

    const userInfo = (await db.query(
        `
        SELECT * FROM
          wk09_users
        WHERE
          clerk_id = $1
        `
        , [params.id])).rows[0]

        const userPosts = (await db.query(
            `
            SELECT
              wk09_posts.id,
              wk09_posts.title,
              wk09_posts.content,
              wk09_posts.created_at,
              wk09_posts.user_id,
              wk09_users.username,
              wk09_users.avatar
            FROM
              wk09_posts
            INNER JOIN
              wk09_users
            ON
              wk09_posts.user_id = wk09_users.clerk_id
            WHERE
                clerk_id = $1
            ORDER BY
              wk09_posts.id DESC
            LIMIT
              15
            `
            , [params.id])).rows

    return (
        <div className="page-container">
            <div className="top-nav">
                <ReturnPrevPage/>
                <h4><Link href="/">Home</Link> / <Link href="/users">Users</Link> / Profile - {userInfo.username}</h4>
            </div>

            <div className="mc-box">
              <div className="mc-row">
                <div className="mc-profile-box">
                    <div className="mc-profile-img-container">
                        <img src={userInfo.avatar} alt={`Avatar of user ${userInfo.username}`} className="mc-profile-img" />
                    </div>
                    <h4>{userInfo.username}</h4>
                    <p><b>Location:</b> {userInfo.location}</p>
                </div>

                <div className="mc-content">
                    <h2>About {userInfo.username}</h2>
                    <p>{userInfo.bio}</p>
                </div>
                </div>
            </div>

            <UserActions pageUserId={params.id} />

            <SpacerBar />

            <h2 className="page-title">Latest Convos From {userInfo.username}</h2>
            <PostTable grabbedPosts={userPosts} />
            
            <SpacerBar />

            <h2 className="page-title">Latest Comments From {userInfo.username}</h2>
            <CommentsTable userId={params.id}/>

            <Spacer />
        </div>
    )
}