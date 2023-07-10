import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrents";

export async function POST(req: Request) {
  const body = await req.json();
  const { id, seats, time, seatName, totalSeat } = body;

  const currentUser = (await getCurrentUser()) as any;

  if (!currentUser) {
    return NextResponse.error();
  }

  if (totalSeat == 0) {
    return NextResponse.json(
      {
        error: "You must choose at least one seat",
      },
      {
        status: 400,
      }
    );
  }

  const movie = await prisma.movies.findUnique({
    where: {
      id,
    },
  });

  const idShow = await prisma.showtimes.findFirst({
    where: {
      movie_id: id,
      time,
    },
  });

  const total_price: number = (movie ? movie?.ticket_price : 0) * totalSeat;

  if ((movie?.age_rating as number) > currentUser.age) {
    return NextResponse.json(
      {
        error: "You are not old enough to watch this movie",
      },
      {
        status: 400,
      }
    );
  }

  if (currentUser.balance < total_price) {
    return NextResponse.json(
      {
        error: "Your balance is not enough",
      },
      {
        status: 400,
      }
    );
  }

  // Update seats in showtime
  await prisma.showtimes.update({
    where: {
      id: idShow?.id,
    },
    data: {
      seats,
    },
  });

  // Create transaction
  const createTransaction = await prisma.transaction.create({
    data: {
      user_id: currentUser.id,
      movie_id: id,
      showtime_id: idShow?.id as unknown as string,
      total_price,
      bookinng_seats: seatName,
      status: "Success",
    },
  });

  // Decrease user balance
  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      balance: currentUser.balance - total_price,
    },
  });

  // Create ticket for user
  await prisma.ticket.create({
    data: {
      user_id: currentUser.id,
      movie_id: id,
      showtime_id: idShow?.id as unknown as string,
      transaction_id: createTransaction.id,
      seat: seatName,
    },
  });

  return NextResponse.json(createTransaction);
}
