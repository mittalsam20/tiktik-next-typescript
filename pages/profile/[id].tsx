import React, { useState, useEffect } from "react";

import Image from "next/legacy/image";
import { GoVerified } from "react-icons/go";
import { MdOutlineVideocamOff } from "react-icons/md";

import { BASE_URL } from "@/utils";
import { IUser, Video } from "@/types";
import NoResults from "@/components/NoResults";
import VideoCard from "@/components/VideoCard";

import axios from "axios";
interface IProps {
  data: {
    user: IUser;
    userLikedPosts: Video[];
    userCreatedPosts: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userLikedPosts, userCreatedPosts } = data;

  const [videosList, setVideosList] = useState<Video[]>([]);
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);

  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(userCreatedPosts);
      } else {
        setVideosList(userLikedPosts);
      }
    };

    fetchVideos();
  }, [showUserVideos, userCreatedPosts, userLikedPosts]);

  return (
    <div className={"w-full"}>
      <div className={"flex gap-6 md:gap-10 mb-4 bg-white w-full"}>
        <div className={"w-16 h-16 md:w-32 md:h-32"}>
          <Image
            width={120}
            height={120}
            layout={"responsive"}
            className={"rounded-full"}
            src={user.image}
            alt={"user-profile"}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col text-md md:text-2xl font-bold tracking-wider lowercase">
            <div className="flex items-center gap-2">
              {user.userName}
              <GoVerified className={"text-blue-400 md:text-xl text-md"} />
            </div>
            <p className={"text-sm font-medium"}> {user.userName}</p>
          </div>
          <div className="flex justify-between gap-14">
            <div className="flex flex-col items-center gap-2 text-xl font-medium">
              <span>{"Total Posts"}</span>
              <span>{userCreatedPosts.length}</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-xl font-medium">
              <span>{"Posts Liked"}</span>
              <span>{userLikedPosts.length}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={"flex flex-col flex-1 h-full"}>
        <div className="flex gap-10 mb-10 mt-5 border-b-2 border-gray-200 bg-white w-full">
          <p
            onClick={() => setShowUserVideos(true)}
            className={`text-xl font-semibold cursor-pointer ${videos} mt-2`}
          >
            {"Videos"}
          </p>
          <p
            onClick={() => setShowUserVideos(false)}
            className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
          >
            {"Liked"}
          </p>
        </div>
        <div className={"flex flex-1 gap-6 flex-wrap  h-full "}>
          {videosList.length > 0 ? (
            videosList.map((post: Video, index: number) => (
              <VideoCard key={index} post={post} showDetails={true} />
            ))
          ) : (
            <NoResults
              IconComponent={MdOutlineVideocamOff}
              text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`);
  return { props: { data } };
};

export default Profile;
