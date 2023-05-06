import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

test("Adding an ingredient", () => {
  render(<App />);
  const ingredientInput = screen.getByPlaceholderText("add ingredient");
  const addButton = screen.getByText("+");

  fireEvent.change(ingredientInput, { target: { value: "Tomatoes" } });
  fireEvent.click(addButton);

  const tag = screen.getByText("Tomatoes");
  expect(tag).toBeInTheDocument();
});