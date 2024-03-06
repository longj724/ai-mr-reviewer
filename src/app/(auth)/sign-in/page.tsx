// External Dependencies
import { SignIn } from "@clerk/nextjs";

const Page = async () => {
  return (
    <div className="container flex flex-col items-center">
      <SignIn redirectUrl="/dashboard" signUpUrl="/sign-up" />
    </div>
  );
};

export default Page;
