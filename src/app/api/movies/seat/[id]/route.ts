import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: any }) {
  const id = req.url?.split("/")[6];
  try {
    const showtimes = await prisma.showtimes.findMany({
      where: {
        movie_id: id,
      },
    });
    console.log(showtimes);
    return NextResponse.json(showtimes);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
