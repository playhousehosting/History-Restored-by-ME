import Link from "next/link"
import { Button } from "@/components/ui/button"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold text-red-800 mb-3 md:mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4 md:mb-6">Page Not Found</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-md mx-auto px-4">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <Link href="/">
            <Button className="bg-red-700 hover:bg-red-800 w-full sm:w-auto">
              Go Home
            </Button>
          </Link>
          <Link href="/gallery">
            <Button variant="outline" className="w-full sm:w-auto">
              View Gallery
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
