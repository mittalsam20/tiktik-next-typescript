import { client } from "@/utils/client";

import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "@/utils/queries";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const query = singleUserQuery(id as string);
    const user = await client.fetch(query);
    const userCreatedPosts = await client.fetch(
      userCreatedPostsQuery(id as string)
    );
    const userLikedPosts = await client.fetch(
      userLikedPostsQuery(id as string)
    );
    console.log(user);
    res.status(200).json({ user: user[0], userCreatedPosts, userLikedPosts });
  }
};

export default handler;
