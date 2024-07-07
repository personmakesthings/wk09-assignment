// PURPOSE
// This page checks the user's status when they log in.
// If they log in and still haven't set up their profile, they will be redirected to a page to complete setting up their profile.
// If their profile is set up (i.e. exists in the database), they will be redirected to the front page of Converso.


// IMPORT MODULES
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

// IMPORT DATABASE CONNECTION
import { db } from "@/utils/connect"


// PAGE
export default async function Redirect() {
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

    
    // JSX
    if (!checkUser) {
        redirect("/registration/complete-sign-up")
    } else {
        redirect("/")
    }

    return (
        <div className="page-container">
            Redirecting...
        </div>
    )
}