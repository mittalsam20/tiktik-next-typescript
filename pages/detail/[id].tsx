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
// import Comments from "@/components/Comments";
import Comments from "../../components/nestedComments/comments";

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [videoStates, setVideoStates] = useState({
    isPlaying: false,
    isMuted: false,
  });
  const { isPlaying, isMuted } = videoStates;
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

  const onClickVideo = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setVideoStates((prev) => ({ ...prev, isPlaying: false }));
      return;
    }
    videoRef?.current?.play();
    setVideoStates((prev) => ({ ...prev, isPlaying: true }));
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
        postId,
        like,
      });
      setPost((prevState) => ({ ...prevState, likes: data.likes }));
    }
  };

  const onAddComment = async (params: {
    text: string;
    parentId: string;
    event: { preventDefault: () => void };
  }) => {
    const { text, parentId, event } = params;
    console.log(text, event, parentId);
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/post/${postId}`, {
        userId: userProfile._id,
        parentId,
        text,
      });
      console.log("xsxs", data);
      setPost((prevState) => ({ ...prevState, comments: data.comments }));
    }
  };

  const onDeleteComment = async (params: { commentId: string }) => {
    const { commentId } = params;
    console.log(commentId);
    if (userProfile && commentId) {
      axios.delete;
      const { data } = await axios.delete(
        `${BASE_URL}/api/comment/${commentId}`
      );
      setPost((prevState) => ({ ...prevState, comments: data.comments }));
    }
  };

  const onEditComment = async (params: {
    text: string;
    commentId: string;
    event: { preventDefault: () => void };
  }) => {
    const { text, event, commentId } = params;
    console.log(text, event, commentId);
    if (userProfile) {
      const response = await axios.put(`${BASE_URL}/api/comment/${commentId}`, {
        updatedText: text,
      });
      console.log("reees", response);
      setPost((prevState) => ({
        ...prevState,
        comments: response.data.comments,
      }));
    }
  };

  const formattedComments = comments.map(
    ({ _key, comment, parentId, postedBy }) => ({
      commentId: _key,
      body: comment,
      parentId,
      postId,
      userDetails: {
        userId: postedBy._id,
        userName: postedBy.userName,
        userImage: postedBy.image,
      },
    })
  );
  console.log(comments);
  if (!post) return null;
  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
        <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer " onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px] hover:opacity-90" />
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

          <div className="absolute top-[45%] left-[40%]  cursor-pointer">
            {!isPlaying && (
              <button onClick={onClickVideo}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer">
          {isMuted ? (
            <button
              onClick={() =>
                setVideoStates((prev) => ({ ...prev, isMuted: false }))
              }
            >
              <HiVolumeOff className="text-white text-3xl lg:text-4xl" />
            </button>
          ) : (
            <button
              onClick={() =>
                setVideoStates((prev) => ({ ...prev, isMuted: true }))
              }
            >
              <HiVolumeUp className="text-white text-3xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className="flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer">
              <Image
                width={60}
                height={60}
                src={userImage}
                alt="user-profile"
                className="rounded-full"
              />
              <div>
                <div className="text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center">
                  {userName.replace(/\s+/g, "")}{" "}
                  <GoVerified className="text-blue-400 text-xl" />
                </div>
                <p className="text-md"> {userName}</p>
              </div>
            </div>
          </Link>
          <div className="px-10">
            <p className=" text-md text-gray-600">{caption}</p>
          </div>
          <div className="mt-10 px-10">
            {userProfile && (
              <LikeButton
                // flex={"flex"}
                likes={likes || []}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments
            showAvatar={true}
            showLikes={true}
            postId={postId}
            authorId={userId}
            currentUserId={userProfile._id}
            currentUserName={userProfile.userName}
            currentUserAvatar={userProfile.image}
            comments={formattedComments || []}
            onAddingComment={onAddComment}
            onEditingComment={onEditComment}
            onDeletingComment={onDeleteComment}
          />
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
