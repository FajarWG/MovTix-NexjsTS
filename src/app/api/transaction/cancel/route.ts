import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrents";

export async function POST(req: Request) {
  const body = await req.json();
  const { idTransaction, idShowtime, idTicket, seats, time } = body;

  const currentUser = (await getCurrentUser()) as any;

  if (!currentUser) {
    return NextResponse.error();
  }

  const cancelTransaction = await prisma.transaction.update({
    where: {
      id: idTransaction,
    },
    data: {
      status: "Cancel",
    },
    include: {
      showtime: true,
    },
  });

  await prisma.ticket.delete({
    where: {
      id: idTicket,
    },
  });

  const updateSeats: any = cancelTransaction.showtime.seats;
  seats.forEach((seat: any) => {
    updateSeats[seat] = false;
  });

  await prisma.showtimes.updateMany({
    where: {
      id: idShowtime,
      time: time,
    },
    data: {
      seats: updateSeats,
    },
  });

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      balance: currentUser.balance + cancelTransaction.total_price,
    },
  });

  return NextResponse.json(cancelTransaction);
}
