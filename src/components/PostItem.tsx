import Link from "next/link";

interface PostProps {
  pusblishDate: string;
  title: string;
  description: string;
  slug: string;
}

export function PostItem({
  pusblishDate,
  description,
  title,
  slug,
}: PostProps) {
  return (
    <section className="flex w-full flex-col border-b border-secondary mb-8 pb-8">
      <data className="text-secondary">{pusblishDate}</data>

      <Link
        href={`/books/${slug}`}
        className="mt-4 text-headline transition-colors hover:text-highlight hover:underline"
      >
        <strong className="text-2xl  font-bold">{title}</strong>
      </Link>

      <p className="text-paragraph mt-2 text-lg leading-relaxed text-justify">
        {description}
      </p>
    </section>
  );
}
