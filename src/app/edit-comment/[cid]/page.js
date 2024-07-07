// IMPORT MODULES
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

// IMPORT DATABASE CONNECTION
import { db } from "@/utils/connect"

// IMPORT COMPONENTS
import UpdateComment from "./UpdateComment"
import Spacer from "@/components/Spacer"
import ReturnPrevPage from "@/components/ReturnPrevPage"



// PAGE
export default async function Page({params}) {

    // QUERY DATABASE FOR INITIAL DATA TO POPULATE FORM
    // Passed to child in prop
    const commentInfo = (await db.query(
        `
        SELECT
            wk09_comments.id,
            wk09_comments.post_id,
            wk09_comments.content,
            wk09_comments.created_at,
            wk09_comments.user_id
        FROM
            wk09_comments
        INNER JOIN
            wk09_users
        ON
            wk09_comments.user_id = wk09_users.clerk_id
        WHERE
            wk09_comments.id = $1
        `
        , [params.cid])).rows[0]

    
    // CHECK USER
    // Redirects user to homepage if they attempt to access the edit route of a page they are not allowed to edit
    const {userId, sessionClaims} = auth()

    if (userId !== commentInfo.user_id
        && sessionClaims?.metadata.role !== "moderator"
        && sessionClaims?.metadata.role !== "admin"
        ) {
        redirect("/")
    }


    // HANDLE FORM SUBMISSION
    async function submitComment(formData) {
        "use server"

        // FORM INPUT VARIABLES
        const { content } = formData
        
        // QUERY DATABASE TO UPDATE RECORD
        await db.query(
            `
            UPDATE
                wk09_comments
            SET 
                content = $1
            WHERE
                id = $2
            `
            , [content, params.cid])

        revalidatePath(`/post/${commentInfo.post_id}`)
        redirect(`/post/${commentInfo.post_id}`)
    }

    // JSX
    return (
        <div className="page-container">
            <ReturnPrevPage />

            <h1 className="page-title">Editing Comment</h1>
            <h2>{commentInfo.title}</h2>

            <div>
                <UpdateComment initialData={commentInfo} onSubmit={submitComment} />
            </div>
            
            <Spacer />
        </div>
    )
}