import { client } from "@/utils/client";
import { allPostsQuery } from "@/utils/queries";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const query = allPostsQuery();
    // const data=await client
  }
  res.status(200).json({ name: "John Doe" });
};

export default handler;
