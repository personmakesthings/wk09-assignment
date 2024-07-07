// IMPORT DB CONNECTION
import { db } from "@/utils/connect"

// IMPORT COMPONENTS
import PostTable from "@/components/PostTable"
import Spacer from "@/components/Spacer"

// HOMEPAGE
export default async function Home() {

  const latestPosts = (await db.query(
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
    ORDER BY
      wk09_posts.id DESC
    `
    )).rows


  return (
    <div className="page-container">
      <h1>Latest Convos</h1>
      <PostTable grabbedPosts={latestPosts}/>
      <Spacer />
    </div>
  )
}
