import { Inter } from "next/font/google";
import { NextPage } from "next";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  return <h1 className="text-3xl font-bold underline">{"Hello world!"}</h1>;
};

export const getServerSideProps = async () => {
  const response = await axios.get(`https://localhost:3000/api/post`);
  return {
    props: {},
  };
};

export default Home;
