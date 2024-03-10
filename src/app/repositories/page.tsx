// External Dependencies
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// Relative Dependencies

type Props = {
  params: {
    repoID: string;
  };
};

const Page = async (props: Props) => {
  const res = auth();

  if (!res.userId) {
    redirect("/");
  }

  return <div className="flex"></div>;
};

export default Page;
