/* eslint-disable prettier/prettier */
import { ResponsiveNavBar } from "../../components/ResponsiveNavBar";
import { fireEvent, render, screen } from "@testing-library/react";
import { useSession, signIn, signOut } from "next-auth/react";

jest.mock("next-auth/react");

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      pathname: "/",
    }),
  };
});

describe("ResponsiveNavBar component", () => {
  it("should render the ResponsiveNavBar component", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    } as any);

    render(<ResponsiveNavBar />);

    expect(screen.getByTestId("reponsive-nav-bar")).toBeInTheDocument();
  });

  it("should call signIn function when hits the button and user is not autheticated", () => {
    const useSessionMocked = jest.mocked(useSession);
    const signInMocked = jest.mocked(signIn);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    } as any);

    render(<ResponsiveNavBar />);

    const button = screen.getByTestId("sign-in-button");
    fireEvent.click(button);

    expect(signInMocked).toHaveBeenCalledWith("github");
  });

  it("should call signOut function when hits the button and user is authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);
    const signOutMocked = jest.mocked(signOut);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "user",
          email: "user@example.com",
        },
      },
      status: "authenticated",
    } as any);

    render(<ResponsiveNavBar />);

    const button = screen.getByTestId("sign-out-button");
    fireEvent.click(button);

    expect(signOutMocked).toHaveBeenCalled();
  });
});
