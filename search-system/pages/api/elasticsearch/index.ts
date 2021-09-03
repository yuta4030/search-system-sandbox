import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

async function request() {
  const res = await axios.get("http://localhost:9200/");
  return res.data;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const result = await request()
  res.status(200).json(result);
}

export default handler