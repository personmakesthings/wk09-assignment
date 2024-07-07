// IMPORT MODULES
import Link from "next/link"

// IMPORT CLERK
import { SignedIn } from "@clerk/nextjs"

// IMPORT COMPONENTS
import UserAreaLarge from "./UserAreaLarge"
import UserAreaSmall from "./UserAreaSmall"


// SIDEBAR
export default function Sidebar() {
    return (
        <header className="sidebar">
            <div className="sidebar-top">
                <div>
                    <h1 className="hide-on-small">Converso</h1>
                    <h5 className="hide-on-small">Connect, Convene & Converse!</h5>
                </div>

                <nav className="navlinks">
                    <Link href="/" className="nav-btn">
                        <button>
                            <img src="../../images/icon-home.png" alt="Home Button" className="sidebar-img"/>
                            <p className="nav-p hide-on-small">Home</p>
                        </button>
                    </Link>

                    {/* Navigation links hidden if not signed in */}
                    <SignedIn>
                    <Link href="/following" className="nav-btn">
                        <button>
                            <img src="../../images/icon-follow.png" alt="Following Button" className="sidebar-img"/>
                            <p className="nav-p hide-on-small">Following</p>
                        </button>
                    </Link>
                    </SignedIn>

                    <Link href="/users" className="nav-btn">
                        <button>
                            <img src="../../images/icon-find.png" alt="Find User Button" className="sidebar-img"/>
                            <p className="nav-p hide-on-small">Find User</p>
                        </button>
                    </Link>
                </nav>
            </div>

            <div className="sidebar-bottom">
                <UserAreaLarge />
                <UserAreaSmall />
            </div>
        </header>
    )
}