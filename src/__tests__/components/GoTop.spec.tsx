/* eslint-disable prettier/prettier */
import { GoTop } from "../../components/GoTop";
import { render, screen, fireEvent } from "@testing-library/react";

describe("GoTop component", () => {
  it("should render the GoTop component", () => {
    render(<GoTop />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call funtion scrollTop when hits the button", () => {
    const handleScrollTopMocked = jest.fn();

    render(<GoTop onScrollTop={handleScrollTopMocked} />);

    const buttonGoTop = screen.getByRole('button')

    fireEvent.click(buttonGoTop)

    expect(handleScrollTopMocked).toHaveBeenCalled();
  });
});
