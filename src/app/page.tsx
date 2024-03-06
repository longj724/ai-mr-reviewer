"use client";
// External Dependencies
import { unstable_noStore as noStore } from "next/cache";
import { useRouter } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

// Relative Dependencies
import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useEffect } from "react";

export default async function Home() {
  noStore();

  const router = useRouter();

  const onSignIn = () => {
    router.push("/sign-in");
  };

  const onSignUp = () => {
    router.push("/sign-up");
  };

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="container flex flex-col items-center justify-center gap-6 px-4">
        {/* <SignInButton redirectUrl="/dashboard"> */}
        <Button onClick={onSignIn}>Sign In</Button>
        {/* </SignInButton> */}
        <p>Or</p>
        {/* <SignUpButton redirectUrl="/dashboard"> */}
        <Button onClick={onSignUp}>Sign Up</Button>
        {/* </SignUpButton> */}
      </div>
    </div>
  );
}
