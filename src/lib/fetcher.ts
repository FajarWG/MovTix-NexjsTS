import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const fetcherPost = (url: string, data: any) =>
  axios.post(url, data).then((res) => res.data);

export { fetcher, fetcherPost };
