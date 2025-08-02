import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json(
        { error: "username và mật khẩu là bắt buộc" },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Mật khẩu phải có ít nhất 6 ký tự" },
        { status: 400 }
      );
    }

    const [existing]: any = await pool.execute(
      "SELECT id FROM account WHERE username = ?",
      [username]
    );
    if (Array.isArray(existing) && existing.length > 0) {
      return NextResponse.json(
        { error: "username đã được đăng ký" },
        { status: 409 }
      );
    }

    const [result]: any = await pool.execute(
      "INSERT INTO account (username, password) VALUES (?, ?)",
      [username, password || null]
    );
    const insertId = result.insertId;
    const [userRows]: any = await pool.execute(
      "SELECT id, username, create_time FROM account WHERE id = ?",
      [insertId]
    );
    const user = Array.isArray(userRows) ? userRows[0] : null;

    const token = signToken({ userId: user.id, username: user.username });
    const res = NextResponse.json({ user });

    const isProd = process.env.NODE_ENV === "production";
    res.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=${
        60 * 60
      }; SameSite=Lax${isProd ? "; Secure" : ""}`
    );

    return res;
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}