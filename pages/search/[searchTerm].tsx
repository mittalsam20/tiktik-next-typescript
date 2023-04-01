import React from "react";

import Image from "next/legacy/image";
import { GoVerified } from "react-icons/go";

import { BASE_URL } from "@/utils";
import { IUser, Video } from "@/types";
import NoResults from "@/components/NoResults";
import VideoCard from "@/components/VideoCard";

import axios from "axios";
import useAuthStore from "@/store/authStore";

interface IProps {
  videos: Video[];
}

const Search = ({ videos }: IProps) => {
  return <div>Search</div>;
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return { props: { videos: data } };
};

export default Search;
