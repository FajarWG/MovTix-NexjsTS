"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";

const Page = () => {
  const router = useRouter();
  const [amount, setAmount] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  const onClickHandler = async () => {
    if (!amount) return toast.error("Please input amount");
    setIsLoading(true);
    await axios.post("/api/withdraw", {
      value: amount,
    });
    router.refresh();
    toast.success("Withdraw success");
    setAmount(0);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {!isLoading ? (
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2 text-black">Withdraw</h2>
            <input
              className="w-full mb-2 mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              type="number"
              placeholder="Amount"
              onChange={(e: any) => setAmount(e.target.value)}
              disabled={isLoading}
            />
            <div className="flex">
              <button
                onClick={onClickHandler}
                disabled={isLoading}
                className="bg-gray-800 text-white rounded px-4 py-2 mr-2"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Page;
