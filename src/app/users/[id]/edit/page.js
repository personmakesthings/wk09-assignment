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
    const userInfo = (await db.query(
        `
        SELECT * FROM
            wk09_users
        WHERE
            wk09_users.clerk_id = $1
        `
        , [params.id])).rows[0]

    
    // CHECK USER
    const {userId, sessionClaims} = auth()

    if (userId !== userInfo.clerk_id
        && sessionClaims?.metadata.role !== "moderator"
        && sessionClaims?.metadata.role !== "admin"
        ) {
        redirect(`/users/${params.id}`)
    }


    // HANDLE FORM SUBMISSION
    async function submitUser(formData) {
        "use server"

        // FORM INPUT VARIABLES
        const { avatar, location, bio } = formData
        
        // QUERY DATABASE TO UPDATE RECORD
        await db.query(
            `
            UPDATE
                wk09_users
            SET 
                avatar = $1, 
                location = $2,
                bio = $3
            WHERE
                clerk_id = $4
            `
            , [avatar, location, bio, params.id])

        revalidatePath(`/users/${params.id}`)
        redirect(`/users/${params.id}`)
    }

    // JSX
    return (
        <div className="page-container">
            <ReturnPrevPage />

            <h1 className="page-title">Editing User Profile</h1>
            <h2>{userInfo.username}</h2>

            <div>
                <UpdateForm initialData={userInfo} onSubmit={submitUser} />
            </div>
            
            <Spacer />
        </div>
    )
}