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
import { Checkbox } from "@/components/UI/Checkbox";
import { Eye, EyeOff, User, Lock } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Tên đăng nhập không được để trống";
    } else if (formData.username.length < 3) {
      newErrors.username = "Tên đăng nhập phải có ít nhất 3 ký tự";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản sử dụng";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle registration logic here
      console.log("Registration data:", formData);
      alert("Đăng ký thành công! Chào mừng bạn đến với Rồng Thần Đại Chiến!");
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 flex flex-col items-center justify-center">
      <div className="absolute p-10 flex justify-between items-center top-0 w-full h-24 bg-gradient-to-r from-orange-400 to-orange-300">
        <Link href="/">
          <img className="m-3 ml-5" width={150} src="/LOGOdragon.png" alt="" />
        </Link>
        <CardTitle className="text-2xl font-bold text-white bg-clip-text">
          ĐĂNG KÝ
        </CardTitle>
      </div>
      <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-sm shadow-2xl border-0">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
            Tham Gia Rồng Thần Đại Chiến
          </CardTitle>
          <CardDescription className="text-gray-600">
            Tạo tài khoản để bắt đầu cuộc phiêu lưu của bạn
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
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
                    handleInputChange("username", e.target.value)
                  }
                  className={`pl-10 ${errors.username ? "border-red-500" : ""}`}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs">{errors.username}</p>
              )}
            </div>
            {/* Email Field */}
            {/* <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div> */}
            {/* Password Field */}
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
                    handleInputChange("password", e.target.value)
                  }
                  className={`pl-10 pr-10 ${
                    errors.password ? "border-red-500" : ""
                  }`}
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
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Xác Nhận Mật Khẩu
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className={`pl-10 pr-10 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) =>
                  handleInputChange("agreeTerms", checked as boolean)
                }
              />
              <Label
                htmlFor="agreeTerms"
                className="text-sm text-gray-600 cursor-pointer"
              >
                Tôi đồng ý với{" "}
                <Link
                  href="/terms"
                  className="text-purple-600 hover:text-purple-800 underline"
                >
                  Điều khoản sử dụng
                </Link>{" "}
                và{" "}
                <Link
                  href="/privacy"
                  className="text-purple-600 hover:text-purple-800 underline"
                >
                  Chính sách bảo mật
                </Link>
              </Label>
            </div>
            {errors.agreeTerms && (
              <p className="text-red-500 text-xs">{errors.agreeTerms}</p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-orange-300  text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              Đăng Ký Ngay
            </Button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="text-purple-600 hover:text-purple-800 font-semibold underline"
              >
                Đăng nhập ngay
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
