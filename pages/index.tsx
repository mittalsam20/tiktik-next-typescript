import { Inter } from "next/font/google";

import { Video } from "@/types";

import axios from "axios";

import VideoCard from "@/components/VideoCard";
import NoResults from "@/components/NoResults";
import { BASE_URL } from "@/utils";

const inter = Inter({ subsets: ["latin"] });
interface Iprops {
  videos: Video[];
}

const Home = ({ videos }: Iprops) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => {
          return <VideoCard post={video} key={video._id} />;
        })
      ) : (
        <NoResults text={"No Videos Yet"} />
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`);
  return {
    props: { videos: data },
  };
};

export default Home;
