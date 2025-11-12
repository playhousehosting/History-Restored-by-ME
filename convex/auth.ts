import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password,
    // For magic links, Convex Auth uses the Password provider
    // The frontend sends a special code that's verified server-side
  ],
});
