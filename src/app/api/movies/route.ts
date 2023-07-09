import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const movies = await prisma.movies.findMany({
      orderBy: {
        release_date: "desc",
      },
    });

    return NextResponse.json(movies);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
