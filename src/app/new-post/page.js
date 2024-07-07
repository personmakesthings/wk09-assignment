// IMPORT MODULES
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

// IMPORT DATABASE CONNECION
import { db } from "@/utils/connect"

// IMPORT COMPONENTS
import Spacer from "@/components/Spacer"
import ReturnPrevPage from "@/components/ReturnPrevPage"

// PAGE
export default async function NewPost() {
    // GET USERID FROM CLERK
    const {userId} = auth()

    
    // CHECK IF USER IS REGISTERED
    const checkUser = (await db.query(
        `
        SELECT * FROM
            wk09_users
        WHERE
            clerk_id = $1
        `
        , [userId])).rows[0]

    if (!checkUser) {
        redirect("/registration/complete-sign-up")
    }

    // HANDLE FORM SUBMISSION
    async function submitPost(formData) {
        "use server"

        // FORM INPUT VARIABLES
        const title = formData.get("title")
        const content = formData.get("content")
    
        // QUERY DATABASE TO ADD NEW POST
        db.query(
        `
        INSERT INTO wk09_posts (title, content, user_id) VALUES
        ($1, $2, $3)
        `
        , [title, content, userId])

        // REVALIDATE & REDIRECT
        revalidatePath("/")
        redirect("/")
    }

    // JSX
    return (
        <div className="page-container">
            <div className="top-nav">
                <ReturnPrevPage/>
            </div>

            <h1>New Convo</h1>

            <form action={submitPost} className="basic-form">
                <label htmlFor="title">Convo Title</label>
                <input name="title" placeholder="Convo Title" required maxLength="200" />

                <label htmlFor="content">Your Message</label>
                <textarea name="content" placeholder="What's on your mind?" required />

                <button type="submit" className="large-button">Add New Convo</button>
            </form>

            <Spacer />
        </div>
    )
}