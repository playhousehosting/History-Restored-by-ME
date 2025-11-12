"use client"

import Link from "next/link"
import Image from "next/image"
import { Suspense, useState } from "react"
import { useAuthActions } from "@convex-dev/auth/react"
import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Menu, Search, Home, Image as ImageIcon, FileText, Mail, Settings, LogOut } from "lucide-react"

function HeaderContent() {
  // All hooks MUST be called first, unconditionally (React 19 strict rules)
  // DO NOT DESTRUCTURE - causes SSR issues with React 19
  const authActions = useAuthActions();
  const viewer = useQuery(api.users.viewer);
  const [commandOpen, setCommandOpen] = useState(false);
  
  // Handle loading state
  if (viewer === undefined || !authActions || !authActions.signOut) {
    return (
      <header className="bg-red-800 text-white shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
              <Image 
                src="/logo.png" 
                alt="History Restored by ME Logo" 
                width={64} 
                height={64} 
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
                priority
              />
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                History Restored by ME
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-red-200 transition">
                Home
              </Link>
              <Link href="/gallery" className="hover:text-red-200 transition">
                Gallery
              </Link>
              <Link href="/blog" className="hover:text-red-200 transition">
                Blog
              </Link>
              <div className="h-10 w-24 bg-red-700 animate-pulse rounded" />
            </div>
            <div className="flex md:hidden items-center gap-2">
              <div className="h-8 w-8 bg-red-700 animate-pulse rounded" />
              <div className="h-8 w-8 bg-red-700 animate-pulse rounded" />
            </div>
          </div>
        </nav>
      </header>
    )
  }

  return (
    <header className="bg-red-800 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition max-w-[60%] sm:max-w-none">
            <Image 
              src="/logo.png" 
              alt="History Restored by ME Logo" 
              width={64} 
              height={64} 
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
              priority
            />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
              History Restored by ME
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-red-200 transition">
              Home
            </Link>
            <Link href="/gallery" className="hover:text-red-200 transition">
              Gallery
            </Link>
            <Link href="/blog" className="hover:text-red-200 transition">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-red-200 transition">
              Contact
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCommandOpen(true)}
              className="text-white hover:text-red-200 hover:bg-red-700"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            {viewer ? (
              <>
                <Link href="/admin" className="hover:text-red-200 transition">
                  Admin
                </Link>
                <button
                  onClick={() => void authActions.signOut()}
                  className="bg-red-700 hover:bg-red-900 px-4 py-2 rounded transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="bg-red-700 hover:bg-red-900 px-4 py-2 rounded transition"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCommandOpen(true)}
              className="text-white hover:text-red-200 hover:bg-red-700"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-red-200 hover:bg-red-700">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>
                    Quick access to all sections
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/"><Home className="h-4 w-4 mr-2" />Home</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/gallery"><ImageIcon className="h-4 w-4 mr-2" />Gallery</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/blog"><FileText className="h-4 w-4 mr-2" />Blog</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/contact"><Mail className="h-4 w-4 mr-2" />Contact</Link>
                  </Button>
                  
                  {viewer ? (
                    <>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/admin"><Settings className="h-4 w-4 mr-2" />Admin</Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => void authActions.signOut()}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Button variant="default" className="w-full bg-red-700 hover:bg-red-800" asChild>
                      <Link href="/auth/signin">Sign In</Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Command Palette */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => { window.location.href = '/'; setCommandOpen(false); }}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/gallery'; setCommandOpen(false); }}>
              <ImageIcon className="mr-2 h-4 w-4" />
              <span>Gallery</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/blog'; setCommandOpen(false); }}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Blog</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/contact'; setCommandOpen(false); }}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Contact</span>
            </CommandItem>
          </CommandGroup>
          {viewer && (
            <CommandGroup heading="Admin">
              <CommandItem onSelect={() => { window.location.href = '/admin'; setCommandOpen(false); }}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Admin Dashboard</span>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </header>
  )
}

export default function Header() {
  return (
    <Suspense fallback={<LoadingHeader />}>
      <HeaderContent />
    </Suspense>
  )
}

function LoadingHeader() {
  return (
    <header className="bg-red-800 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition max-w-[60%] sm:max-w-none">
            <Image 
              src="/logo.png" 
              alt="History Restored by ME Logo" 
              width={64} 
              height={64} 
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
              priority
            />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
              History Restored by ME
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-red-200 transition">
              Home
            </Link>
            <Link href="/gallery" className="hover:text-red-200 transition">
              Gallery
            </Link>
            <Link href="/blog" className="hover:text-red-200 transition">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-red-200 transition">
              Contact
            </Link>
            <div className="h-10 w-24 bg-red-700 animate-pulse rounded" />
          </div>
          <div className="flex md:hidden items-center gap-2">
            <div className="h-8 w-8 bg-red-700 animate-pulse rounded" />
            <div className="h-8 w-8 bg-red-700 animate-pulse rounded" />
          </div>
        </div>
      </nav>
    </header>
  )
}
