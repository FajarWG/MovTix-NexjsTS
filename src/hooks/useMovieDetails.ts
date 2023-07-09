import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const useMovie = (id: string) => {
  const { data, error } = useSWR(id ? `/api/movies/${id}` : null, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useMovie;
