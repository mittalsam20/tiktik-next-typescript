import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

import axios from "axios";
import { Video } from "@/types";
import { BASE_URL } from "@/utils";

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [videoStates, setVideoStates] = useState({
    playing: false,
    isMuted: false,
  });
  const { playing, isMuted } = videoStates;
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    _id: postId,
    caption,
    comments,
    likes,
    postedBy,
    userId,
    video: {
      asset: { _id: videoId, url },
    },
  } = post;

  const onClickVideo = ({}) => {
    if (playing) {
      videoRef?.current?.pause();
      setVideoStates((prev) => ({ ...prev, playing: false }));
      return;
    }
    videoRef?.current?.play();
    setVideoStates((prev) => ({ ...prev, playing: true }));
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [post, isMuted]);

  if (!post) return null;
  return (
    <div
      className={
        "flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap"
      }
    >
      <div
        className={
          "relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center"
        }
      >
        <div className={"absolute top-6 left-2 lg:left-6 flex gap-6 z-50"}>
          <p>
            <MdOutlineCancel className={"text-white text-[35px]"} />
          </p>
        </div>
        <div className={"relative"}>
          <div className={"lg:h-[100vh] h-[60vh]"}>
            <video
              loop
              src={url}
              ref={videoRef}
              onClick={onClickVideo}
              className={"cursor-pointer h-full"}
            ></video>
          </div>
          <div className={"absolute top-[45%] left-[45%] cursor-pointer"}>
            {!playing && (
              <button onClick={onClickVideo}>
                <BsFillPlayFill className={"text-white text-6xl lg:text-8xl"} />
              </button>
            )}
          </div>
        </div>
        <div
          className={
            "absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer"
          }
        >
          {isMuted ? (
            <button
              onClick={() =>
                setVideoStates((prev) => ({ ...prev, isMuted: false }))
              }
            >
              <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button
              onClick={() =>
                setVideoStates((prev) => ({ ...prev, isMuted: true }))
              }
            >
              <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
            </button>
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
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);
  return { props: { postDetails: data } };
};

export default Detail;
