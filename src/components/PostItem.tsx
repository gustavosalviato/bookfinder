import Link from 'next/link'

interface PostProps {
  pusblishDate: string
  title: string
  description: string[]
  slug: string
  genres: string[]
}

export function PostItem({
  pusblishDate,
  description,
  title,
  slug,
  genres,
}: PostProps) {
  return (
    <section className="flex w-full flex-col border-b border-secondary mb-8 pb-8">
      <data className="text-secondary">{pusblishDate}</data>

      <Link
        href={`/books/${slug}`}
        className="mt-4 text-headline transition-colors hover:text-highlight hover:underline"
      >
        <strong className="text-2xl font-bold max-sm:text-xl">{title}</strong>
      </Link>

      <p className="text-paragraph mt-2 text-lg leading-relaxed text-justify">
        {description[0]}
      </p>

      <div className="flex mt-8 h-[30px] items-center">
        <span className="text-sm text-secondary h-full leading-[30px]">
          Genres
        </span>

        <div className="flex gap-4 h-full font-bold ml-6">
          {genres.map((genre) => {
            return (
              <span
                key={genre}
                className="h-full leading-[30px] text-sm text-highlight hover:brightness-90 transition-colors"
              >
                {genre}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
