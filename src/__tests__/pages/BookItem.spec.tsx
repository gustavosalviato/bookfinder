/* eslint-disable prettier/prettier */
import { render, screen } from "@testing-library/react";
import BookItem, { getServerSideProps } from "../../pages/books/[slug]";
import { useSession } from "next-auth/react";
import { parseCookies } from "nookies";
import { apollo } from "../../libs/apollo";

jest.mock("next-auth/react");
jest.mocked("../../libs/apollo");
jest.mock("@apollo/client");

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      pathname: "/",
    }),
  };
});

jest.mock("nookies");

const bookMock = {
  id: "clf2ibo4o3ls70blon2le7dj4",
  pages: "448",
  published_at: "1997-01-01",
  slug: "next-of-kin-my-conversations-with-chimpanzees",
  summary: {
    html: "<p>For 30 years Roger Fouts has pioneered communication with chimpanzees through sign language--beginning with a mischievous baby chimp named Washoe. This remarkable book describes Fout&#39;s odyssey from novice researcher to celebrity scientist to impassioned crusader for the rights of animals. </p><p>Living and conversing with these sensitive creatures has given him a profound appreciation of what they can teach us about ourselves. It has also made Fouts an outspoken opponent of biomedical experimentation on chimpanzees. A voyage of scientific discovery and interspecies communication, this is a stirring tale of friendship, courage, and compassion that will change forever the way we view our biological--and spritual--next of kin.</p>",
  },
  title: "Next of Kin: My Conversations with Chimpanzees",
  authors: [
    {
      name: "Roger Fouts",
      subtitle:
        "Know for: Next of Kin: My Conversations with Chimpanzees (1997), The Great Ape Project Census: Recognition for the Uncounted (2003).",
      bio: {
        html: "<p>Roger S. Fouts is a retired American primate researcher. He was co-founder and co-director of the Chimpanzee and Human Communication Institute (CHCI) in Washington, and a professor of psychology at the Central Washington University. He is best known for his role in teaching Washoe the chimpanzee to communicate using a set of signs taken from American sign language.</p><p>Fouts is an animal rights advocate, citing the New Zealand Animal Welfare Act as a model for legal rights for the Great Apes (Hominidae), and campaigning with British primatologist Jane Goodall for improved conditions for chimpanzees. He has written on animal law and on the ethics of animal testing. He is also an adviser to the Oxford Centre for Animal Ethics.</p>",
      },
      avatar: {
        url: "https://media.graphassets.com/7hnop9ycR46ReVhHdMSU",
      },
    },
  ],
  formattedDate: "Dec 31, 1996",
};

const mockResponse = {
  data: {
    book: {
      id: "clf35s0eh4vyo0blo2o4biegx",
      pages: "659",
      published_at: "1977-01-28",
      slug: "the-shining",
      summary: {
        html: "<p>Jack Torrance&#39;s new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he&#39;ll have plenty of time to spend reconnecting with his family and working on his writing. </p><p>But as the harsh winter weather sets in, the idyllic location feels ever more remote...and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old.</p>",
      },
      title: "The Shining",
      authors: [
        {
          name: "Stephen King",
          subtitle: "Know for: The Shining (1997)",
          bio: {
            html: "<p>Stephen Edwin King was born the second son of Donald and Nellie Ruth Pillsbury King. After his father left them when Stephen was two, he and his older brother, David, were raised by his mother. Parts of his childhood were spent in Fort Wayne, Indiana, where his father&#39;s family was at the time, and in Stratford, Connecticut. When Stephen was eleven, his mother brought her children back to Durham, Maine, for good. Her parents, Guy and Nellie Pillsbury, had become incapacitated with old age, and Ruth King was persuaded by her sisters to take over the physical care of them. Other family members provided a small house in Durham and financial support. After Stephen&#39;s grandparents passed away, Mrs. King found work in the kitchens of Pineland, a nearby residential facility for the mentally challenged.</p><p>He met Tabitha Spruce in the stacks of the Fogler Library at the University, where they both worked as students; they married in January of 1971. As Stephen was unable to find placement as a teacher immediately, the Kings lived on his earnings as a laborer at an industrial laundry, and her student loan and savings, with an occasional boost from a short story sale to men&#39;s magazines.</p><p>Stephen made his first professional short story sale (&quot;The Glass Floor&quot;) to Startling Mystery Stories in 1967. Throughout the early years of his marriage, he continued to sell stories to men&#39;s magazines. Many were gathered into the Night Shift collection or appeared in other anthologies.</p><p></p><p>In the fall of 1971, Stephen began teaching English at Hampden Academy, the public high school in Hampden, Maine. Writing in the evenings and on the weekends, he continued to produce short stories and to work on novels.</p>",
          },
          avatar: {
            url: "https://media.graphassets.com/VBXAfTBR4zJy4z30qswd",
          },
        },
      ],
    },
  },
};

describe("BookItem Page", () => {
  it("should render the page correctly", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John",
          email: "john@example.com",
        },
      },
      status: "authenticated",
    } as any);

    render(<BookItem book={bookMock} />);

    expect(
      screen.getByText(
        "Know for: Next of Kin: My Conversations with Chimpanzees (1997), The Great Ape Project Census: Recognition for the Uncounted (2003)."
      )
    ).toBeInTheDocument();
    expect(screen.getByAltText("Roger Fouts")).toBeInTheDocument();
  });

  it("should redirect user to preview page if user is not logged in", async () => {
    const parseCookiesMocked = jest.mocked(parseCookies);

    parseCookiesMocked.mockReturnValueOnce({
      "next-auth.session-token": undefined,
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: "test-slug",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/books/preview/test-slug",
        }),
      })
    );
  });

  it("should loads the inital data", async () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "test",
          email: "test@example.com",
        },
      },
      status: "authenticated",
    } as any);

    const parseCookiesMocked = jest.mocked(parseCookies);

    parseCookiesMocked.mockReturnValue({
      "__Secure-next-auth.session-token": "test-next-auth.session-token",
    } as any);

    const mockedApollo = jest.mocked(apollo);

    mockedApollo.query.mockResolvedValueOnce(mockResponse as any);

    const response = await getServerSideProps({
      params: {
        slug: "test-slug",
      },
    } as any);


    expect(response).toEqual(
      expect.objectContaining({
        props: {
          book: expect.objectContaining({
            title: "The Shining",
          }),
        },
      })
    );
  });
});
