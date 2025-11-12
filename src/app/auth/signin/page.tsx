"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, LogIn, Mail, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function SignInPage() {
  // All hooks MUST be called first, unconditionally (React 19 strict rules)
  // DO NOT DESTRUCTURE - causes SSR issues with React 19
  const authActions = useAuthActions();
  const router = useRouter();
  const settings = useQuery(api.siteSettings.get);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if signIn is available (should always be true after ConvexAuth loads)
  if (!authActions || !authActions.signIn || settings === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 flex items-center justify-center p-4">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative w-full max-w-md">
          <Card className="border-none bg-white/5 backdrop-blur-sm shadow-2xl animate-pulse">
            <CardContent className="p-8 space-y-4">
              <div className="h-8 bg-slate-700/50 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-slate-700/50 rounded mb-8 w-full"></div>
              <div className="space-y-4">
                <div className="h-12 bg-slate-700/50 rounded"></div>
                <div className="h-12 bg-slate-700/50 rounded"></div>
                <div className="h-12 bg-slate-700/50 rounded"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Check if sign-in is disabled
  if (!settings.signInEnabled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 flex items-center justify-center py-12 px-4">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <Card className="relative w-full max-w-md border-none bg-white/5 backdrop-blur-sm shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-white">Sign-In Unavailable</CardTitle>
            <CardDescription className="text-gray-400 text-base">
              Sign-in is currently disabled
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-red-600/30 bg-red-600/10 text-red-400">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Sign-in is temporarily unavailable. Please try again later or contact the site administrator if this is urgent.
              </AlertDescription>
            </Alert>
            <div className="text-center pt-4">
              <Link href="/">
                <Button variant="outline" className="w-full bg-white/5 border-slate-700 text-white hover:bg-white/10">
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authActions.signIn("password", { email, password, flow: "signIn" });
      toast.success("Signed in successfully!");
      router.push("/admin");
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 flex items-center justify-center py-12 px-4">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <Card className="relative w-full max-w-md border-none bg-white/5 backdrop-blur-sm shadow-2xl">
        <CardHeader className="space-y-3 text-center pb-8">
          <Badge className="mx-auto px-6 py-2 bg-red-600/10 text-red-400 border-red-600/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Admin Access
          </Badge>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Sign In
          </CardTitle>
          <CardDescription className="text-gray-400 text-base">
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-slate-700 text-white placeholder:text-gray-500 focus:border-red-500 h-12"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/5 border-slate-700 text-white placeholder:text-gray-500 focus:border-red-500 h-12"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-base font-semibold" 
              disabled={isLoading}
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-gray-400">Or</span>
            </div>
          </div>

          <Link href="/auth/magic-link">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <Mail className="h-4 w-4 mr-2" />
              Sign In with Magic Link
            </Button>
          </Link>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-red-400 hover:text-red-300 font-semibold transition">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
