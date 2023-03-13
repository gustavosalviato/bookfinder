import Link from 'next/link'

export function Hero() {
  return (
    <section className="max-w-[600px] max-lg:w-full max-sm:w-full">
      <span className="text-2xl font-bold max-lg:text-xl">🎉 hey, welcome</span>

      <h1 className="text-7xl font-bold mt-10 max-lg:text-5xl">
        Deciding what to read <span className="text-tertiary">next?</span>
      </h1>

      <p className="mt-6 text-secondary text-2xl max-lg:text-xl">
        We’ll give you surprisingly{' '}
        <span className="text-tertiary font-bold">
          insightful recommendations
        </span>
      </p>

      <Link href="/books">
        <button className="mt-14 h-12 bg-highlight rounded-md font-medium text-lg transition-colors hover:brightness-90 w-[300px] max-lg:w-full ">
          Start to discover
        </button>
      </Link>
    </section>
  )
}
