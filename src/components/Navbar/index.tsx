"use client";

import React, { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

import Link from "next/link";
import NavHeader from "./NavHeader";
import { signOut } from "next-auth/react";

const Navbar = ({ currentUser }: any) => {
  const [state, setState] = useState(false);
  const menuBtnEl = useRef() as any;

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "Top Up", href: "/topup" },
    { name: "Withdraw", href: "/withdraw" },
    { name: "Transactions", href: "/transactions" },
  ];

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!menuBtnEl.current.contains(target)) setState(false);
    };
  }, []);

  return (
    <header className="relative p-3">
      <div className="custom-screen md:hidden">
        <NavHeader
          menuBtnEl={menuBtnEl}
          state={state}
          onClick={() => setState(!state)}
        />
      </div>
      <nav
        className={`bg-white p-4 md:text-sm md:static md:block ${
          state
            ? "absolute z-20 top-2 inset-x-4 shadow-lg rounded-xl border md:shadow-none md:border-none"
            : "hidden"
        }`}
      >
        <div className="custom-screen gap-x-14 items-center md:flex">
          <NavHeader state={state} onClick={() => setState(!state)} />
          <div
            className={`flex-1 items-center mt-8 text-gray-600 md:font-medium md:mt-0 md:flex ${
              state ? "block" : "hidden"
            } `}
          >
            <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((item, idx) => {
                return (
                  <li key={idx} className="hover:text-gray-900">
                    <Link href={item.href} className="block" scroll={false}>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
              {currentUser ? (
                <>
                  <div className="block hover:text-gray-900">
                    <p>Hi, {currentUser.name}</p>
                    Balance : Rp. {currentUser.balance}
                  </div>
                  <button
                    className="py-2.5 px-4 text-center rounded-full duration-150 flex items-center justify-center gap-x-1 text-sm text-white font-medium bg-gray-800 hover:bg-gray-600 active:bg-gray-900 md:inline-flex"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/register" className="block hover:text-gray-900">
                    Register
                  </Link>
                  <Link
                    href="/login"
                    className="py-2.5 px-4 text-center rounded-full duration-150 flex items-center justify-center gap-x-1 text-sm text-white font-medium bg-gray-800 hover:bg-gray-600 active:bg-gray-900 md:inline-flex"
                  >
                    Login
                    <MdKeyboardArrowRight />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
