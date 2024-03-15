"use client";
// External Dependencies
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Relative Dependencies
import { SidebarItem as SidebarItemType } from "~/lib/types";
import { cn } from "~/lib/utils";

const SidebarItem = ({ item }: { item: SidebarItemType }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(pathname.includes(item.path));
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`hover-bg-zinc-100 flex w-full flex-row items-center justify-between rounded-lg p-1 hover:bg-zinc-100`}
          >
            <div className="flex flex-row items-center space-x-2">
              {item.icon}
              <span className="flex text-xl  font-semibold">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <ChevronDown size={24} />
            </div>
          </button>

          {subMenuOpen && (
            <div className="align-right my-2 flex w-full flex-col">
              {item.subMenuItems?.map((subItem, idx) => (
                <div className="flex w-full flex-row" key={idx}>
                  <Link
                    href={subItem.path}
                    className={cn(
                      "w-full rounded-lg p-2 hover:bg-gray-200",
                      pathname.includes(subItem.path) ? "bg-gray-100 " : "",
                    )}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row items-center space-x-2 rounded-lg p-1 hover:bg-zinc-100 ${
            item.path.includes(pathname) ? "bg-zinc-100" : ""
          }`}
        >
          {item.icon}
          <span className="flex text-xl font-semibold">{item.title}</span>
        </Link>
      )}
    </div>
  );
};

export default SidebarItem;
