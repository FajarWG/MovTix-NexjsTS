import prisma from "@/lib/prismadb";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, context: { params: any }) {
  const id = req.url?.split("/")[5];

  try {
    const movie = await prisma.movies.findUnique({
      where: {
        id,
      },
    });

    if (!movie) {
      return NextResponse.json({ message: "Movie not found" });
    }

    return NextResponse.json(movie);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
