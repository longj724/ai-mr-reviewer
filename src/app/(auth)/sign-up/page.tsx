// External Dependencies
import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="container flex flex-col items-center  ">
      <SignUp redirectUrl="/dashboard" signInUrl="/sign-in" />
    </div>
  );
};

export default Page;
