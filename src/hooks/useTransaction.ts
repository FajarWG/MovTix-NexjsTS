import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const useTransaction = () => {
  const { data, error } = useSWR("/api/transaction", fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useTransaction;
