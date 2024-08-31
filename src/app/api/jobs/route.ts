import { NextRequest, NextResponse } from "next/server";
import data from "../../../../public/data/data.json";
import { filterJobs } from "@/utils/helpers";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");
  const result = query ? filterJobs(data, query) : data;
  return NextResponse.json(result, { status: 200 });
}
