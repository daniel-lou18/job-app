import { render, screen } from "@testing-library/react";
import JobCard from "../JobCard";

const jobData = {
  id: 1,
  companyName: "TechVision",
  jobTitle: "Développeur Full Stack",
  location: "Paris",
  salary: "45K à 60K €",
  tags: ["Full Stack", "JavaScript", "React", "Node.js", "CDI", "Remote"],
};

test("it shows one card with a companyName, a jobTitle, a location, a salary, and 5 tags", () => {
  render(<JobCard data={jobData} />);

  const card = screen.getByRole("article");
  const title = screen.getByRole("heading");
  const paragraphs = screen.getAllByRole("paragraph");

  expect(card).toBeInTheDocument();
  expect(title).toHaveTextContent("Développeur Full Stack");
  expect(paragraphs).toHaveLength(4);
  expect(paragraphs[0]).toHaveTextContent("TechVision");
  expect(paragraphs[1]).toHaveTextContent("Paris");
  expect(paragraphs[2]).toHaveTextContent("45K à 60K €");
  expect(paragraphs[3].textContent).toContain("Full Stack");
});
