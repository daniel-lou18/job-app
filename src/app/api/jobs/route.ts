import { NextRequest, NextResponse } from "next/server";
import data from "@/utils/data.json";
import { filterJobs } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");
  const result = query ? filterJobs(data, query) : data;
  return NextResponse.json(result, { status: 200 });
}
