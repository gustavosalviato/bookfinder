import Link from "next/link";
import { RiGithubFill } from "react-icons/ri";
import { ActiveLink } from "./ActiveLink";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { ResponsiveNavBar } from "./ResponsiveNavBar";
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleOpenResponsiveMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="border-b border-secondary">
      <div className="max-w-[1120px] mx-auto px-8 h-[80px] flex items-center relative max-md:justify-between">
        <h2 className="text-3xl font-bold">BookFinder</h2>

        <nav className="ml-20 gap-8 flex h-full max-md:hidden">
          <ActiveLink path="/" title="Home" />
          <ActiveLink path="/books" title="Books" includes />
        </nav>

        <button className="ml-auto flex items-center justify-center gap-2 bg-shape py-4 px-6 font-bold rounded-md hover:brightness-90 transition-colors max-sm:ml-0 max-sm:mt-4 max-md:hidden">
          <RiGithubFill size={24} className="text-highlight" />
          Sign in with GitHub
        </button>

        {isMenuOpen && <ResponsiveNavBar />}

        <button
          onClick={handleOpenResponsiveMenu}
          className="opacity-0 relative max-md:opacity-100"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </header>
  );
}
