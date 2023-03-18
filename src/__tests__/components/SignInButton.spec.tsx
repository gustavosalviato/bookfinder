/* eslint-disable prettier/prettier */
import { SignInButton } from "../../components/SignInButton";
import { screen, render, fireEvent } from "@testing-library/react";
import { useSession, signIn, signOut } from "next-auth/react";

jest.mock("next-auth/react");

describe("SignIn Button", () => {
  it("should render sign in button correctly when user is not authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    } as any);

    render(<SignInButton />);

    expect(screen.getByText("Sign in with GitHub")).toBeInTheDocument();
  });

  it("should render the right text when user is authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "kenaa@example.com",
        },
      },
      status: "authenticated",
    } as any);

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("should hits the function SignOut if user is authenticated", () => {
    const signOutMocked = jest.mocked(signOut);
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "kenaa@example.com",
        },
      },
      status: "authenticated",
    } as any);

    render(<SignInButton />);

    const signOutButton = screen.getByText("John Doe");

    fireEvent.click(signOutButton);

    expect(signOutMocked).toHaveBeenCalled();
  });

  it("should hits the function SignIn if user is not authenticated", () => {
    const signInMocked = jest.mocked(signIn);
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    } as any);

    render(<SignInButton />);

    const signInButton = screen.getByText("Sign in with GitHub");

    fireEvent.click(signInButton);

    expect(signInMocked).toHaveBeenCalledWith("github");
  });
});
