import Link from "next/link";
import NavLinks from "@/app/components/nav-links";
import { lusitana } from "@/app/ui/fonts";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-graphql-500 p-4 md:h-40"
        href="/"
      >
        <div className="w-full text-white md:w-40">
          <div
            className={`${lusitana.className} flex items-center leading-none text-white`}
          >
            <p className="text-[30px] md:text-[44px]">GraphQL Master!</p>
          </div>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
      </div>
    </div>
  );
}
