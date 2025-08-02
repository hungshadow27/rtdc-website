// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (!username || !password)
    return NextResponse.json({ error: "username và mật khẩu là bắt buộc" }, { status: 400 });

  try {
    const [rows]: any = await pool.execute(
      "SELECT id, username, password FROM account WHERE username = ?",
      [username]
    );
    const user = Array.isArray(rows) ? rows[0] : null;
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "username hoặc mật khẩu không đúng" }, { status: 401 });
    }

    const token = signToken({ userId: user.id, username: user.username });
    const res = NextResponse.json({
      user: { id: user.id, username: user.username },
    });

    const isProd = process.env.NODE_ENV === "production";
    res.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60}; SameSite=Lax${isProd ? "; Secure" : ""}`
    );

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
