import { client } from "@/utils/client";
import { searchPostsQuery } from "@/utils/queries";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { searchTerm } = req.query;
    const query = searchPostsQuery(searchTerm as string);
    const videos = await client.fetch(query);
    res.status(200).json(videos);
  }
};

export default handler;
