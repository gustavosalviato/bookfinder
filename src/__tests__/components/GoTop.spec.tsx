/* eslint-disable prettier/prettier */
import { GoTop } from "../../components/GoTop";
import { render, screen } from "@testing-library/react";

describe("GoTop component", () => {
  it("should render the GoTop component", () => {
    render(<GoTop />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
