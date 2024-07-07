// DIRECTIVE
"use server"

// IMPORT MODULES
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// IMPORT DATABASE CONNECTION
import { db } from "@/utils/connect"

// FUNCTION
export async function handleDeleteComment(commentId, pageId) {

    // QUERY DB
    db.query(
        `
        DELETE FROM
            wk09_comments
        WHERE
            id = $1
        `
        , [commentId])
    
    // REVALIDATE & REDIRECT
    revalidatePath(pageId)
    redirect(pageId)
}