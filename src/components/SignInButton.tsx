import { signIn, getSession, useSession, signOut } from "next-auth/react";
import { RiGithubFill } from "react-icons/ri";
import { parseCookies } from "nookies";
export function SignInButton() {
  const { data, status } = useSession();

  if (status === "authenticated") {
    return (
      <button
        onClick={() => signOut()}
        className="ml-auto flex items-center justify-center gap-2 bg-shape py-4 px-6 font-bold rounded-md hover:brightness-90 transition-colors max-sm:ml-0 max-sm:mt-4 max-md:hidden"
      >
        <RiGithubFill size={24} className="text-tertiary" />
        {data.user?.name}
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn("github")}
      className="ml-auto flex items-center justify-center gap-2 bg-shape py-4 px-6 font-bold rounded-md hover:brightness-90 transition-colors max-sm:ml-0 max-sm:mt-4 max-md:hidden"
    >
      <RiGithubFill size={24} className="text-highlight" />
      Sign in with GitHub
    </button>
  );
}
