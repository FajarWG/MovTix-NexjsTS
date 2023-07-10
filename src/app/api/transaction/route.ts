import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const user = (await getServerSession(authOptions)) as any;

  try {
    const transaction = await prisma.transaction.findMany({
      where: {
        user_id: user?.user.id,
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
