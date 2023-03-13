import Link from "next/link";
import { RiGithubFill } from "react-icons/ri";
import { ActiveLink } from "./ActiveLink";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { ResponsiveNavBar } from "./ResponsiveNavBar";
import { SignInButton } from "./SignInButton";
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleOpenResponsiveMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="border-b border-secondary">
      <div className="max-w-[1120px] mx-auto px-8 h-[80px] flex items-center relative max-md:justify-between">
        <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-tertiary to-highlight text-3xl font-bold">
          BookFinder
          </h2>

        <nav className="ml-20 gap-8 flex h-full max-md:hidden">
          <ActiveLink path="/" title="Home" />
          <ActiveLink path="/books" title="Books" includes />
        </nav>

        <SignInButton />

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
