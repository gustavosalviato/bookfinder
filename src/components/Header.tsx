import Link from "next/link";
import { RiGithubFill } from "react-icons/ri";
import { ActiveLink } from "./ActiveLink";
export function Header() {
  return (
    <header className="h-20 border-b border-secondary">
      <div className="h-20 max-w-[1120px] mx-auto px-8 flex items-center">
        <h2 className="text-3xl font-bold">BookFinder</h2>

        <nav className="ml-20 h-20 gap-8 flex">
          <ActiveLink path="/" title="Home" />

          <ActiveLink path="/books" title="Books" includes />
        </nav>

        <button className="ml-auto flex items-center justify-center gap-2 bg-shape py-4 px-6 font-bold rounded-md hover:brightness-90 transition-colors max-sm:hidden">
          <RiGithubFill size={24} className="text-highlight" />
          Sign in with GitHub
        </button>
      </div>
    </header>
  );
}
