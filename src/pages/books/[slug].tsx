/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { Header } from "@/components/Header";
import { FiCalendar, FiUser, FiBook } from "react-icons/fi";
import { useRouter } from "next/router";
export default function BookItem() {
  const router = useRouter();

  console.log(router.query.slug);
  
  return (
    <div className="h-full  w-full flex flex-col">
      <Header />

      <main className="my-20 max-w-[720px] mx-auto px-4 flex flex-col max-sm:px-8">
        <h2 className="text-5xl text-headline leading-tight font-bold">
          Next of Kin: My Conversations with Chimpanzees
        </h2>

        <div className="flex justify-start mt-4 gap-6">
          <section className="flex items-center gap-2 text-secondary">
            <FiCalendar size={20} />
            15 Mar 2021
          </section>

          <section className="flex items-center gap-2 text-secondary">
            <FiUser size={20} />
            Gustavo Henrique
          </section>

          <section className="flex items-center gap-2 text-secondary">
            <FiBook size={20} />
            15 Mar 2021
          </section>
        </div>

        <h3 className="text-2xl text-headline mt-16 font-bold">Summary</h3>

        <p className="text-paragraph leading-relaxed text-justify mt-4 text-lg">
          For 30 years Roger Fouts has pioneered communication with chimpanzees
          through sign language--beginning with a mischievous baby chimp named
          Washoe. This remarkable book describes Fout's odyssey from novice
          researcher to celebrity scientist to impassioned crusader for the
          rights of animals. Living and conversing with these sensitive
          creatures has given him a profound appreciation of what they can teach
          us about ourselves. It has also made Fouts an outspoken opponent of
          biomedical experimentation on chimpanzees. A voyage of scientific
          discovery and interspecies communication, this is a stirring tale of
          friendship, courage, and compassion that will change forever the way
          we view our biological--and spritual--next of kin.
        </p>

        <h3 className="mt-16 text-2xl font-bold">About the author</h3>

        <section className="mt-6 flex gap-3 justify-start items">
          <img
            className="w-[72px] h-[72px] rounded-full object-cover"
            src="https://github.com/gustavosalviato.png"
            alt=""
          />

          <div className="flex flex-col">
            <strong className="text-headline text-xl">Roger Fouts</strong>
            <p className="text-justify text-paragraph leading-tight mt-1">
              Know for: Next of Kin: My Conversations with Chimpanzees (1997),
              The Great Ape Project Census: Recognition for the Uncounted
              (2003).
            </p>
          </div>
        </section>

        <article>
          <p className="text-lg text-justify leading-relaxed text-paragraph mt-6">
            Roger S. Fouts is a retired American primate researcher. He was
            co-founder and co-director of the Chimpanzee and Human Communication
            Institute (CHCI) in Washington, and a professor of psychology at the
            Central Washington University. He is best known for his role in
            teaching Washoe the chimpanzee to communicate using a set of signs
            taken from American sign language.
          </p>
          <p className="text-lg text-justify leading-relaxed text-paragraph mt-6">
            Fouts is an animal rights advocate, citing the New Zealand Animal
            Welfare Act as a model for legal rights for the Great Apes
            (Hominidae), and campaigning with British primatologist Jane Goodall
            for improved conditions for chimpanzees. He has written on animal
            law and on the ethics of animal testing. He is also an adviser to
            the Oxford Centre for Animal Ethics.
          </p>
        </article>
      </main>
    </div>
  );
}
