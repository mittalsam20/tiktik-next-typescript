import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";

import useAuthStore from "@/store/authStore";

interface IProps {
  likes: any[];
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeButton = ({ likes, handleLike, handleDislike }: IProps) => {
  const { userProfile }: any = useAuthStore();
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const filteredLikes = likes?.filter((like) => like._ref == userProfile?._id);

  useEffect(() => {
    if (filteredLikes.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [likes, filteredLikes]);

  return (
    <div className={"flex gap-6"}>
      <div
        className={
          "mt-4 flex flex-col justify-center items-center cursor-pointer"
        }
      >
        {alreadyLiked ? (
          <div
            className={"bg-primary rounded-full text-[#F51997] p-2 md:p-4"}
            onClick={handleDislike}
          >
            <MdFavorite className={"text-lg md:text-2xl"} />
          </div>
        ) : (
          <div
            className={"bg-primary rounded-full  p-2 md:p-4"}
            onClick={handleLike}
          >
            <MdFavorite className={"text-lg md:text-2xl"} />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
