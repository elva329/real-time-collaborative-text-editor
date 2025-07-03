"use client";

import { ReactNode } from "react";
import { ClerkProvider, useAuth, SignIn } from "@clerk/clerk-react"
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient, Authenticated, Unauthenticated, AuthLoading, ConvexProvider } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk
        useAuth={useAuth}
        client={convex}
      >
        <Authenticated>
          {children}
        </Authenticated>
        <Unauthenticated>
          <div className='flex flex-col justify-center items-center min-h-screen '>
            <SignIn />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <p>Loading auth...</p>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}