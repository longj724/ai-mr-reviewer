"use client";
// External Dependencies
import { unstable_noStore as noStore } from "next/cache";
import { useRouter } from "next/navigation";

// Relative Dependencies
import { Button } from "~/components/ui/button";

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
        <Button onClick={onSignIn}>Sign In</Button>
        <p>Or</p>
        <Button onClick={onSignUp}>Sign Up</Button>
      </div>
    </div>
  );
}
