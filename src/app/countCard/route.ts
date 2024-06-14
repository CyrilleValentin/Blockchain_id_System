import { Count, countContract } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const cards= await request.json();
    const countResult = await countContract();
    return NextResponse.json(countResult);
  }