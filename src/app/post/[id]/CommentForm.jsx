// IMPORT MODULES
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import Link from "next/link"

// IMPORT DATABASE CONNECTION
import { db } from "@/utils/connect"


// COMPONENT
export default async function CommentForm({ postId }) {
    // GET USERID FROM CLERK
    const { userId } = auth()

    // HANDLE FORM SUBMISSION
    async function submitComment(formData) {
        "use server"

        // FORM INPUT VARIABLES
        const content = formData.get("content")

        // QUERY DATABASE TO ADD NEW COMMENT
        db.query(
            `
            INSERT INTO wk09_comments (post_id, user_id, content) VALUES
            ($1, $2, $3)
            `,
            [postId, userId, content]
        )

        // REVALIDATE & REDIRECT
        revalidatePath(`/post/${postId}`)
        redirect(`/post/${postId}`)
    }


    // CHECK USER   
    const checkUser = (await db.query(
        `
        SELECT * FROM
            wk09_users
        WHERE
            clerk_id = $1
        `
        , [userId])).rows[0]


    if (!checkUser) {
        return (
            <div>
                <p>
                Join the conversation: <Link href="/sign-in">log in, register an account or finish setting up your profile</Link> with Converso now!
                </p>
            </div> 
        )
    }

    return (
        <div>
            <form action={submitComment} className="basic-form">

                <label htmlFor="content">Your Message</label>
                <textarea name="content" placeholder="What's on your mind?" required maxLength="1000" />

                <button type="submit" className="large-button">Post Comment</button>

            </form>
        </div>
    )
}
