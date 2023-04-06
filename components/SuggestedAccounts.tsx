import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { GoVerified } from "react-icons/go";
import useAuthStore from "@/store/authStore";
import { IUser } from "@/types";

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="lg:border-p-2 border-gray-200 pb-4">
      <p className={"text-gray-500 font-semibold m-3 mt-4 hidden xl:block"}>
        {"Suggested Accounts"}
      </p>
      <div className="flex flex-col items-center xl:block">
        {allUsers.slice(0, 6).map((user) => {
          const { _id, image, userName } = user;
          return (
            <Link key={_id} href={`/profile/${_id}`}>
              <div
                className={
                  "flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded "
                }
              >
                <div className="w-8 h-8">
                  <Image
                    src={image}
                    width={34}
                    height={34}
                    alt={"userProfile"}
                    layout={"responsive"}
                    className={"rounded-full"}
                  />
                </div>
                <div className="hidden xl:block">
                  <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                    {userName} <GoVerified className="text-blue-400" />
                  </p>
                  <p className="capitalize text-gray-400 text-xs">{userName}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
