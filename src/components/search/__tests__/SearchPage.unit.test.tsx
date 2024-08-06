import { PAGE_SIZE } from "@/utils/constants";
import testData from "@/utils/data.json";
import { render, screen } from "@testing-library/react";
import { useJobs } from "@/hooks/useJobs";

// Mock the useJobs hook and provide return values in order for the Search component to be tested correctly and realistically
jest.mock("../../../hooks/useJobs");
const mockReturnValue = {
  isLoading: false,
  error: "",
  query: "",
  handleQuery: jest.fn(),
  page: 1,
  jobs: [],
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

test("it shows a page title, an input field and 3 job cards", async () => {
  mockedUseJobs.mockReturnValue({
    ...mockReturnValue,
    jobs: testData.slice(0, 3),
    filteredJobs: testData.slice(0, 3),
    paginatedJobs: testData.slice(0, 3),
  });

  await renderSearch();

  const titles = await screen.findAllByRole("heading");
  const inputField = await screen.findByRole("textbox", { name: /search/i });
  const jobCards = await screen.findAllByRole("article");

  expect(titles[0]).toHaveTextContent("Trouver un job dans la tech");
  expect(inputField).toHaveValue("");
  expect(jobCards).toHaveLength(3);
});

test("it shows a page title, an input field and 50 job cards", async () => {
  mockedUseJobs.mockReturnValue({
    ...mockReturnValue,
    jobs: testData.slice(0, 50),
    filteredJobs: testData.slice(0, 50),
    paginatedJobs: testData.slice(0, 50),
  });

  await renderSearch();

  const titles = await screen.findAllByRole("heading");
  const inputField = await screen.findByRole("textbox", { name: /search/i });
  const jobCards = await screen.findAllByRole("article");

  expect(titles[0]).toHaveTextContent("Trouver un job dans la tech");
  expect(inputField).toHaveValue("");
  expect(jobCards).toHaveLength(50);
});

test("it shows skeleton cards on loading state. The amount of skeleton cards is equal to PAGE_SIZE", async () => {
  mockedUseJobs.mockReturnValue({
    ...mockReturnValue,
    isLoading: true,
  });

  await renderSearch();

  const skeletonCards = await screen.findAllByRole("article");

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
