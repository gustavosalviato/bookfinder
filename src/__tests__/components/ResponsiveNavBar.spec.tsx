/* eslint-disable prettier/prettier */
import { ResponsiveNavBar } from "../../components/ResponsiveNavBar";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      pathname: "/",
    }),
  };
});

describe("ResponsiveNavBar component", () => {
  it("should render the ResponsiveNavBar component", () => {
    render(
      <SessionProvider session={null}>
        <ResponsiveNavBar />
      </SessionProvider>
    );

    expect(screen.getByTestId("reponsive-nav-bar")).toBeInTheDocument();
  });
});
