import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import testData from "@/utils/data.json";

export function createServer() {
  const handlers = [
    http.get("/data/data.json", () => HttpResponse.json(testData.slice(0, 3))),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());
}
