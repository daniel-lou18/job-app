import { render, screen } from "@testing-library/react";
import SearchInput from "../SearchInput";
import { userEvent } from "@testing-library/user-event";
import { useQuery } from "@/hooks/useQuery";
import { ReactElement } from "react";

// Recommended approach for setting up user events + rendering a component
function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

function MockParentComponent() {
  // We can use the 'real' custom hook inside the mocked parent component
  const { query, handleQuery } = useQuery();

  return <SearchInput value={query} onChange={handleQuery} />;
}

test("it updates the value when the input field changes", async () => {
  const { user } = setup(<MockParentComponent />);

  const inputElement = screen.getByRole("textbox", { name: /search/i });

  expect(inputElement).toHaveValue("");

  await user.click(inputElement);
  await user.keyboard("développeur");

  expect(inputElement).toHaveValue("développeur");
});
