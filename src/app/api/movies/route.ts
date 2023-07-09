import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

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
