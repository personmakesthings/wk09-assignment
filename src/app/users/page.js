// IMPORT MODULES
import Link from "next/link"

// IMPORT DB CONNECTION
import { db } from "@/utils/connect"

// IMPORT COMPONENTS
import ReturnPrevPage from "@/components/ReturnPrevPage"
import Spacer from "@/components/Spacer"

// PAGE
export default async function Users() {

    const users = (await db.query(
        `
        SELECT * FROM wk09_users
        ORDER BY id DESC
        `
        )).rows

    return (
        <div className="page-container">
            <div className="top-nav">
                <ReturnPrevPage/>
                <h4><Link href="/">Home</Link> / Users</h4>
            </div>

            <h1 className="page-title">Find User</h1>
            <div className="cards-display">
            {users.map((user) => {
                return (
                    <Link href={`/users/${user.clerk_id}`}>
                        <div className="profile-card">
                            <div className="profile-img-container">
                                <img className="profile-img-small" src={user.avatar} alt={`Avatar of user ${user.username}`}></img>
                            </div>
                            <div className="profile-card-text">
                                <h3>{user.username}</h3>
                                <p>{user.location}</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
            </div>
            <Spacer />
        </div>
    )
}