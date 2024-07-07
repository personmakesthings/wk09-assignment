// DIRECTIVE
"use server"

// IMPORT MODULES
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// IMPORT DATABASE CONNECTION
import { db } from "@/utils/connect"

// FUNCTION
export async function handleDelete(postId) {

    // QUERY DB
    db.query(
        `
        DELETE FROM
            wk09_posts
        WHERE
            id = $1
        `
        , [postId])
    
    // REVALIDATE & REDIRECT
    revalidatePath("/")
    redirect("/")
}