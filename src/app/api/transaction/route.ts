import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrents";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const user = (await getCurrentUser()) as any;

  try {
    const transaction = await prisma.transaction.findMany({
      where: {
        user_id: user?.id,
      },
      include: {
        movie: true,
        showtime: true,
        Ticket: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(transaction);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}