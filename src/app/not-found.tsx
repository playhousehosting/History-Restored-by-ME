import Link from "next/link"
import { Button } from "@/components/ui/button"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-red-800 mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button className="bg-red-700 hover:bg-red-800">
              Go Home
            </Button>
          </Link>
          <Link href="/gallery">
            <Button variant="outline">
              View Gallery
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
