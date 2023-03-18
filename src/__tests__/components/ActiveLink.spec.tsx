/* eslint-disable prettier/prettier */
import { ActiveLink } from "../../components/ActiveLink";
import { screen, render } from "@testing-library/react";
import { useRouter } from "next/router";

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn().mockReturnValueOnce({
      pathname: "/",
    }),
  };
});

describe("ActiveLink", () => {
  it("should render activeLink correctly", () => {

    render(<ActiveLink path="/" title="Home" />);

    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
