import CardMovie from "../CardMovie";
import Loading from "../Loading";

interface MovieListProps {
  data: any;
  show: boolean;
}

const MovieList = ({ data, show }: MovieListProps) => {
  const { movies, isLoading } = data;

  return (
    <div className="flex flex-wrap justify-center ">
      {!isLoading ? (
        movies.map((movie: any) => (
          <CardMovie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            desc={movie.description}
            imgUrl={movie.poster_url}
            age={movie.age_rating}
            price={movie.ticket_price}
            releaseDate={movie.release_date}
            show={show}
          />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MovieList;
