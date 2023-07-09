import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const useMovieList = (play: boolean) => {
  const { data, error, isLoading } = useSWR(
    play ? "/api/movies/playing" : "/api/movies",
    fetcher
  );

  return {
    movies: data,
    isLoading,
    isError: error,
  };
};

export default useMovieList;
