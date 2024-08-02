import { render, screen } from "@testing-library/react";
import SearchResults from "../SearchResults";
import data from "@/utils/data.json";

test("it renders three Job Cards", () => {
  const testData = data.slice(0, 3);

  render(<SearchResults data={testData} count={10} isLoading={false} />);

  const cards = screen.getAllByRole("article");
  const lastTitle = cards[2].querySelector("h3");

  expect(cards).toHaveLength(3);
  expect(lastTitle).toHaveTextContent("Ingénieur DevOps");
});

test("it renders no Job Cards when data prop is undefined", () => {
  const testData = undefined;

  const { container } = render(
    <SearchResults data={testData} count={10} isLoading={false} />,
  );

  expect(container.firstChild).toBeNull();
});
