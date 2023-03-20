/* eslint-disable prettier/prettier */
import { screen, render } from "@testing-library/react";
import { Header } from "../../components/Header";
import { SessionProvider } from "next-auth/react";

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      pathname: "/",
    }),
  };
});

describe("Header component", () => {
  it("should render Header correctly", () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );
    expect(screen.getByText("BookFinder")).toBeInTheDocument();
  });
});
