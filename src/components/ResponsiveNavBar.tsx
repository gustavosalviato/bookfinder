import Link from "next/link";
import { RiGithubFill } from "react-icons/ri";
import { ActiveLink } from "./ActiveLink";

export function ResponsiveNavBar() {
  return (
    <div className="absolute bg-shape right-5 top-14 p-6 rounded-md shadow flex justify-start items-stretch flex-col w-40 transition-all  ease-in duration-300">
      <nav className="flex flex-col gap-6">
        <ActiveLink path="/" title="Home" />
        <ActiveLink path="/books" title="Books" includes />
      </nav>

      <button className="mt-6 flex items-center justify-center gap-2 border-2 border-highlight font-bold rounded-md hover:brightness-90 transition-colors text-sm w-full py-2  uppercase px-2 group hover:bg-highlight">
        <RiGithubFill
          size={24}
          className="text-highlight  group-hover:text-white"
        />
        GITHUB
      </button>
    </div>
  );
}
