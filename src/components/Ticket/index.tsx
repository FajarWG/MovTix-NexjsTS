import Image from "next/image";
import { useQRCode } from "next-qrcode";

interface TicketProps {
  ticket: {
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
  ticket_price: number;
}

interface Transaction {
  date: string;
  total_price: number;
}

interface Showtime {
  time: string;
}

const Ticket = ({ ticket }: TicketProps) => {
  const { showtime, movie, booking_code, date, transaction, seat } = ticket;

  const { Canvas } = useQRCode();

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="flex flex-col bg-gray-800 rounded-lg shadow-md p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-white mr-6">
            {movie.title}
          </h3>
          <Image
            src="/logo.svg"
            alt="TixMov logo"
            width={35}
            height={68}
            className=" bg-white rounded-lg p-1.5"
            priority
          />
        </div>
        <div className="flex flex-col justify-center items-center mb-4">
          <Canvas
            text={`${booking_code}`}
            options={{
              level: "M",
              margin: 3,
              scale: 4,
              width: 200,
            }}
          />
          <p className="text-gray-300 text-xs mt-1">{booking_code}</p>
          <p className="text-white text-sm font-bold mt-1">Scan QR Code</p>
          <span className="text-gray-300 text-xs mt-1 text-center">
            --------------------------
          </span>
        </div>

        <div className="flex rounded-lg p-1 justify-between text-xs">
          <p></p>
          <p>
            {new Date(transaction.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            {showtime.time}
          </p>
        </div>
        <div className="flex rounded-lg p-1 justify-between text-xs">
          <p>Tickets</p>
          <p>{seat.join(",")}</p>
        </div>
        <div className="flex rounded-lg p-1 justify-between text-xs">
          <p>Regular Seats</p>
          <p>
            Rp{movie.ticket_price} * {seat.length}
          </p>
        </div>
        <div className="flex rounded-lg p-1 justify-between text-sm">
          <p>Actual Payment</p>
          <p>Rp{transaction.total_price}</p>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
