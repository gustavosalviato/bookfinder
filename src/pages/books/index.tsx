import { Header } from "@/components/Header";
import { PostItem } from "@/components/PostItem";

export default function Books() {
  return (
    <div className="h-screen w-full flex flex-col">
      <Header />

      <main className="mt-20 mb-20 max-w-[720px] mx-auto px-4 flex flex-col max-sm:px-8">
        <PostItem
          pusblishDate="03 de novembro de 1994"
          description="Christopher John Francis Boone knows all the countries of the world and their capitals and every prime number up to 7,057. He relates well to animals but has no understanding of human emotions."
          title="The Curious Incident of the Dog in the Night-Time
         "
        />

        <PostItem
          pusblishDate="03 de novembro de 1994"
          description="Christopher John Francis Boone knows all the countries of the world and their capitals and every prime number up to 7,057. He relates well to animals but has no understanding of human emotions."
          title="The Curious Incident of the Dog in the Night-Time
         "
        />

        <PostItem
          pusblishDate="03 de novembro de 1994"
          description="Christopher John Francis Boone knows all the countries of the world and their capitals and every prime number up to 7,057. He relates well to animals but has no understanding of human emotions."
          title="The Curious Incident of the Dog in the Night-Time
         "
        />

        <PostItem
          pusblishDate="03 de novembro de 1994"
          description="Christopher John Francis Boone knows all the countries of the world and their capitals and every prime number up to 7,057. He relates well to animals but has no understanding of human emotions."
          title="The Curious Incident of the Dog in the Night-Time
         "
        />

        <PostItem
          pusblishDate="03 de novembro de 1994"
          description="Christopher John Francis Boone knows all the countries of the world and their capitals and every prime number up to 7,057. He relates well to animals but has no understanding of human emotions."
          title="The Curious Incident of the Dog in the Night-Time
         "
        />
      </main>
    </div>
  );
}
