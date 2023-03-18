/* eslint-disable prettier/prettier */
import { PostItem } from "../../components/PostItem";
import { render, screen } from "@testing-library/react";
const postItem = {
  pusblishDate: "2020-01-01",
  description: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid",
  ],
  title: "Title Example",
  slug: "post-1",
  genres: ["Fiction", "Romance"],
};

describe("PostItem component", () => {
  it("should render the PostItem correctly", () => {
    render(<PostItem {...postItem} />);

    expect(
      screen.getByText(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid"
      )
    ).toBeInTheDocument();
  });
});
