import Link from "next/link";
import { useRouter } from "next/router";
import { clsx } from "clsx";
interface ActiveLinkProps {
  path: string;
  title: string;
  includes?: boolean;
}

export function ActiveLink({ path, title, includes = false }: ActiveLinkProps) {
  const router = useRouter();

  function verifyIfIsActive() {
    if (includes) {
      return router.pathname.includes(path);
    }

    return router.pathname === path;
  }

  const isActive = verifyIfIsActive();
  return (
    <div>
      <Link
        href={path}
        className={clsx(
          "inline-block relative px-2 leading-[80px] text-lg hover:text-gray-300 transition-colors font-bold",
          {
            "text-white": isActive,
            "text-secondary": !isActive,
          }
        )}
      >
        {title}
      </Link>
    </div>
  );
}
