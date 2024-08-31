import { NextRequest, NextResponse } from "next/server";
import { filterJobs } from "@/utils/helpers";
import axios from "@/services/axiosClient";
import { Job } from "@/types";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");
  try {
    const response = await axios.get<Job[]>(
      "https://daniel-lou18.github.io/job-app/public/data/data.json",
    );
    const result = query ? filterJobs(response.data, query) : response.data;
    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erreur inconnue" },
      { status: 500 },
    );
  }
}
