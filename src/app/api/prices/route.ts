import { NextResponse } from "next/server";
import { stations } from "@/data/stations";
import { metroSnapshot } from "@/data/snapshot";
import { brandOverview } from "@/data/brands";

export async function GET() {
  return NextResponse.json({
    snapshot: metroSnapshot,
    stations,
    brands: brandOverview,
    meta: {
      source: "presyogas-ph-demo",
      generatedAt: new Date().toISOString(),
    },
  });
}
