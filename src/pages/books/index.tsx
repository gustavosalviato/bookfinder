import { Header } from '../../components/Header'
import { InputText } from '../../components/InputText'
import { PostItem } from '../../components/PostItem'
import { apollo } from '../../libs/apollo'
import { gql } from '@apollo/client'
import { GetStaticProps } from 'next'
import { useMemo, useState } from 'react'
interface IBooks {
  books: {
    id: string
    published_at: string
    title: string
    slug: string
    formattedDate: string
    summary: {
      raw: {
        children: {
          children: {
            text: string
          }[]
        }[]
      }
    }
    genres: string[]
  }[]
}

export default function Books({ books }: IBooks) {
  const [allBooks, setAllBooks] = useState(books)
  const [search, setSearch] = useState('')

  const searchLowerCase = search.toLowerCase()

  const filteredBooks = useMemo(() => {
    return allBooks.filter((book, i) => {
      return book.genres.find((genre) => {
        return genre.toLowerCase().includes(searchLowerCase)
      })
    })
  }, [allBooks, searchLowerCase])

  const description = filteredBooks.map((book) => {
    return book.summary.raw.children.find((child) => {
      return child.children[0].text
    })
  })

  return (
    <div className="h-screen w-full flex flex-col">
      <Header />

      <main className="max-w-[720px] w-full mx-auto px-4 flex flex-col max-sm:px-8">
        <div className="mt-10 flex gap-6 items-center justify-start w-full">
          <InputText
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <section className="mt-8 mb-20">
          {filteredBooks.map((book, i) => (
            <PostItem
              key={book.id}
              pusblishDate={book.formattedDate}
              description={book.summary.raw.children.map((child) => {
                return child.children[0].text
              })}
              title={book.title}
              slug={book.slug}
              genres={book.genres}
            />
          ))}

          {filteredBooks.length === 0 && (
            <div className="flex justify-center items-center flex-col h-52 mt-16">
              <img
                src="/images/levitate.svg"
                alt=""
                className="w-[300px] h-[300px] max-sm:h-25 max-sm:w-25"
              />
              <strong className="text-2xl text-headline font-bold textce">
                No results to show
              </strong>
              <p className="text-secondary text-lg text-center">
                Please check spelling or try different keywords
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await apollo.query({
    query: gql`
      {
        books(orderBy: publishedAt_ASC) {
          id
          published_at
          title
          slug
          summary {
            raw
          }
          genres {
            id
            title
          }
        }
      }
    `,
  })

  const books = data.books.map((book: any) => {
    return {
      ...book,
      formattedDate: new Date(book.published_at).toLocaleString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      genres: book.genres.map(
        (genre: { title: string; id: string }) => genre.title,
      ),
    }
  })

  return {
    props: {
      books,
    },
  }
}
