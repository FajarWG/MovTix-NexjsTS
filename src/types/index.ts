interface Transaction {
  id: string;
  user_id: string;
  movie_id: string;
  showtime_id: string;
  Ticket: any;
  date: string;
  total_price: number;
  bookinng_seats: string[];
  status: string;
  movie: Movie;
  showtime: Showtime;
  user: User;
}

interface Ticket {
  [key: number]: {
    id: string;
  };
}

interface TiketProps {
  id: string;
  booking_code: string;
  movie_id: string;
  showtime_id: string;
  date: string;
  seat: string[];
  movie: Movie;
  transaction: Transaction;
  showtime: Showtime;
}

interface Movie {
  id: String;
  age_rating: Number;
  description: String;
  id_: Number;
  poster_url: string;
  release_date: String;
  ticket_price: Number;
  title: string;
  status: String;
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

export type { Transaction, CancelTransaction, Ticket, Movie, Showtime, User };
