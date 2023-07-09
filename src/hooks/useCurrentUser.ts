import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const useCurrentUser = () => {
  const { data, error } = useSWR("/api/user", fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useCurrentUser;
