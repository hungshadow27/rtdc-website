"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import { Badge } from "@/components/UI/Badge";
import { Separator } from "@/components/UI/Separator";
import {
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  User,
  Coins,
  Gift,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";
import Link from "next/link";
import NavBar from "@/components/NavBar";

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  fee: number;
}

interface RechargePackage {
  id: string;
  amount: number;
  bonus: number;
  popular?: boolean;
  vip?: boolean;
}

const RechargePage = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock user data
  const user = {
    username: "DragonWarrior2024",
    email: "user@example.com",
    currentBalance: 125000,
    vipLevel: 3,
  };

  const paymentMethods: PaymentMethod[] = [
    {
      id: "momo",
      name: "Ví MoMo",
      icon: <Smartphone className="w-5 h-5 text-pink-500" />,
      description: "Thanh toán qua ví điện tử MoMo",
      fee: 0,
    },
    {
      id: "zalopay",
      name: "ZaloPay",
      icon: <Wallet className="w-5 h-5 text-blue-500" />,
      description: "Thanh toán qua ví ZaloPay",
      fee: 0,
    },
    {
      id: "banking",
      name: "Chuyển khoản ngân hàng",
      icon: <Building2 className="w-5 h-5 text-green-500" />,
      description: "Chuyển khoản qua ngân hàng",
      fee: 0,
    },
    {
      id: "card",
      name: "Thẻ cào điện thoại",
      icon: <CreditCard className="w-5 h-5 text-orange-500" />,
      description: "Nạp bằng thẻ cào Viettel, Mobifone, Vinaphone",
      fee: 5,
    },
  ];

  const rechargePackages: RechargePackage[] = [
    { id: "50k", amount: 50000, bonus: 0 },
    { id: "100k", amount: 100000, bonus: 5000, popular: true },
    { id: "200k", amount: 200000, bonus: 15000 },
    { id: "500k", amount: 500000, bonus: 50000, vip: true },
    { id: "1m", amount: 1000000, bonus: 120000, vip: true },
    { id: "2m", amount: 2000000, bonus: 300000, vip: true },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleRecharge = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Nạp tiền thành công! Số dư đã được cập nhật.");
    setIsProcessing(false);
    setSelectedMethod("");
    setSelectedPackage("");
    setCustomAmount("");
  };

  const getSelectedAmount = () => {
    if (selectedPackage) {
      const pkg = rechargePackages.find((p) => p.id === selectedPackage);
      return pkg ? pkg.amount : 0;
    }
    return Number.parseInt(customAmount) || 0;
  };

  const getBonus = () => {
    if (selectedPackage) {
      const pkg = rechargePackages.find((p) => p.id === selectedPackage);
      return pkg ? pkg.bonus : 0;
    }
    return 0;
  };

  return (
    <div>
      <div className="flex gap-2 items-center">
        <img
          className="w-[15px] h-[15px] object-cover"
          src="/18-1.png"
          alt="18+"
        />
        <span className="text-[12px]">
          Chơi quá 180 phút một ngày sẽ ảnh hưởng xấu đến sức khỏe.
        </span>
      </div>
      <section>
        <div className=" flex flex-col justify-between items-center w-full rounded-t-2xl bg-[url('/banner.jpg')] bg-cover bg-center">
          <NavBar />
          <img
            style={{ filter: "drop-shadow(3px 3px 2px white)" }}
            src="/LOGOdragon.png"
            alt=""
            width={300}
            className="py-12"
          />
          {/* Login register button*/}
          <div className="pb-10 flex justify-center items-center gap-10 flex-wrap ">
            <Link href="/register">
              <img
                className="hover-zoom"
                src="/dangki.png"
                alt=""
                width={200}
              />
            </Link>
            <Link href="/login">
              <img
                className="hover-zoom"
                src="/dangnhap.png"
                alt=""
                width={200}
              />
            </Link>
          </div>
        </div>
      </section>
      <div className="p-5 bg-orange-300">
        {/* Header */}
        <Card className="text-center mb-5">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            <span className=" text-black">Nạp Tiền Vào Tài Khoản</span>
          </h1>
          <p className="text-gray-700">
            Nạp tiền để mua vật phẩm và nâng cấp nhân vật
          </p>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* User Info */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-md mb-6">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Thông Tin Tài Khoản
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tên đăng nhập:</span>
                  <span className="text-gray-800 font-semibold">
                    {user.username}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Email:</span>
                  <span className="text-gray-800 text-sm">{user.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cấp VIP:</span>
                  <Badge className="bg-yellow-500 text-black">
                    VIP {user.vipLevel}
                  </Badge>
                </div>
                <Separator className="bg-white/20" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Số dư hiện tại:</span>
                  <span className="text-yellow-300 font-bold text-lg">
                    {formatCurrency(user.currentBalance)}
                  </span>
                </div>
                <Link href="/recharge/history">
                  <span className="text-gray-800 italic hover:text-red-500">
                    Lịch sử giao dịch
                  </span>
                </Link>
              </CardContent>
            </Card>

            {/* Transaction Summary */}
            {selectedMethod && (selectedPackage || customAmount) && (
              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-gray-800 flex items-center gap-2">
                    <Coins className="w-5 h-5" />
                    Tóm Tắt Giao Dịch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số tiền nạp:</span>
                    <span className="text-gray-800">
                      {formatCurrency(getSelectedAmount())}
                    </span>
                  </div>
                  {getBonus() > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bonus:</span>
                      <span className="text-green-300">
                        +{formatCurrency(getBonus())}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí giao dịch:</span>
                    <span className="text-gray-800">
                      {paymentMethods.find((m) => m.id === selectedMethod)
                        ?.fee || 0}
                      %
                    </span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-800">Tổng nhận:</span>
                    <span className="text-yellow-300">
                      {formatCurrency(getSelectedAmount() + getBonus())}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recharge Packages */}
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Chọn Gói Nạp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {rechargePackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => {
                        setSelectedPackage(pkg.id);
                        setCustomAmount("");
                      }}
                      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedPackage === pkg.id
                          ? "border-yellow-400 bg-yellow-400/20"
                          : "border-gray bg-white/5 hover:border-black"
                      }`}
                    >
                      {pkg.popular && (
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-500">
                          Phổ biến
                        </Badge>
                      )}
                      {pkg.vip && (
                        <div className="absolute -top-2 -right-2">
                          <Star className="w-6 h-6 text-yellow-400 fill-current" />
                        </div>
                      )}
                      <div className="text-center">
                        <div className="text-gray-800 font-bold text-lg mb-1">
                          {formatCurrency(pkg.amount)}
                        </div>
                        {pkg.bonus > 0 && (
                          <div className="text-green-300 text-sm">
                            +{formatCurrency(pkg.bonus)} bonus
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="space-y-2">
                  <Label className="text-gray-800">
                    Hoặc nhập số tiền tùy chỉnh:
                  </Label>
                  <Input
                    type="number"
                    placeholder="Nhập số tiền (VNĐ)"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedPackage("");
                    }}
                    className="bg-white/10 border-gray text-gray-800 placeholder:text-gray-800/50"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Chọn Phương Thức Thanh Toán
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedMethod === method.id
                          ? "border-yellow-400 bg-yellow-400/20"
                          : "border-gray bg-white/5 hover:border-black"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {method.icon}
                        <span className="text-gray-800 font-semibold">
                          {method.name}
                        </span>
                        {method.fee === 0 && (
                          <Badge className="bg-green-500 text-xs">
                            Miễn phí
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {method.description}
                      </p>
                      {method.fee > 0 && (
                        <p className="text-orange-300 text-xs mt-1">
                          Phí: {method.fee}%
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleRecharge}
                disabled={
                  !selectedMethod ||
                  (!selectedPackage && !customAmount) ||
                  isProcessing
                }
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-600 hover:to-blue-600 text-white w-full font-bold py-3 px-8 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 animate-spin" />
                    Đang xử lý...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Nạp Tiền Ngay
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechargePage;
