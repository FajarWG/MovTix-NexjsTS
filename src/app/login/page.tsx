/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

import toast from "react-hot-toast";
import axios from "axios";

const Page = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    signIn("credentials", {
      username,
      password,
      redirect: false,
    })
      .then((res: any) => {
        if (res.error == "Username not found") {
          return toast.error("Username not found");
        }
        if (res.error == "Password is incorrect") {
          return toast.error("Password is incorrect");
        }

        toast.success("Login success");
        router.refresh();
        router.push("/");
        axios
          .get("/api/user")
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <form
        onSubmit={onSubmit}
        className="w-full space-y-6 text-gray-600 sm:max-w-md"
      >
        <div className="text-center">
          <Image
            src="/logo.svg"
            alt="TixMov logo"
            width={68}
            height={68}
            className="mx-auto"
            priority
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p className="">
              Don't have an account?
              <Link
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <div className="space-y-5">
            <div>
              <label className="font-medium">Username</label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                required
                disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
