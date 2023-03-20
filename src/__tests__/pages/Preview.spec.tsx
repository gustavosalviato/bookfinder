/* eslint-disable prettier/prettier */
import { render, screen } from "@testing-library/react";
import PreviewBook, { getStaticProps } from "../../pages/books/preview/[slug]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { apollo } from "../../libs/apollo";

jest.mock("next-auth/react");
jest.mock("../../libs/apollo");

const bookMock = {
  id: "clf2ibo4o3ls70blon2le7dj4",
  published_at: "1997-01-01",
  slug: "next-of-kin-my-conversations-with-chimpanzees",
  summary: {
    html: "<p>For 30 years Roger Fouts has pioneered communication with chimpanzees through sign language--beginning with a mischievous baby chimp named Washoe. This remarkable book describes Fout&#39;s odyssey from novice researcher to celebrity scientist to impassioned crusader for the rights of animals. </p><p>Living and conversing with these sensitive creatures has given him a profound appreciation of what they can teach us about ourselves. It has also made Fouts an outspoken opponent of biomedical experimentation on chimpanzees. A voyage of scientific discovery and interspecies communication, this is a stirring tale of friendship, courage, and compassion that will change forever the way we view our biological--and spritual--next of kin.</p>",
  },
  title: "Next of Kin: My Conversations with Chimpanzees",
  formattedDate: "Dec 31, 1996",
};

const mockResponse = {
  data: {
    book: {
      id: "clfa4kfzg0r5b0akhr7vk27nw",
      published_at: "1988-09-01",
      slug: "a-brief-history-of-time",
      summary: {
        html: "<p>A landmark volume in science writing by one of the great minds of our time, Stephen Hawking’s book explores such profound questions as: How did the universe begin—and what made its start possible? Does time always flow forward? Is the universe unending—or are there boundaries? Are there other dimensions in space? What will happen when it all ends?</p><p>Told in language we all can understand, A Brief History of Time plunges into the exotic realms of black holes and quarks, of antimatter and “arrows of time,” of the big bang and a bigger God—where the possibilities are wondrous and unexpected. With exciting images and profound imagination, Stephen Hawking brings us closer to the ultimate secrets at the very heart of creation.</p>",
      },
      title: 'Some title for testing purposes',
    },
  },
};

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      pathname: "/",
      isFallback: false,
    }),
  };
});

describe("Preview Page", () => {
  it("should render preview page correctly", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValue({
      data: null,
      status: "unauthenticated",
    } as any);

    render(<PreviewBook book={bookMock} />);

    expect(screen.getByTestId("button-preview-sign-in")).toBeInTheDocument();
  });

  it("should render a loading indicator if fallback is true", () => {
    const useRouterMocked = jest.mocked(useRouter);

    useRouterMocked.mockReturnValueOnce({
      isFallback: true,
    } as any);

    render(<PreviewBook book={bookMock} />);

    expect(screen.getByText(/loading content\.\.\./i)).toBeInTheDocument();
  });

  it("should redirects user to book item page if user already logged in", () => {
    const useRouterMocked = jest.mocked(useRouter);

    const pushMock = jest.fn();

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

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

    render(<PreviewBook book={bookMock} />);

    expect(pushMock).toHaveBeenCalledWith(
      "/books/next-of-kin-my-conversations-with-chimpanzees"
    );
  });

  it("should load the initial data", async () => {
    const apolloMocked = jest.mocked(apollo);

    apolloMocked.query.mockResolvedValueOnce(mockResponse as any);

    const response = await getStaticProps({
      params: {
        slug: "test-slug",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          book: expect.objectContaining({
            title: 'Some title for testing purposes',
          })
        },
      })
    );
  });
});
