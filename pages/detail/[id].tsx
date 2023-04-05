import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import Link from "next/link";

import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

import axios from "axios";
import { Video } from "@/types";
import { BASE_URL } from "@/utils";
import useAuthStore from "@/store/authStore";
import LikeButton from "@/components/LikeButton";
import Comments from "@/components/Comments";
interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [videoStates, setVideoStates] = useState({
    playing: false,
    isMuted: false,
  });
  const { playing, isMuted } = videoStates;
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();
  const {
    _id: postId,
    caption,
    comments,
    likes,
    postedBy: { userName, image: userImage },
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

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: postId,
        like,
      });
      setPost((prevState) => ({ ...prevState, likes: data.likes }));
    }
  };

  const addComment = async (e: any) => {
    e.preventDefault();
    if (userProfile && comment) {
      setIsPostingComment(true);
      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });
      setPost((prevState) => ({ ...prevState, comments: data.comments }));
      setComment("");
      setIsPostingComment(false);
    }
  };

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
          <p className={"cursor-pointer"} onClick={() => router.back()}>
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
      <div className={"relative w-[1000px] md:w-[900px] lg:w-[700px]"}>
        <div className={"lg:mt-20 mt-10"}>
          <div
            className={"flex gap-3 p-2 cursor-pointer font-semibold rounded"}
          >
            <div className={"ml-4 md:w-20 md:h-20 w-16 h-16"}>
              <Link href={"/"}>
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
            <div className={""}>
              <div className={"flex flex-col mt-2 gap-2"}>
                <Link href={"/"}>
                  <p
                    className={
                      "flex gap-2 items-center md:text-md font-bold text-primary"
                    }
                  >
                    {userName} {` `}
                    <GoVerified className={"text-blue-400 text-md"} />
                  </p>
                  <p
                    className={
                      "capitalize font-medium text-xs text-gray-500 hidden md:block"
                    }
                  >
                    {userName}
                  </p>
                </Link>

                <div className="mt-10 px-10">
                  {userProfile && (
                    <LikeButton
                      likes={post.likes || []}
                      handleLike={() => handleLike(true)}
                      handleDislike={() => handleLike(false)}
                    />
                  )}
                  <Comments
                    comment={comment}
                    comments={post.comments || []}
                    isPostingComment={isPostingComment}
                    setComment={setComment}
                    addComment={addComment}
                  />
                </div>
              </div>
            </div>
          </div>
          <p className={"p-10 text-lg text-gray-600 "}>{caption}</p>
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
