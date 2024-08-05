import { render, screen } from "@testing-library/react";
import SearchResults from "../SearchResults";
import data from "@/utils/data.json";
import { Job } from "@/types";
import { PAGE_SIZE } from "@/utils/constants";

// helper function to render the component with the appropriate props
function renderSearchResults(data: Job[], count = 10, isLoading = false) {
  return render(
    <SearchResults data={data} count={count} isLoading={isLoading} />,
  );
}

test("it shows 3 Job Cards", () => {
  const testData = data.slice(0, 3);

  renderSearchResults(testData);

  const cards = screen.getAllByRole("article");
  const lastTitle = cards[cards.length - 1].querySelector("h3");

  expect(cards).toHaveLength(3);
  expect(lastTitle).toHaveTextContent(testData[2].jobTitle);
});

test("it shows 50 Job Cards", () => {
  const testData = data.slice(0, 50);

  renderSearchResults(testData);

  const cards = screen.getAllByRole("article");

  const lastTitle = cards[cards.length - 1].querySelector("h3");

  expect(cards).toHaveLength(50);
  expect(lastTitle).toHaveTextContent(testData[49].jobTitle);
});

test("it shows an appropriate message when data prop is an empty array (no search results) and isLoading prop is false", () => {
  const testData = [] as Job[];

  // The container is the wrapper component in which the tested component is rendered
  renderSearchResults(testData);

  const message = screen.getByRole("paragraph");

  expect(message).toHaveTextContent(
    "Aucun résultat ne correspond à votre recherche",
  );
});

test("it shows Skeleton Cards when data prop is an empty array and isLoading prop is true. The number of skeletons is equal to the PAGE_SIZE ", () => {
  const testData = [] as Job[];

  renderSearchResults(testData, undefined, true);

  const skeletons = screen.getAllByRole("article");

  expect(skeletons).toHaveLength(PAGE_SIZE);
  expect(skeletons[0].children).toHaveLength(2);
  expect(skeletons[0].firstChild?.firstChild).toBeEmptyDOMElement();
});
