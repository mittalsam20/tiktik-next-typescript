import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";

import useAuthStore from "@/store/authStore";

const LikeButton = () => {
  const { userProfile } = useAuthStore();
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  return (
    <div className={"gap-6"}>
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
      </div>
    </div>
  );
};

export default LikeButton;
