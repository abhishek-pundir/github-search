import { render, screen } from "@testing-library/react";
import Loader from "./index";

describe("Loader", () => {
  it("renders loader correctly", () => {
    render(<Loader />);
    expect(screen.getByTestId("bounce-loader")).toBeInTheDocument();
  });
});
