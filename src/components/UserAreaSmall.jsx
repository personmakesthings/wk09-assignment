// IMPORT CLERK
import {
    SignInButton,
    SignedIn,
    SignedOut,
} from "@clerk/nextjs"

// IMPORT COMPONENTS
import UserAreaPopover from "./UserAreaPopover"


// COMPONENT
export default async function UserAreaSmall() {

    // JSX
    return (
        <div className="show-on-small">  {/* SMALL SCREEN VERSION */}

            {/* SIGNED IN */}
            <SignedIn>
                <UserAreaPopover />
            </SignedIn>

            {/* SIGNED OUT */}
            <SignedOut>
                <SignInButton>
                    <button className="small-button">
                        Log In
                    </button>
                </SignInButton>
            </SignedOut>

        </div>
    )
}