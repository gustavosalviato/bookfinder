import { RiGithubFill } from "react-icons/ri";
export function Header() {
  return (
    <header className="h-20 border-b border-secondary">
      <div className="h-20 max-w-[1120px] mx-auto px-8 flex items-center">
        <p className="text-3xl font-bold">BookFinder</p>

        <nav className="ml-20 h-20 gap-8 flex">
          <a
            href="#"
            className="inline-block relative px-2 leading-[80px] text-secondary text-lg hover:text-gray-300 transition-colors"
          >
            Home
          </a>

          <a
            href="#"
            className="inline-block relative px-2 leading-[80px] text-secondary text-lg hover:text-gray-300 transition-colors"
          >
            Books
          </a>
        </nav>

        <button className="ml-auto flex items-center justify-center gap-2 bg-shape py-4 px-6 font-bold rounded-md hover:brightness-90 transition-colors max-sm:hidden">
          <RiGithubFill size={24} className="text-highlight" />
          Sign in with GitHub
        </button>
      </div>
    </header>
  );
}
