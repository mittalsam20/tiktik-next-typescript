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
  return <div>Profile</div>;
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
