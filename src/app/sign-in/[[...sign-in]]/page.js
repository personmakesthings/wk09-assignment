import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="page-container">
      <div className="signup-container">
        <SignIn />
      </div>
    </div>
  )
}