// External Dependencies
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// Relative Dependencies

type Props = {};

const Page = async (props: Props) => {
  const res = auth();

  if (!res.userId) {
    redirect("/");
  }

  return (
    <div className="h-24 w-screen">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Page;
