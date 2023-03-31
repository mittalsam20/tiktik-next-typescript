import { client } from "@/utils/client";
import { postDetailQuery } from "@/utils/queries";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const query = postDetailQuery(id as string);

    const data = await client.fetch(query);
    res.status(200).json(data[0]);
  }
};

export default handler;
