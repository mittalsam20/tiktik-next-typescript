import React, { useState, useEffect } from "react";

import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { GoogleLogin, googleLogout } from "@react-oauth/google";

import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/tiktik-logo.png";

import { IUser } from "@/types";
import { createOrGetUser } from "@/utils";
import useAuthStore from "@/store/authStore";

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchText) {
      router.push(`/search/${searchText}`);
    }
  };

  useEffect(() => {
    if (router.query.searchTerm == undefined) setSearchText("");
  }, [router, router.route]);

  return (
    <div
      className={
        "w-full flex justify-between  items-center border-b-2 border-gray-200 py-2 px-4 sticky"
      }
    >
      <div
        className={"w-[100px] md:w-[130px]"}
        onClick={() => router.push("/")}
      >
        <Image
          src={Logo}
          alt={"typeTik"}
          layout={"responsive"}
          className={"cursor-pointer"}
        />
      </div>
      <div className={"relative hidden md:block"}>
        <form
          onSubmit={handleSearch}
          className={"absolute md:static top-10 -left-20 bg-white"}
        >
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0"
            placeholder={"Search accounts and videos"}
          />
          <button
            onClick={handleSearch}
            className={
              "absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
            }
          >
            <BiSearch />
          </button>
        </form>
      </div>

      {user ? (
        <div className={"flex gap-5 md:gap-10"}>
          <button
            onClick={() => router.push("/upload")}
            className={
              "border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2 rounded-lg"
            }
          >
            <IoMdAdd className={"text-xl"} />
            <span className={"hidden md:block"}>{"Upload"}</span>
          </button>
          {user?.image && (
            <Image
              width={41}
              height={41}
              alt={"profile photo"}
              className={"rounded-full cursor-pointer"}
              src={user?.image}
              onClick={() => router.push(`/profile/${user._id}`)}
            />
          )}
          <button
            type={"button"}
            className={
              "border-2 p-2 rounded-full cursor-pointer outline-none shadow-md"
            }
            onClick={() => {
              googleLogout();
              removeUser();
            }}
          >
            <AiOutlineLogout color={"red"} fontSize={21} />
          </button>
        </div>
      ) : (
        <GoogleLogin
          onError={() => {}}
          onSuccess={(response) => {
            createOrGetUser(response, addUser);
          }}
        />
      )}
    </div>
  );
};

export default Navbar;
