import React, { useState, useEffect } from "react";

import Image from "next/legacy/image";
import { GoVerified } from "react-icons/go";

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

        <div>
          <div className="text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase">
            <span>{user.userName} </span>
            <GoVerified className={"text-blue-400 md:text-xl text-md"} />
          </div>
          <p className={"text-sm font-medium"}> {user.userName}</p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
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
        <div className={"flex gap-6 flex-wrap md:justify-start"}>
          {videosList.length > 0 ? (
            videosList.map((post: Video, index: number) => (
              <VideoCard key={index} post={post} />
            ))
          ) : (
            <NoResults
              IconComponent={GoVerified}
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
