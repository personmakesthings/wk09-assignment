// IMPORT MODULES
import Link from "next/link"

// IMPORT CLERK
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    SignOutButton
} from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"


// IMPORT COMPONENTS
import UserAreaPopover from "./UserAreaPopover"

// IMPORT DB CONNECTION
import { db } from "@/utils/connect"


// COMPONENT
export default async function UserAreaLarge() {

    const {userId} = auth()
    const userInfo = (await db.query(
        `
        SELECT * FROM
            wk09_users
        WHERE
            clerk_id = $1
        `
        , [userId])).rows[0]


    // Check that the user has set-up their profile before linking to their profile
    const userURL = userInfo?.clerk_id ? `/users/${userInfo.clerk_id}` : "/registration/complete-sign-up"


    return (
        <div className="hide-on-small">
            <div className="user-area">
                {/* SIGNED IN */}
                <SignedIn>
                    <UserAreaPopover />
                    <Link href={userURL} className="user-link">
                    <h4>{userInfo?.username || "Finish Profile Setup"}</h4>
                    </Link>

                    <Link href="/new-post">
                        <button className="large-button">
                            New Convo
                        </button>
                    </Link>
                    
                </SignedIn>

                {/* SIGNED OUT */}
                <SignedOut>
                    <SignInButton>
                        <button className="large-button">
                            Log In
                        </button>
                    </SignInButton>
                </SignedOut>
            </div>
        </div>
    )
}