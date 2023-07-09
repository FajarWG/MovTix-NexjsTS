/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import useTransaction from "@/hooks/useTransaction";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import CardTransaction from "@/components/CardTransaction";
import { CancelTransaction, Transaction } from "@/types/";
import Loading from "@/components/Loading";

const Page = () => {
  const router = useRouter();
  const { data, isLoading } = useTransaction();

  const handleCancel = async ({
    idTransaction,
    idShowtime,
    idTicket,
    seats,
    time,
  }: CancelTransaction) => {
    try {
      await axios.post("/api/transaction/cancel", {
        idTransaction,
        idShowtime,
        idTicket,
        seats,
        time,
      });

      toast.success("Transaction Canceled");
      router.refresh();
    } catch (error) {
      toast.error("Failed to cancel transaction");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold text-black">Transaction History</h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {!isLoading ? (
          data.map((item: Transaction) => (
            <CardTransaction
              transaction={item}
              key={item.id}
              handleCancel={() =>
                handleCancel({
                  idTransaction: item.id,
                  idShowtime: item.showtime_id,
                  idTicket: item.Ticket[0].id,
                  seats: item.bookinng_seats,
                  time: item.showtime?.time,
                })
              }
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Page;
