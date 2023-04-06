import { Inter } from "next/font/google";

import { Video } from "@/types";

import axios from "axios";
import { BiSearch } from "react-icons/bi";

import VideoCard from "@/components/VideoCard";
import NoResults from "@/components/NoResults";
import { BASE_URL } from "@/utils";

const inter = Inter({ subsets: ["latin"] });
interface Iprops {
  videos: Video[];
}

const Home = ({ videos }: Iprops) => {
  return (
    <div className="flex flex-col gap-10 videos h-full items-center">
      {videos.length ? (
        videos.map((video: Video) => {
          return <VideoCard post={video} key={video._id} showDetails={true} />;
        })
      ) : (
        <NoResults IconComponent={BiSearch} text={"No Videos Yet"} />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let res;
  if (topic) {
    res = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    res = await axios.get(`${BASE_URL}/api/post`);
  }
  return {
    props: { videos: res.data },
  };
};

export default Home;
