import { http, HttpResponse } from "msw";
import testData from "@/utils/data.json";

export const handlers = [
  http.get("http://localhost:3000/api/jobs", () => {
    return HttpResponse.json({ data: testData.slice(0, 3) });
  }),
];
