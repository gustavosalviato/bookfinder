/* eslint-disable prettier/prettier */
import { Hero } from "../../components/Hero";
import { render, screen } from "@testing-library/react";

describe("Hero component", () => {
  it("should render the Hero component", () => {
    render(<Hero />);

    expect(screen.getByText("🎉 hey, welcome")).toBeInTheDocument();
  });
});
