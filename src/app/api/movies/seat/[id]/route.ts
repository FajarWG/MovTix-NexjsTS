import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest, context: { params: any }) {
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
