// IMPORT MODULES
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"


// COMPONENT
export default function UserActions({pageUserId}) {

    // AUTHENTICATE USER
    const {userId, sessionClaims} = auth()

    if (userId === pageUserId
        || sessionClaims?.metadata.role === "moderator"
        || sessionClaims?.metadata.role === "admin"
        ) {
        return (
            <div className="actions">
                <h4>User Actions</h4> 
                <div className="action-btns">
                    <Link href={`/users/${pageUserId}/edit/`}>
                        <button className="small-button">
                            Edit Profile
                        </button>
                    </Link>
                </div>
            </div>
        )
        } else {
            return <></>
    }
}