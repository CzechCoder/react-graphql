"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TableViewIcon from "@mui/icons-material/TableView";
import ListAltIcon from "@mui/icons-material/ListAlt";

const links = [
  { name: "Tables", href: "/", icon: TableViewIcon },
  {
    name: "Forms",
    href: "/forms",
    icon: ListAltIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-graphql-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "border border-solid border-graphql-500 text-graphql-500":
                  pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
