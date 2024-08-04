import { render, screen } from "@testing-library/react";
import SearchInput from "../SearchInput";
import { userEvent } from "@testing-library/user-event";
import { useJobsFilter } from "@/hooks/useJobsFilter";
import data from "@/utils/data.json";
import { ReactElement } from "react";

function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

function MockParentComponent() {
  const { query, handleQuery } = useJobsFilter(data.slice(0, 3));

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
