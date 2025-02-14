import { NextResponse } from "next/server";
import data from "./data.json";

export function GET() {
  return NextResponse.json(data);
}
