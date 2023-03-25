import React from "react";

import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { GoogleLogin, googleLogout } from "@react-oauth/google";

import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/tiktik-logo.png";

import { createOrGetUser } from "@/utils";

const Navbar = () => {
  const user = false;
  return (
    <div
      className={
        "w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4"
      }
    >
      <Link href="/">
        <div className={"w-[100px] md:w-[130px]"}>
          <Image
            src={Logo}
            alt={"tiktik"}
            layout={"responsive"}
            className={"cursor-pointer"}
          />
        </div>
      </Link>
      <div>SEARCH</div>
      <div>
        {user ? (
          <div>{"Logged In"}</div>
        ) : (
          <GoogleLogin
            onError={() => {}}
            onSuccess={(response) => {
              createOrGetUser(response);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
