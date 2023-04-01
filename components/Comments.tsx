import React, { Dispatch, SetStateAction, FormEvent } from "react";

import Link from "next/link";
import Image from "next/legacy/image";

import { GoVerified } from "react-icons/go";
import { BiCommentX } from "react-icons/bi";

import NoResults from "./NoResults";
import useAuthStore from "@/store/authStore";

interface IProps {
  comment: string;
  comments: IComment[];
  isPostingComment: Boolean;
  addComment: (e: FormEvent) => void;
  setComment: Dispatch<SetStateAction<string>>;
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}

const Comments = ({
  comment,
  comments,
  isPostingComment,
  addComment,
  setComment,
}: IProps) => {
  const { userProfile } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg--[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          <div>{"VIDEOS"}</div>
        ) : (
          <NoResults
            IconComponent={BiCommentX}
            text={"No Comments yet. Be the first one to comment"}
          />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4 ">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value.trim())}
              placeholder={"Add Comment..."}
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button className="text-md text-gray-400" onClick={addComment}>
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
