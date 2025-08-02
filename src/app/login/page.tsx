"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import { Eye, EyeOff, User, Lock } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login data:", formData);
    alert("Đăng nhập thành công!");
  };

  return (
    <div className="relative min-h-screen bg-slate-50 flex flex-col items-center justify-center">
      <div className="absolute p-10 flex justify-between items-center top-0 w-full h-24 bg-gradient-to-r from-orange-400 to-orange-300">
        <Link href="/">
          <img className="m-3 ml-5" width={150} src="/LOGOdragon.png" alt="" />
        </Link>
        <CardTitle className="text-2xl font-bold text-white bg-clip-text">
          ĐĂNG NHẬP
        </CardTitle>
      </div>
      <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-sm shadow-2xl border-0 mt-16">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
            Chào Mừng Trở Lại
          </CardTitle>
          <CardDescription className="text-gray-600">
            Đăng nhập để tiếp tục cuộc phiêu lưu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Tên Đăng Nhập
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Mật Khẩu
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm text-purple-600 hover:text-purple-800 underline"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-orange-300 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              Đăng Nhập
            </Button>

            <div className="text-center text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                href="/register"
                className="text-purple-600 hover:text-purple-800 font-semibold underline"
              >
                Đăng ký ngay
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
