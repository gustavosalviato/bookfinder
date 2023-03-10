/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { Header } from "@/components/Header";
import { FiCalendar, FiUser, FiBook } from "react-icons/fi";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

interface GetBookBySlug {
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

const GET_BOOK_BY_SLUG = gql`
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
`;

export default function BookItem() {
  const router = useRouter();

  const { data } = useQuery<GetBookBySlug>(GET_BOOK_BY_SLUG, {
    variables: {
      slug: router.query.slug,
    },
  });

  return (
    <div className="h-full  w-full flex flex-col">
      <Header />

      <main className="my-20 max-w-[720px] mx-auto px-4 flex flex-col max-sm:px-8">
        <h2 className="text-5xl text-headline leading-tight font-bold">
          {data?.book.title}
        </h2>

        <div className="flex justify-start mt-4 gap-6">
          <section className="flex items-center gap-2 text-secondary">
            <FiCalendar size={20} />
            {data?.book.published_at}
          </section>

          <section className="flex items-center gap-2 text-secondary">
            <FiUser size={20} />
            {data?.book.authors[0].name}
          </section>

          <section className="flex items-center gap-2 text-secondary">
            <FiBook size={20} />
            {data?.book.pages} pages
          </section>
        </div>

        <h3 className="text-2xl text-headline mt-16 font-bold">Summary</h3>

        <article
          className="text-paragraph leading-relaxed text-justify mt-4 text-lg"
          dangerouslySetInnerHTML={{ __html: data?.book.summary.html! }}
        />

        <h3 className="mt-16 text-2xl font-bold">About the author</h3>

        <section className="mt-6 flex gap-3 justify-start items">
          <img
            className="w-[72px] h-[72px] rounded-full object-cover"
            src={data?.book.authors[0].avatar.url}
            alt=""
          />

          <div className="flex flex-col">
            <strong className="text-headline text-xl">Roger Fouts</strong>
            <p className="text-justify text-paragraph leading-tight mt-1">
              {data?.book.authors[0].subtitle}
            </p>
          </div>
        </section>

        <article
          className="text-lg text-justify leading-relaxed text-paragraph mt-6"
          dangerouslySetInnerHTML={{ __html: data?.book.authors[0].bio.html! }}
        />
      </main>
    </div>
  );
}
