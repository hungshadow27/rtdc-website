import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../lib/db";
import { getTokenFromReq, verifyToken } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = getTokenFromReq(req);
  if (!token) return res.status(401).json({ error: "Chưa đăng nhập" });

  try {
    const decoded: any = verifyToken(token);
    const [rows]: any = await pool.execute(
      "SELECT id, email, name, created_at FROM account WHERE id = ?",
      [decoded.userId]
    );
    const user = Array.isArray(rows) ? rows[0] : null;
    if (!user) return res.status(404).json({ error: "Không tìm thấy tài khoản" });
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Token không hợp lệ" });
  }
}