/* eslint-disable prettier/prettier */
import { InputText } from "../../components/InputText";
import { fireEvent, render, screen } from "@testing-library/react";

describe("GoTop component", () => {
  it("should render the InputText component", () => {
    render(<InputText />);

    expect(
      screen.getByPlaceholderText("Search for a genre")
    ).toBeInTheDocument();
  });
});
