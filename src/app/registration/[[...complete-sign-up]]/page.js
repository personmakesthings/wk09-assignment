// IMPORT MODULES
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

// IMPORT CLERK
import { auth } from "@clerk/nextjs/server"

// IMPORT DB CONNECTION
import { db } from "@/utils/connect"



// PAGE - SIGN UP
export default function SignUp() {

    // GET CURRENT USER DATA
    // Destructuring userID from Clerk.
    const {userId} = auth()

    // HANDLE FORM SUBMISSION
    async function handleCreateUser(formData) {
        "use server"
        
        const data = Object.fromEntries(formData)
        const {username, bio, avatar, location} = data

        db.query(
            `
            INSERT INTO wk09_users (clerk_id, username, avatar, bio, location) VALUES
            ($1, $2, $3, $4, $5)
            `
            , [userId, username, avatar, bio, location])

        console.log(userId, username, avatar, bio, location)

        revalidatePath("/")
        redirect("/")
    }

    return (
        <div className="page-container">
            <h1>Finish Setting Up Your Profile</h1>
            <p>Enter your account & profile details to complete your registration with Converso - and join in on the conversation!</p>

            <form action={handleCreateUser} className="basic-form">

                <label htmlFor="username">Your Username</label>
                <input name="username" placeholder="Enter your username" maxLength="12" required></input>

                <label htmlFor="location">Your Location</label>
                <input name="location" placeholder="Where are you from?" maxLength="30" required></input>

                <label htmlFor="avatar">Upload Profile Avatar</label>
                <input name="avatar" placeholder="URL to avatar image" maxLength="500" required></input>

                <label htmlFor="bio">About You</label>
                <textarea name="bio" placeholder="Tell us a little bit more about you!" maxLength="255" required></textarea>

                <button type="submit" className="large-button">Submit</button>

            </form>
        </div>
    )
}