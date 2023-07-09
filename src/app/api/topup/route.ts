import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrents";

export async function POST(req: Request) {
  const body = await req.json();
  const { value } = body;

  const currentUser = (await getCurrentUser()) as any;

  if (!currentUser) {
    return NextResponse.error();
  }

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      balance: {
        increment: parseInt(value),
      },
    },
  });

  return NextResponse.json(user.balance);
}
