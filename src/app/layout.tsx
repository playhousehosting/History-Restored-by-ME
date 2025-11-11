import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ConvexClientProvider } from "@/components/ConvexClientProvider"
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "History Restored by ME - Farmall Tractor Restoration",
  description: "Specializes in Farmall but Can Fix Them All!!! Expert restoration of vintage Farmall tractors and all makes and models.",
}

// Force dynamic rendering because Header uses Convex hooks
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConvexClientProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster richColors />
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  )
}
