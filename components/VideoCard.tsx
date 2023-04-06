import React, { useState, useEffect, useRef } from "react";

import Link from "next/link";
import { NextPage } from "next";
import Image from "next/legacy/image";

import { GoVerified } from "react-icons/go";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

import { Video } from "@/types";

interface Iprops {
  post: Video;
}

const VideoCard: NextPage<Iprops> = ({ post }) => {
  const {
    _id,
    caption,
    video,
    postedBy: { userName, image: userImage },
    likes,
    comments,
    userId,
  } = post;

  const [isHover, setIsHover] = useState(false);
  const [videoStates, setVideoStates] = useState({
    playing: false,
    isMuted: false,
  });
  const { playing, isMuted } = videoStates;
  const videoRef = useRef<HTMLVideoElement>(null);

  const onClickPlayPause = () => {
    if (playing) {
      videoRef?.current?.pause();
      setVideoStates((prev) => ({ ...prev, playing: false }));
      return;
    }
    videoRef?.current?.play();
    setVideoStates((prev) => ({ ...prev, playing: true }));
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className={"flex flex-col border-b-2 border-gray-200 pb-6"}>
      <div>
        <div
          className={
            "flex gap-3 p-2 xl:pb-0 cursor-pointer font-semibold rounded"
          }
        >
          <div className={"md:w-16 md:h-16 w-10 h-10"}>
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  alt={"profile photo"}
                  className={"rounded-full"}
                  src={userImage}
                  layout={"responsive"}
                />
              </>
            </Link>
          </div>
          <div className={"flex flex-col"}>
            <Link href={`/profile/${post.postedBy._id}`}>
              <p
                className={
                  "flex gap-2 items-center md:text-md font-bold text-primary"
                }
              >
                {userName} {` `}
                <GoVerified className={"text-blue-400 text-md"} />
              </p>
            </Link>
            <p
              className={
                "capitalize font-medium text-xs text-gray-500 hidden md:block"
              }
            >
              {userName}
            </p>
          </div>
        </div>
      </div>
      <div className={"lg:ml-20 ml-5 flex gap-4 relative"}>
        <div
          className={"rounded-3xl"}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              className={
                "lg:w-[650px] h-[300px] md:h-[400px] lg:h-[528px] w-[400px] rounded-2xl cursor-pointer bg-gray-100"
              }
              loop
              ref={videoRef}
              src={video.asset.url}
            ></video>
          </Link>

          {isHover && (
            <div
              className={
                "absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3"
              }
            >
              {playing ? (
                <button>
                  <BsFillPauseFill
                    onClick={onClickPlayPause}
                    className="text-black text-2xl lg:text-4xl"
                  />
                </button>
              ) : (
                <button>
                  <BsFillPlayFill
                    onClick={onClickPlayPause}
                    className="text-black text-2xl lg:text-4xl"
                  />
                </button>
              )}
              {isMuted ? (
                <button
                  onClick={() =>
                    setVideoStates((prev) => ({ ...prev, isMuted: false }))
                  }
                >
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button
                  onClick={() =>
                    setVideoStates((prev) => ({ ...prev, isMuted: true }))
                  }
                >
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
