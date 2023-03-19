/* eslint-disable prettier/prettier */
import { render, screen } from "@testing-library/react";
import Books, { getStaticProps } from "../../pages/books/index";
import { useSession } from "next-auth/react";
import { apollo } from "../../libs/apollo";



jest.mock("next/router", () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      pathname: "/",
    }),
  };
});

jest.mock("@apollo/client");
jest.mock("../../libs/apollo");
jest.mock("next-auth/react");

const booksMock = [
  {
    id: "clf2ibo4o3ls70blon2le7dj4",
    published_at: "1997-01-01",
    title: "Next of Kin: My Conversations with Chimpanzees",
    slug: "next-of-kin-my-conversations-with-chimpanzees",
    summary: {
      raw: {
        children: [
          {
            type: "paragraph",
            children: [
              {
                text: "For 30 years Roger Fouts has pioneered communication with chimpanzees through sign language--beginning with a mischievous baby chimp named Washoe. This remarkable book describes Fout's odyssey from novice researcher to celebrity scientist to impassioned crusader for the rights of animals. ",
              },
            ],
          },
        ],
      },
    },
    genres: ["Fiction"],
    formattedDate: "December 31, 1996",
  },
];

const myMock = {
  data: {
    books: [
      {
        id: "clf2ibo4o3ls70blon2le7dj4",
        published_at: "1997-01-01",
        title: "Title Test",
        slug: "test-slug",
        summary: {
          raw: {
            children: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Living and conversing with these sensitive creatures has given him a profound appreciation of what they can teach us about ourselves. It has also made Fouts an outspoken opponent of biomedical experimentation on chimpanzees. A voyage of scientific discovery and interspecies communication, this is a stirring tale of friendship, courage, and compassion that will change forever the way we view our biological--and spritual--next of kin.",
                  },
                ],
              },
            ],
          },
        },
        genres: [
          {
            id: "clf445mjm5kvk0bloaxvej7f8",
            title: "Fiction",
          },
        ],
      },
    ],
  },
};

describe("Books page", () => {
  it("should render the home page correctly", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<Books books={booksMock} />);

    expect(screen.getByText("December 31, 1996")).toBeInTheDocument();

    expect(
      screen.getByText("Next of Kin: My Conversations with Chimpanzees")
    ).toBeInTheDocument();
  });

  it("loads the initial data", async () => {
    const mockedApollo = jest.mocked(apollo);

    mockedApollo.query.mockResolvedValueOnce(myMock as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          books: [
            expect.objectContaining({
              title: "Title Test",
              slug: "test-slug",
            }),
          ],
        },
      })
    );
  });
});
