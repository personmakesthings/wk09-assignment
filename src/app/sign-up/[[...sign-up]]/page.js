import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="page-container">
      <div className="signup-container">
        <SignUp />
      </div>
    </div>
  )
}