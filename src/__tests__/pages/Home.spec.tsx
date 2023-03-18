/* eslint-disable prettier/prettier */
import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      pathname: "/",
    }),
  };
});

jest.mock("next-auth/react");

describe("Home page", () => {
  it("should render the home page correctly", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<Home />);

    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
