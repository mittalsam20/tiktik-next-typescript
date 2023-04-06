import React, { useState } from "react";

import Link from "next/link";
import Image from "next/legacy/image";
import { useRouter } from "next/router";

import { GoVerified } from "react-icons/go";
import { FaUserAltSlash } from "react-icons/fa";
import { MdOutlineVideocamOff } from "react-icons/md";

import { BASE_URL } from "@/utils";
import { IUser, Video } from "@/types";
import useAuthStore from "@/store/authStore";
import NoResults from "@/components/NoResults";
import VideoCard from "@/components/VideoCard";

import axios from "axios";

interface IProps {
  videos: Video[];
}

const TabsComponent = ({
  accounts,
  isVideos,
  setIsAccounts,
}: {
  accounts: string;
  isVideos: string;
  setIsAccounts: (arg0: boolean) => void;
}) => {
  return (
    <div className="flex gap-10 border-b-2 border-gray-200 sticky z-50 bg-white h-[60px]">
      <p
        onClick={() => setIsAccounts(true)}
        className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}
      >
        {"Accounts"}
      </p>
      <p
        className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`}
        onClick={() => setIsAccounts(false)}
      >
        {"Videos"}
      </p>
    </div>
  );
};

const Search = ({ videos }: IProps) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const { allUsers }: { allUsers: IUser[] } = useAuthStore();

  const router = useRouter();
  const { searchTerm }: any = router.query;

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const searchedAccounts = allUsers?.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="flex flex-col flex-1 gap-6">
      <TabsComponent
        accounts={accounts}
        isVideos={isVideos}
        setIsAccounts={setIsAccounts}
      />
      <div className="flex flex-col flex-1 gap-20">
        {isAccounts ? (
          <div className={"flex flex-col h-full"}>
            {searchedAccounts.length > 0 ? (
              searchedAccounts.map((user: IUser, idx: number) => (
                <Link key={idx} href={`/profile/${user._id}`}>
                  <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                    <div>
                      <Image
                        width={50}
                        height={50}
                        src={user.image}
                        alt={"user-profile"}
                        className={"rounded-full"}
                      />
                    </div>
                    <div>
                      <div>
                        <p className="flex gap-1 items-center text-lg font-bold text-primary">
                          {user.userName}{" "}
                          <GoVerified className="text-blue-400" />
                        </p>
                        <p className={"capitalize text-gray-400 text-sm"}>
                          {user.userName}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <NoResults
                IconComponent={FaUserAltSlash}
                text={`No Account Results for ${searchTerm}`}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-1 h-full flex-wrap gap-6">
            {videos.length ? (
              videos.map((post: Video, idx: number) => (
                <VideoCard post={post} key={idx} showDetails={false} />
              ))
            ) : (
              <NoResults
                IconComponent={MdOutlineVideocamOff}
                text={`No Video Results for ${searchTerm}`}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return { props: { videos: data } };
};

export default Search;
