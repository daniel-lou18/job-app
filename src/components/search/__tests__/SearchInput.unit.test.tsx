import { render, screen } from "@testing-library/react";
import SearchInput from "../SearchInput";
import { userEvent } from "@testing-library/user-event";
import { ReactElement } from "react";

const handleChange = jest.fn();

function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

test("it displays the correct value", () => {
  const testValue = "test";
  render(<SearchInput value={testValue} onChange={handleChange} />);

  const inputElement = screen.getByRole("textbox", { name: /search/i });

  expect(inputElement).toHaveValue("test");
});

test("it calls the onChange handler when the input field changes", async () => {
  const { user } = setup(<SearchInput value="" onChange={handleChange} />);

  const inputElement = screen.getByRole("textbox", { name: /search/i });

  await user.type(inputElement, "test");

  expect(handleChange).toHaveBeenCalled();
});
