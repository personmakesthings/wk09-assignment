// IMPORT CLERK
import { ClerkProvider } from "@clerk/nextjs"


// IMPORT COMPONENTS
import Sidebar from "@/components/Sidebar"


// IMPORT STYLES
import { Exo } from "next/font/google"
const exo = Exo({weight: "400", subsets: ["latin"]})
import "./globals.css"


// METADATA
export const metadata = {
  title: "Converso",
  description: "The best place to Connect, Convene & Converse!",
}



// ROOT LAYOUT OF APP
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={exo.className}>

          <Sidebar />

          <main>
            {children}
          </main>

        </body>
      </html>
    </ClerkProvider>
  )
}
