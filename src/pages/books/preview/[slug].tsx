/* eslint-disable react/no-unescaped-entities */
import { Header } from "@/components/Header";
import { apollo } from "@/libs/apollo";
import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface PreviewBookProps {
  book: {
    id: string;
    formattedDate: string;
    slug: string;
    title: string;
    summary: {
      html: string | undefined;
    };
  };
}

export default function PreviewBook({ book }: PreviewBookProps) {
  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session.data?.user) {
      router.push(`/books/${book?.slug}`);
    }
  }, [book?.slug]);

  if (router.isFallback) {
    <div className="h-screen flex justify-center items-center">
      <p className="text-xl font-bold text-highlight animate-bounce">
        loading content...
      </p>
    </div>;
  }

  return (
    <div className="h-full  w-full flex flex-col relative">
      <Header />

      {book ? (
        <main className="my-20 max-w-[720px] w-full mx-auto px-4 flex flex-col max-sm:px-8">
          <h2 className="text-5xl max-sm:text-4xl text-headline leading-tight font-bold">
            {book?.title}
          </h2>

          <div>
            <p className="text-secondary text-sm">{book?.formattedDate}</p>
          </div>

          <article
            // className={styles.previewContent}
            className="text-justify leading-relaxed mt-6 text-paragraph bg-clip-text text-transparent bg-gradient-to-b from-paragraph to-transparent"
            dangerouslySetInnerHTML={{ __html: book?.summary.html! }}
          />

          <button
            onClick={() => signIn("github")}
            className="mt-12 w-full rounded-md bg-shape h-12 font-medium transition-colors text-lg duration-300 hover:brightness-90 max-md:text-base"
          >
            Want to continue reading?{" "}
            <strong className="text-highlight">Sign in 🙋</strong>
          </button>
        </main>
      ) : (
        <div className="h-screen flex justify-center items-center animate-pulse">
          <p className="text-xl font-bold text-highlight animate-pulse">
            Loading content...
          </p>
        </div>
      )}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apollo.query({
    query: gql`
      query GetBookBySlug($slug: String!) {
        book(where: { slug: $slug }) {
          id
          published_at
          slug
          summary {
            html
          }
          title
        }
      }
    `,
    variables: {
      slug: params?.slug as string,
    },
  });

  const book = {
    ...data.book,
    formattedDate: new Date(data?.book?.published_at!).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  };


  return {
    props: {
      book,
    },
    revalidate: 60 * 60 * 24, // 1 day
  };
};
