/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Ticket from "@/components/Ticket";
import useTicket from "@/hooks/useTicket";
import { FaTicketAlt } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { BiSolidUserCircle } from "react-icons/bi";

import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import axios from "axios";

interface TransactionProps {
  transaction: Transaction;
  handleCancel: ({
    idTransaction,
    idShowtime,
    idTicket,
    seats,
    time,
  }: CancelTransaction) => void;
}

interface Transaction {
  id: string;
  user_id: string;
  movie_id: string;
  showtime_id: string;
  Ticket: Ticket;
  date: string;
  total_price: number;
  bookinng_seats: string[];
  status: string;
  movie: Movie;
  showtime: Showtime;
  user: User;
}

interface Ticket {
  [key: string]: {
    id: string;
    booking_code: string;
    movie_id: string;
    showtime_id: string;
    date: string;
    seat: string[];
    movie: Movie;
    transaction: Transaction;
    showtime: Showtime;
  };
}

interface Movie {
  title: string;
  poster_url: string;
}

interface Showtime {
  time: string;
}

interface User {
  name: string;
}

interface CancelTransaction {
  idTransaction: string;
  idShowtime: string;
  idTicket: string;
  seats: string[];
  time: string;
}

interface Tickets {
  id: string;
  booking_code: string;
  movie_id: string;
  showtime_id: string;
  date: string;
  seat: string[];
  movie: {
    title: string;
    ticket_price: number;
  };
  transaction: {
    date: string;
    total_price: number;
  };
  showtime: {
    time: string;
  };
}

const CardTransaction = ({ transaction, handleCancel }: TransactionProps) => {
  const [data, setData] = useState<Transaction>(transaction);
  const [opened, { open, close }] = useDisclosure(false);
  const [ticket, setTicket] = useState<Tickets>({
    id: "",
    booking_code: "",
    movie_id: "",
    showtime_id: "",
    date: "",
    seat: [],
    movie: {
      title: "",
      ticket_price: 0,
    },
    transaction: {
      date: "",
      total_price: 0,
    },
    showtime: {
      time: "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTicket = async () => {
    try {
      setIsLoading(true);
      // const res = await useTicket(data.Ticket[0].id);
      const res = await axios.get(`/api/ticket/${data.Ticket[0].id}`);
      setTicket(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    handleCancel({
      idTransaction: data.id,
      idShowtime: data.showtime_id,
      idTicket: data.Ticket[0].id,
      seats: data.bookinng_seats,
      time: data.showtime?.time,
    });

    setData((prev) => ({
      ...prev,
      status: "Cancel",
    }));
  };

  useEffect(() => {
    if (data.status == "Success") getTicket();
  }, []);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size="auto"
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        centered
      >
        <Ticket ticket={ticket} />
      </Modal>
      <div className="p-2 max-w-md max-h-80">
        <div className="bg-white shadow-lg border-gray-100 max-h-80 border rounded-3xl p-8 flex space-x-16">
          <div className=" h-40 overflow-visible ">
            <Image
              className="rounded-3xl shadow-lg"
              src={data.movie.poster_url}
              alt={data.movie.title}
              width={120}
              height={220}
            />
          </div>
          <div className="flex flex-col  w-1/2 space-y-2 -space-x-5">
            <div className="flex justify-between items-start">
              <h2 className="text-sm font-bold text-black -ml-5">
                {data.movie.title}
              </h2>
              <p
                className={
                  (data.status === "Success"
                    ? "text-green-400 "
                    : "text-red-400 ") + "font-bold rounded-xl text-xs"
                }
              >
                {data.status === "Success" ? "Success" : "Canceled"}
              </p>
            </div>
            <div className=" inline-flex items-center">
              <BiSolidUserCircle color="black" className="" />
              <p className="text-gray-500 ml-2 text-sm">{data.user.name}</p>
            </div>
            <div className=" inline-flex items-center">
              <FaTicketAlt color="black" className="" />
              <p className="text-gray-500 ml-2 text-sm">
                Tickets ({data.bookinng_seats.length})
              </p>
            </div>
            <div className=" inline-flex items-center">
              <AiFillDollarCircle color="black" className="" />
              <p className="text-gray-500 ml-2 text-sm">
                Rp. {data.total_price}
              </p>
            </div>
            <span className="text-gray-500 ml-2 text-sm ">
              {new Date(data.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              , {data.showtime.time.slice(0, -3)}
            </span>
            <div className="flex justify-between items-start">
              <Button
                text="Cancel Transaction"
                size={"xs"}
                style={"cancel"}
                disable={
                  new Date(data.date).toLocaleDateString() !=
                    new Date().toLocaleDateString() || data.status != "Success"
                }
                onClick={handleClick}
              />
              <Button
                text="Check Ticket"
                size={"xs"}
                style={"primary"}
                disable={data.status != "Success" || isLoading}
                onClick={open}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTransaction;
