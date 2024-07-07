// IMPORT MODULES
import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"


// CLERK MIDDLEWARE
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})


// LIST OF PROTECTED ROUTES
const isProtectedRoute = createRouteMatcher([
  "/registration(.*)",
  "/new-post",
  "/post/(.*)/edit",
  "/users/(.*)/edit",
  "/edit-comment/(.*)",
  "/following",
])


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}