"use client";
// External Dependencies
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

// Relative Dependencies
import useScroll from "~/hooks/use-scroll";
import { cn } from "~/lib/utils";

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full border-b border-gray-200 transition-all`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": selectedLayout,
        },
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row items-center justify-center space-x-3 md:hidden"
          >
            <span className="h-7 w-7 rounded-lg bg-zinc-300" />
            <span className="flex text-xl font-bold ">Logo</span>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-300 text-center">
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
