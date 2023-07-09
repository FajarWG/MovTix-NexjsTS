import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const useTicket = (id: string) => {
  const data = fetcher(`/api/ticket/${id}`);
  return data;
};

export default useTicket;
