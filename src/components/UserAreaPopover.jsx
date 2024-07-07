// IMPORT RADIX UI
import React from "react"
import * as Popover from "@radix-ui/react-popover"
import "./UserAreaPopover-styles.css"

// IMPORT CLERK
import { SignOutButton} from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

// IMPORT MODULES
import Link from "next/link"

// IMPORT DATABASE CONNECTION
import { db } from "@/utils/connect"


// COMPONENT
export default async function UserAreaPopover() {

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
    <Popover.Root>
    <Popover.Trigger asChild>
      <button className="IconButton pointer" aria-label="Update dimensions">

        {/* AVATAR AS POPOVER ICON */}
        <div className="user-area-avatar-container">
            <img className="user-area-avatar" src={userInfo?.avatar || "../../images/placeholder.png"} alt="Your avatar image" />
        </div>

      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className="PopoverContent" sideOffset={5}>

        {/* LINK BUTTONS IN POPOVER MENU */}
        {/* NEW CONVO */}
        <Link href="/new-post" className="user-link">
            <button className="small-button">
                New Convo
            </button>
        </Link>

        {/* PROFILE BUTTON */}
        <Link href={userURL} className="user-link">
            <button className="small-button">
                Profile
            </button>
        </Link>

        {/* SIGN OUT BUTTON */}
        <SignOutButton>
            <button className="small-button">
                Log Out
            </button>
        </SignOutButton>

        <Popover.Arrow className="PopoverArrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
  )
}