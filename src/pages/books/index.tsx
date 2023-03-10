import { Header } from "@/components/Header";
import { InputText } from "@/components/InputText";
import { PostItem } from "@/components/PostItem";
import { apollo } from "@/libs/apollo";
import { gql, useQuery } from "@apollo/client";
import { GetStaticProps } from "next";
import { FormEvent } from "react";

interface IBooks {
  books: {
    id: string;
    published_at: string;
    title: string;
    slug: string;
    formattedDate: string;
    summary: {
      raw: {
        children: {
          children: {
            text: string;
          }[];
        }[];
      };
    };
  }[];
}

export default function Books({ books }: IBooks) {
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <Header />

      <main className=" max-w-[720px] mx-auto px-4 flex flex-col max-sm:px-8">
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex gap-6 items-center justify-start w-full"
        >
          <InputText />
          <button className="h-12 font-bold py-4 px-8 flex items-center rounded-md bg-shape text-headline hover:bg-highlight transition-all">
            SEARCH
          </button>
        </form>

        <section className="mt-8 mb-20">
          {books.map((book) => (
            <PostItem
              key={book.id}
              pusblishDate={book.formattedDate}
              description={book.summary.raw.children[0].children[0].text}
              title={book.title}
              slug={book.slug}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await apollo.query<IBooks>({
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
        }
      }
    `,
  });

  const books = data.books.map((book) => {
    return {
      ...book,
      formattedDate: new Date(book.published_at).toLocaleString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return {
    props: {
      books,
    },
  };
};
