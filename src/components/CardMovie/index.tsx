"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../Button";

interface CardMovieProps {
  id: string;
  title: string;
  desc: string;
  price: number;
  imgUrl: string;
  age: number;
  show: boolean;
  releaseDate: string;
}

const CardMovie = ({
  id,
  title,
  desc,
  price,
  imgUrl,
  age,
  show,
  releaseDate,
}: CardMovieProps) => {
  const router = useRouter();

  return (
    <div className="p-2 max-w-md">
      <div className="bg-white shadow-lg border-gray-100 max-h-80 border rounded-3xl p-8 flex space-x-8">
        <div className="h-42 overflow-visible w-1/2">
          <Image
            className="rounded-3xl shadow-lg"
            src={imgUrl}
            alt={title}
            width={160}
            height={220}
          />
        </div>
        <div className="flex flex-col w-1/2 space-y-5">
          <div className="flex justify-between items-start">
            <h2 className="text-sm font-bold text-black">{title}</h2>
            <div className="bg-red-400 font-semibold rounded-xl p-1">
              <p className="text-white text-xs">{age}+</p>
            </div>
          </div>
          {show ? (
            <>
              <div className="text-sm text-gray-400">
                {desc.slice(0, 100)}...
              </div>
              <div className="flex text-sm font-bold text-a text-green-500">
                Rp.{price}
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="text-sm text-gray-400">Time</div>
                <Button text="15:00" size={"xs"} style={"time"} />
                <Button text="17:00" size={"xs"} style={"time"} />
                <Button text="19:00" size={"xs"} style={"time"} />
              </div>
              <div className="flex text-sm font-bold text-a text-green-500">
                Rp.{price}
              </div>
              <Button
                text="Buy Ticket"
                size={"md"}
                style={"primary"}
                onClick={() => router.push(`/movies/${id}`)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardMovie;
