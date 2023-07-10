"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import useMovie from "@/hooks/useMovieDetails";
import Button from "@/components/Button";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import Loading from "@/components/Loading";

type Seat = {
  [key: string]: boolean;
};

interface Movie {
  id: string;
  movie_id: string;
  seats: Seat;
  time: string;
}

const MovieDetails = ({ params }: any) => {
  const router = useParams();
  const route = useRouter();
  const { id } = router;
  const { data } = useMovie(id);

  const [seats, setSeats] = useState<Seat>({
    A1: false,
    A2: false,
    A3: false,
    A4: false,
    A5: false,
    A6: false,
    A7: false,
    A8: false,
    B1: false,
    B2: false,
    B3: false,
    B4: false,
    B5: false,
    B6: false,
    B7: false,
    B8: false,
    C1: false,
    C2: false,
    C3: false,
    C4: false,
    C5: false,
    C6: false,
    C7: false,
    C8: false,
    D1: false,
    D2: false,
    D3: false,
    D4: false,
    D5: false,
    D6: false,
    D7: false,
    D8: false,
    E1: false,
    E2: false,
    E3: false,
    E4: false,
    E5: false,

    E6: false,
    E7: false,
    E8: false,
    F1: false,
    F2: false,
    F3: false,
    F4: false,
    F5: false,
    F6: false,
    F7: false,

    F8: false,
    G1: false,
    G2: false,
    G3: false,
    G4: false,
    G5: false,
    G6: false,
    G7: false,
    G8: false,
    H1: false,
    H2: false,
    H3: false,
    H4: false,
    H5: false,
    H6: false,
    H7: false,
    H8: false,
  });
  const [tempSeats, setTempSeats] = useState<Seat>({});

  const [showTime, setShowTime] = useState<[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat>({});
  const [selectedTime, setSelectedTime] = useState<string>("15:00 PM");
  const [maxSeat, setMaxSeat] = useState<boolean>(false);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSeatClick = (seat: string) => {
    if (tempSeats[seat]) {
      toast.error("Seat is already taken");
      return;
    }

    if (Object.keys(selectedSeats).length >= 6) {
      toast.error("You can only choose 6 seats");
      setMaxSeat(true);
      return;
    }

    setSeats((prev) => ({ ...prev, [seat]: !prev[seat] }));
    if (seats[seat]) {
      setSelectedSeats((prev) => {
        const { [seat]: _, ...rest } = prev;
        return rest;
      });
    } else {
      setSelectedSeats((prev) => ({ ...prev, [seat]: true }));
    }
  };

  const handleClearSeat = () => {
    setMaxSeat(false);
    setSeats((prev) =>
      Object.keys(prev).reduce((acc, seat) => {
        return { ...acc, [seat]: false };
      }, {})
    );
    setSelectedSeats({});
  };

  const onTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBuyTicket = async () => {
    const data = {
      id,
      seats,
      time: selectedTime,
      seatName: Object.keys(selectedSeats),
      totalSeat: Object.keys(selectedSeats).length,
    };

    try {
      setIsLoading(true);
      await axios.post(`/api/order`, data).then((res) => {
        toast.success("Success Buy Ticket");
        route.refresh();
      });
      setSelectedSeats({});
      setSelectedTime("15:00 PM");
    } catch (err: any) {
      toast.error(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTotalCost(
      Object.keys(selectedSeats).reduce((acc, seat) => {
        return acc + (selectedSeats[seat] ? data?.ticket_price : 0);
      }, 0)
    );
  }, [data?.ticket_price, selectedSeats]);

  useEffect(() => {
    const seats = axios.get(`/api/movies/seat/${id}`);
    seats.then((res) => {
      setShowTime(res.data);
      setSeats(res.data[0].seats);
      setTempSeats(res.data[0].seats);
    });
  }, [id]);

  useEffect(() => {
    const time = showTime.find(
      (movie: Movie) => movie.time === selectedTime
    ) as unknown as Movie;
    if (time) {
      setSeats(time.seats);
      setTempSeats(time.seats);
      setSelectedSeats({});
    }
  }, [selectedTime, showTime]);

  return (
    <div className="flex flex-col md:flex-row px-3">
      {/* Left side */}
      <div className="flex flex-col md:w-1/2 p-4 md:border-r">
        <h2 className="text-2xl font-semibold mb-4 text-black text-center">
          Choose Your Seat
        </h2>
        {maxSeat && (
          <button
            onClick={handleClearSeat}
            className="p-1 mb-2 text-center rounded-full duration-150 flex items-center justify-center gap-x-1 text-sm text-white font-medium bg-red-400 hover:bg-gray-200 md:inline-flex"
          >
            Clear Seat
          </button>
        )}
        <div className="grid grid-cols-8 gap-2 justify-center">
          {Object.keys(seats).map((seat) => (
            <button
              key={seat}
              disabled={isLoading}
              className={`p-1 rounded-lg ${
                seats[seat]
                  ? "bg-gray-400 text-white cursor-pointer"
                  : "bg-gray-800 text-white hover:bg-red-500 hover:text-white cursor-pointer"
              }`}
              onClick={() => handleSeatClick(seat)}
            >
              <span>{seat}</span>
            </button>
          ))}
          <div className="col-span-8 flex justify-center mt-4">
            <div className="w-full bg-gray-800 text-white text-center rounded-lg">
              Screen Cinema Here
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col md:w-1/2 p-4">
        <div className="flex justify-center mb-4">
          <Image
            src={data?.poster_url}
            alt={data?.title}
            width={200}
            height={200}
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400">{data?.title}</h1>
          <p className="text-base font-semibold text-green-400">
            Rp.{data?.ticket_price} / seat
          </p>
        </div>
        <div className="text-center font-semibold text-black mr-2">
          <p className="text-base font-semibold text-black mr-2">
            {" "}
            Available Time :{" "}
          </p>
          <Button
            text="15:00"
            size={"sm"}
            style={"time"}
            onClick={() => onTimeSelect("15:00 PM")}
          />
          <Button
            text="17:00"
            size={"sm"}
            style={"time"}
            onClick={() => onTimeSelect("17:00 PM")}
          />
          <Button
            text="19:00"
            size={"sm"}
            style={"time"}
            onClick={() => onTimeSelect("19:00 PM")}
          />
        </div>
      </div>
      <div className="flex flex-col md:w-1/2 p-4">
        <div className="flex justify-center mb-4"></div>
        <div className="inline-flex">
          <button>
            <span className="text-base font-semibold text-black mr-2">
              {" "}
              Selected Time : {selectedTime}
            </span>
          </button>
        </div>
        <div className="inline-flex">
          <p className="text-base font-semibold text-black mr-2">
            {" "}
            Selected Seat :{" "}
          </p>
          {Object.keys(selectedSeats).map((seat) => (
            <div
              key={seat}
              className={`p-0.5 rounded-lg text-sm ${
                selectedSeats[seat]
                  ? "p-1 bg-gray-800 text-white cursor-pointer mr-1"
                  : "p-1 bg-gray-800 text-white cursor-pointer mr-1"
              }`}
            >
              <span>{seat}</span>
            </div>
          ))}
        </div>
        <div className="inline-flex">
          <p className="text-base font-semibold text-black mr-2">
            {" "}
            Total Cost : Rp.{totalCost}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <button
            onClick={handleBuyTicket}
            disabled={isLoading}
            className="py-2.5 px-4 text-center rounded-full duration-150 flex items-center justify-center gap-x-1 text-sm text-white font-medium bg-gray-800 hover:bg-gray-600 active:bg-gray-900 md:inline-flex"
          >
            {!isLoading ? "Buy Ticket" : "Loading..."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
