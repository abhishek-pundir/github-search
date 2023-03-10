import { render, screen } from "@testing-library/react";
import ErrorMessage from "./index";

describe("ErrorMessage component", () => {
  it("renders error message passed via props", () => {
    render(<ErrorMessage message="Test error message" />);
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });
});
