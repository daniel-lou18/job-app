import { render, screen, waitFor, within } from "@testing-library/react";
import Search from "..";
import { getJobs } from "@/services/jobService";
import data from "@/utils/data.json";
import { PAGE_SIZE } from "@/utils/constants";

// Mock the jobService function, which fetches the data from the API
jest.mock("../../../services/jobService");

// Tell TS explicitly what the type is of the mocked function, in this case a function that returns a promise
const mockedGetJobs = getJobs as jest.MockedFunction<typeof getJobs>;

beforeEach(() => jest.clearAllMocks());

test("it shows the skeleton cards on loading state and displays 3 job cards when the data fetching is completed", async () => {
  // Since the jobService function is asynchronous and returns a promise we use the mockResolvedValue method
  mockedGetJobs.mockResolvedValue(data.slice(0, 3));

  render(<Search />);

  const sections = screen.getAllByRole("region");
  const searchContainer = sections[2];

  // Check if skeleton cards are displayed on loading state
  const skeletonCards = within(searchContainer).getAllByRole("article");
  expect(skeletonCards).toHaveLength(PAGE_SIZE);
  expect(skeletonCards[0].querySelector("h3")).toBeNull();
  expect(screen.queryAllByRole("paragraph")).toHaveLength(0);

  // Wait for data fetching to be completed
  await waitFor(() => {
    const lastSalary = screen.getByText(data[2].salary);
    expect(lastSalary).toBeInTheDocument();
  });

  await waitFor(() => {
    // For complete coverage
    const cardsLoadingCompleted =
      within(searchContainer).queryAllByRole("article");
    expect(cardsLoadingCompleted).toHaveLength(3);
    expect(cardsLoadingCompleted[0].querySelector("h3")).toHaveTextContent(
      data[0].jobTitle,
    );
  });

  // Check if job cards are displayed when fetching is completed
  const jobCards = await within(searchContainer).findAllByRole("article");
  const headings = await within(searchContainer).findAllByRole("heading");

  expect(jobCards).toHaveLength(3);
  expect(headings[headings.length - 1]).toHaveTextContent(data[2].jobTitle);
});

test("it shows an error message if fetching fails", async () => {
  mockedGetJobs.mockRejectedValue(new Error("Mocked error message"));

  render(<Search />);

  const errorElement = await screen.findByText("Mocked error message");

  expect(errorElement).toBeInTheDocument();
});

test("it shows no job cards when data is an empty array", async () => {
  mockedGetJobs.mockResolvedValue([]);

  render(<Search />);

  await waitFor(() => {
    const cards = screen.queryAllByRole("article");
    expect(cards).toHaveLength(0);
  });
});
