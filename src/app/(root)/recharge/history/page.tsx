"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import { Badge } from "@/components/UI/Badge";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { History, Search, Filter } from "lucide-react";
import NavBar from "@/components/NavBar";
import Link from "next/link";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: "success" | "pending" | "failed";
  bonus: number;
}

const TransactionHistory = () => {
  const transactions: Transaction[] = [
    {
      id: "TXN001",
      date: "2024-01-15 14:30",
      amount: 200000,
      method: "MoMo",
      status: "success",
      bonus: 15000,
    },
    {
      id: "TXN002",
      date: "2024-01-10 09:15",
      amount: 100000,
      method: "ZaloPay",
      status: "success",
      bonus: 5000,
    },
    {
      id: "TXN003",
      date: "2024-01-08 16:45",
      amount: 500000,
      method: "Banking",
      status: "pending",
      bonus: 50000,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500">Thành công</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Đang xử lý</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Thất bại</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="text-gray-600">Lịch Sử Giao Dịch</span>
          </h1>
        </div>

        <Card className="bg-white border-white/20">
          <CardHeader>
            <CardTitle className="text-black flex items-center gap-2">
              <History className="w-5 h-5" />
              Danh Sách Giao Dịch
            </CardTitle>
            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <Input
                  placeholder="Tìm kiếm theo mã giao dịch..."
                  className="bg-white/10 border-gray-300 text-gray-700 placeholder:text-gray-700"
                />
              </div>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-white/10 bg-transparent"
              >
                <Search className="w-4 h-4 mr-2" />
                Tìm kiếm
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-white/10 bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                Lọc
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-white/5 rounded-lg p-4 border border-gray-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-gray-700 font-semibold">
                        #{transaction.id}
                      </h3>
                      <p className="text-gray-700 text-sm">
                        {transaction.date}
                      </p>
                    </div>
                    {getStatusBadge(transaction.status)}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-700 text-sm">Số tiền nạp</p>
                      <p className="text-gray-700 font-semibold">
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-sm">Phương thức</p>
                      <p className="text-gray-700">{transaction.method}</p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-sm">Bonus nhận được</p>
                      <p className="text-green-300 font-semibold">
                        +{formatCurrency(transaction.bonus)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* 
            <div className="flex justify-center mt-6">
              <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                <Download className="w-4 h-4 mr-2" />
                Xuất File Excel
              </Button>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionHistory;
