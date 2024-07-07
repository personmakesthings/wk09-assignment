// IMPORT MODULES
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

// IMPORT DATABASE CONNECTION
import { db } from "@/utils/connect"

// IMPORT COMPONENTS
import UpdateForm from "./UpdateForm"
import Spacer from "@/components/Spacer"
import ReturnPrevPage from "@/components/ReturnPrevPage"



// PAGE
export default async function Page({params}) {

    // QUERY DATABASE FOR INITIAL DATA TO POPULATE FORM
    // Passed to child in prop
    const postInfo = (await db.query(
        `
        SELECT
            wk09_posts.id,
            wk09_posts.title,
            wk09_posts.content,
            wk09_posts.created_at,
            wk09_posts.user_id
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

    
    // CHECK USER
    // Redirects user to homepage if they attempt to access the edit route of a page they are not allowed to edit
    const {userId, sessionClaims} = auth()

    if (userId !== postInfo.user_id
        && sessionClaims?.metadata.role !== "moderator"
        && sessionClaims?.metadata.role !== "admin"
        ) {
        redirect(`/post/${params.id}`)
    }


    // HANDLE FORM SUBMISSION
    async function submitPost(formData) {
        "use server"

        // FORM INPUT VARIABLES
        const { title, content } = formData
        
        // QUERY DATABASE TO UPDATE RECORD
        await db.query(
            `
            UPDATE
                wk09_posts
            SET 
                title = $1, 
                content = $2
            WHERE
                id = $3
            `
            , [title, content, params.id])

        revalidatePath(`/post/${params.id}`)
        redirect(`/post/${params.id}`)
    }

    // JSX
    return (
        <div className="page-container">
            <ReturnPrevPage />

            <h1 className="page-title">Editing Convo</h1>
            <h2>{postInfo.title}</h2>

            <div>
                <UpdateForm initialData={postInfo} onSubmit={submitPost} />
            </div>
            
            <Spacer />
        </div>
    )
}