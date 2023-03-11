/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { Header } from "@/components/Header";
import { FiCalendar, FiUser, FiBook } from "react-icons/fi";
import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { apollo } from "@/libs/apollo";
import { GoTop } from "@/components/GoTop";
interface GetBookBySlugResponse {
  book: {
    id: string;
    pages: string;
    published_at: string;
    slug: string;
    title: string;
    summary: {
      html: string | undefined;
    };
    authors: {
      name: string;
      subtitle: string;
      avatar: {
        url: string;
      };
      bio: {
        html: string;
      };
    }[];
  };
}

interface IBook {
  id: string;
  pages: string;
  published_at: string;
  formattedDate: string;
  slug: string;
  title: string;
  summary: {
    html: string | undefined;
  };
  authors: {
    name: string;
    subtitle: string;
    avatar: {
      url: string;
    };
    bio: {
      html: string;
    };
  }[];
}

interface BookItemProps {
  book: IBook;
}
export default function BookItem({ book }: BookItemProps) {
  return (
    <div className="h-full  w-full flex flex-col relative">
      <Header />

      <main className="my-20 max-w-[720px] mx-auto px-4 flex flex-col max-sm:px-8">
        <h2 className="text-5xl max-sm:text-4xl text-headline leading-tight font-bold">
          {book.title}
        </h2>

        <div className="flex justify-start mt-4 gap-6 max-sm:items-start  max-sm:mt-6 max-sm:flex-col">
          <section className="flex items-center gap-2 text-secondary">
            <FiCalendar size={20} />
            {book.formattedDate}
          </section>

          <section className="flex items-center gap-2 text-secondary">
            <FiUser size={20} />
            {book.authors[0].name}
          </section>

          <section className="flex items-center gap-2 text-secondary">
            <FiBook size={20} />
            {book.pages} pages
          </section>
        </div>

        <h3 className="text-2xl text-headline mt-16 font-bold max-sm:text-xl">Summary</h3>

        <article
          className="text-paragraph leading-relaxed text-justify mt-4 text-lg"
          dangerouslySetInnerHTML={{ __html: book.summary.html! }}
        />

        <h3 className="mt-16 text-2xl font-bold max-sm:text-xl">About the author</h3>

        <section className="mt-6 flex gap-3 justify-start items max-sm:flex-col max-sm:mt-8">
          <img
            className="w-[72px] h-[72px] rounded-full object-cover max-sm:justify-self-center mx-auto"
            src={book.authors[0].avatar.url}
            alt=""
          />

          <div className="flex flex-col">
            <strong className="text-headline text-xl">Roger Fouts</strong>
            <p className="text-justify text-paragraph leading-tight mt-1">
              {book.authors[0].subtitle}
            </p>
          </div>
        </section>

        <article
          className="text-lg text-justify leading-relaxed text-paragraph mt-6"
          dangerouslySetInnerHTML={{ __html: book.authors[0].bio.html! }}
        />
      </main>
      
      <GoTop />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  interface GetBooksSlugResponse {
    books: {
      slug: string;
    }[];
  }
  const { data } = await apollo.query<GetBooksSlugResponse>({
    query: gql`
      query GetAllBooks {
        books {
          slug
        }
      }
    `,
  });

  const paths = data.books.map((book) => {
    return {
      params: {
        slug: book.slug,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apollo.query<GetBookBySlugResponse>({
    query: gql`
      query GetBookBySlug($slug: String!) {
        book(where: { slug: $slug }) {
          id
          pages
          published_at
          slug
          summary {
            html
          }
          title
          authors {
            name
            subtitle
            bio {
              html
            }
            avatar {
              url
            }
          }
        }
      }
    `,
    variables: {
      slug: params?.slug as string,
    },
  });

  const book = {
    ...data.book,
    formattedDate: new Date(data.book.published_at!).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  };

  return {
    props: {
      book,
    },
  };
};
