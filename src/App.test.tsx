import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByRole("heading", {
    name: "Hello from react with typescript",
  });
  expect(linkElement).toBeInTheDocument();
});
