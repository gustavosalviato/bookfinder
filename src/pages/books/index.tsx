import { Header } from "@/components/Header";
import { PostItem } from "@/components/PostItem";
import { gql, useQuery } from "@apollo/client";

const GET_BOOKS_QUERY = gql`
  query {
    books {
      id
      published_at
      title
      slug
      summary {
        raw
      }
    }
  }
`;

interface GetBooksResponse {
  books: {
    id: string;
    published_at: string;
    title: string;
    slug: string;
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

export default function Books() {
  const { data } = useQuery<GetBooksResponse>(GET_BOOKS_QUERY);

  console.log(data);

  return (
    <div className="h-screen w-full flex flex-col">
      <Header />

      <main className="mt-20 mb-20 max-w-[720px] mx-auto px-4 flex flex-col max-sm:px-8">
        {data?.books.map((book) => (
          <PostItem
            key={book.id}
            pusblishDate={book.published_at}
            description={book.summary.raw.children[0].children[0].text}
            title={book.title}
            slug={book.slug}
          />
        ))}
      </main>
    </div>
  );
}
