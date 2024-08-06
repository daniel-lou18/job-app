import { NextResponse } from "next/server";
import { Request } from "undici";
import data from "@/utils/data.json";

export async function GET(req: Request) {
  return NextResponse.json(data, { status: 200 });
}
