import { Count } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { roleU } = await request.json();
  const countResult = await Count(roleU);
  return NextResponse.json(countResult);
}
