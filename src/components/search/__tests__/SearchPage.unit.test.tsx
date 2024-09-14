import { PAGE_SIZE } from "@/utils/constants";
import testData from "@/utils/data.json";
import { render, screen, within } from "@testing-library/react";
import { useJobs } from "@/hooks/useJobsServer";

// Mock the useJobs hook and provide return values in order for the Search component to be tested correctly and realistically
jest.mock("../../../hooks/useJobsServer");
const mockReturnValue = {
  isLoading: false,
  error: "",
  query: "",
  handleQuery: jest.fn(),
  page: 1,
  filteredJobs: [],
  paginatedJobs: [],
  handleLoadMore: jest.fn(),
};

// Tell TS explicitly what the type is of the mocked function
const mockedUseJobs = useJobs as jest.MockedFunction<typeof useJobs>;

beforeEach(() => jest.clearAllMocks());

async function renderSearch() {
  const { default: Search } = await import("../index");
  return render(<Search />);
}

async function testSuccessful(numberCards = 3) {
  test(`it shows a page title, an input field and ${numberCards} job cards`, async () => {
    mockedUseJobs.mockReturnValue({
      ...mockReturnValue,
      filteredJobs: testData.slice(0, numberCards),
      paginatedJobs: testData.slice(0, numberCards),
    });

    await renderSearch();

    const titles = await screen.findAllByRole("heading");
    const inputField = await screen.findByRole("textbox", { name: /search/i });
    const sections = await screen.findAllByRole("region");
    const jobCards = await within(sections[2]).findAllByRole("article");

    expect(titles[0]).toHaveTextContent("Trouver un job dans la tech");
    expect(inputField).toHaveValue("");
    expect(jobCards).toHaveLength(numberCards);
  });
}

testSuccessful(3);

testSuccessful(30);

test("it shows skeleton job cards on loading state. The amount of cards is equal to PAGE_SIZE", async () => {
  mockedUseJobs.mockReturnValue({
    ...mockReturnValue,
    isLoading: true,
  });

  await renderSearch();

  const sections = await screen.findAllByRole("region");
  const skeletonCards = await within(sections[2]).findAllByRole("article");

  expect(skeletonCards).toHaveLength(PAGE_SIZE);
});

test("it shows an error message on error state", async () => {
  mockedUseJobs.mockReturnValue({
    ...mockReturnValue,
    isLoading: false,
    error: "Could not fetch",
  });

  await renderSearch();

  const errorMessage = await screen.findByRole("paragraph");

  expect(errorMessage).toHaveTextContent("Could not fetch");
});

test("it shows no job cards when the fetched data is an empty array", async () => {
  mockedUseJobs.mockReturnValue({
    ...mockReturnValue,
    isLoading: false,
  });

  await renderSearch();

  const cards = screen.queryAllByRole("article");

  expect(cards).toHaveLength(0);
});
