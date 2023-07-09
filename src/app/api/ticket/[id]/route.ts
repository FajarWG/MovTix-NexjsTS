import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: any }) {
  const id = req.url?.split("/")[5];

  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
      },
      include: {
        movie: true,
        transaction: true,
        showtime: true,
      },
    });

    if (!ticket) {
      return NextResponse.json({ message: "Ticket not found" });
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
