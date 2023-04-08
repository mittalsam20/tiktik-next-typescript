import { client } from "@/utils/client";
import { postDetailQuery } from "@/utils/queries";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { id } = req.query;
    const res = await client.delete(id as string);
    res.status(200).json(res);
  } else if (req.method === "PATCH") {
    const { id } = req.query;
    const { updatedText } = req.body;
    const response = client
      .patch(id as string)
      .set({ comment: updatedText })
      .commit();
    res.status(200).json(response);
  }
};

export default handler;
