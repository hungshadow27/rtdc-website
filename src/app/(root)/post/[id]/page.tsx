"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Badge } from "@/components/UI/Badge";

import {
  Calendar,
  Share2,
  Heart,
  MessageCircle,
  ArrowLeft,
  Facebook,
  Twitter,
  Copy,
} from "lucide-react";
import Link from "next/link";
import NavBar from "@/components/NavBar";

interface EventDetail {
  id: string;
  title: string;
  description: string;
  content: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "ended";
  participants: number;
  maxParticipants: number;
  rewards: Array<{
    rank: string;
    items: string[];
    currency: number;
  }>;
  requirements: string[];
  images: string[];
  author: string;
  publishDate: string;
  likes: number;
  comments: number;
  category: string;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

const EventDetailPage = () => {
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Mock event data
  const event: EventDetail = {
    id: "1",
    title: "SỰ KIỆN HÈ 2024 - VÌ VŨ BÁI BIẾN",
    description:
      "Tham gia giải đấu võ thuật lớn nhất năm để tranh tài và nhận những phần thưởng cực khủng!",
    content: `
      <h2>🔥 GIẢI ĐẤU VÌ VŨ BÁI BIẾN - SỰ KIỆN ĐỈNH CAO CỦA NĂM!</h2>
      
      <p>Các chiến binh Dragon Ball! Đã đến lúc chứng minh sức mạnh thực sự của bạn trong giải đấu Vì Vũ Bái Biến - sự kiện lớn nhất trong năm 2024!</p>
      
      <h3>📅 Thời Gian Diễn Ra:</h3>
      <ul>
        <li><strong>Bắt đầu:</strong> 01/07/2024 - 00:00</li>
        <li><strong>Kết thúc:</strong> 31/07/2024 - 23:59</li>
        <li><strong>Thời gian đăng ký:</strong> 25/06/2024 - 30/06/2024</li>
      </ul>
      
      <h3>⚔️ Cách Thức Tham Gia:</h3>
      <ol>
        <li>Đăng ký tham gia tại NPC Whis trong game</li>
        <li>Chuẩn bị đội hình mạnh nhất (tối thiểu 3 nhân vật cấp 50+)</li>
        <li>Tham gia các trận đấu theo lịch được sắp xếp</li>
        <li>Tích lũy điểm số để leo rank</li>
      </ol>
      
      <h3>🎯 Luật Chơi:</h3>
      <ul>
        <li>Mỗi người chơi có tối đa 5 lượt thách đấu mỗi ngày</li>
        <li>Thắng +3 điểm, Hòa +1 điểm, Thua +0 điểm</li>
        <li>Sử dụng vật phẩm hỗ trợ bị hạn chế</li>
        <li>Nghiêm cấm sử dụng hack, cheat</li>
      </ul>
      
      <h3>🏆 Phần Thưởng Đặc Biệt:</h3>
      <p>Ngoài những phần thưởng theo rank, tất cả người chơi tham gia sẽ nhận được:</p>
      <ul>
        <li>Danh hiệu "Chiến Binh Vì Vũ Bái Biến"</li>
        <li>Skin độc quyền cho Goku Ultra Instinct</li>
        <li>1000 Kim Cương miễn phí</li>
      </ul>
    `,
    startDate: "2024-07-01T00:00:00",
    endDate: "2024-07-31T23:59:59",
    status: "active",
    participants: 15420,
    maxParticipants: 50000,
    rewards: [
      {
        rank: "Top 1",
        items: ["Goku Ultra Instinct", "10,000 Kim Cương", "Danh hiệu Vô Địch"],
        currency: 5000000,
      },
      {
        rank: "Top 2-10",
        items: [
          "Vegeta Blue Evolution",
          "5,000 Kim Cương",
          "Danh hiệu Cao Thủ",
        ],
        currency: 2000000,
      },
      {
        rank: "Top 11-100",
        items: ["Frieza Golden", "2,000 Kim Cương", "Danh hiệu Chiến Binh"],
        currency: 500000,
      },
    ],
    requirements: [
      "Cấp độ tài khoản tối thiểu: 30",
      "Có ít nhất 3 nhân vật cấp 50+",
      "Đã hoàn thành nhiệm vụ chính chương 5",
      "Không vi phạm quy định game trong 30 ngày gần nhất",
    ],
    images: [
      "/placeholder.svg?height=400&width=800&text=Event+Banner",
      "/placeholder.svg?height=300&width=600&text=Gameplay+Screenshot",
      "/placeholder.svg?height=300&width=600&text=Rewards+Preview",
    ],
    author: "GameMaster",
    publishDate: "2024-06-20T10:00:00",
    likes: 2847,
    comments: 156,
    category: "Sự kiện",
  };

  const comments: Comment[] = [
    {
      id: "1",
      author: "DragonFighter99",
      avatar: "/placeholder.svg?height=40&width=40&text=DF",
      content:
        "Sự kiện này quá hay! Đã chuẩn bị team mạnh nhất để tham gia rồi 🔥",
      date: "2024-06-21T14:30:00",
      likes: 23,
    },
    {
      id: "2",
      author: "SaiyanPrince",
      avatar: "/placeholder.svg?height=40&width=40&text=SP",
      content: "Phần thưởng top 1 nhìn hấp dẫn quá! Ai muốn team up không?",
      date: "2024-06-21T16:45:00",
      likes: 15,
    },
    {
      id: "3",
      author: "KameHameHa",
      avatar: "/placeholder.svg?height=40&width=40&text=KH",
      content:
        "Mình đã tham gia sự kiện năm ngoái, năm nay chắc chắn sẽ hay hơn!",
      date: "2024-06-22T09:15:00",
      likes: 8,
    },
  ];

  const relatedEvents = [
    {
      id: "2",
      title: "Săn Boss Frieza Hoàng Kim",
      date: "15.07 - 20.07",
      status: "upcoming",
    },
    {
      id: "3",
      title: "Lễ Hội Mùa Hè Dragon Ball",
      date: "01.08 - 15.08",
      status: "upcoming",
    },
    {
      id: "4",
      title: "Giải Đấu Võ Thuật Thiên Hạ",
      date: "20.08 - 30.08",
      status: "upcoming",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500 animate-pulse">Đang diễn ra</Badge>
        );
      case "upcoming":
        return <Badge className="bg-blue-500">Sắp diễn ra</Badge>;
      case "ended":
        return <Badge className="bg-gray-500">Đã kết thúc</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = event.title;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Đã copy link!");
        break;
    }
    setShowShareMenu(false);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      // Handle comment submission
      console.log("New comment:", newComment);
      setNewComment("");
    }
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
      <div className="w-full p-5 bg-orange-300">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/forum">
            <Button
              variant="outline"
              className="border-white/30 text-black hover:bg-red-400 bg-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách sự kiện
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 ">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-2">
            {/* Event Header */}
            <Card className="bg-white shadow-md">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className="bg-orange-500">{event.category}</Badge>
                  {getStatusBadge(event.status)}
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    {formatDate(event.publishDate)}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-black mb-4">
                  {event.title}
                </CardTitle>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {event.description}
                </p>

                {/* Engagement Stats */}
                <div className="flex items-center gap-6 mt-6 text-sm">
                  <Button
                    variant="ghost"
                    onClick={() => setLiked(!liked)}
                    className={`text-black hover:bg-white/10 ${
                      liked ? "text-red-400" : ""
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 mr-2 ${liked ? "fill-current" : ""}`}
                    />
                    {event.likes + (liked ? 1 : 0)}
                  </Button>
                  <div className="flex items-center gap-2 text-black">
                    <MessageCircle className="w-5 h-5" />
                    {event.comments} bình luận
                  </div>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="text-black hover:bg-white/10"
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      Chia sẻ
                    </Button>
                    {showShareMenu && (
                      <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-2 z-10">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare("facebook")}
                          className="w-full justify-start"
                        >
                          <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                          Facebook
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare("twitter")}
                          className="w-full justify-start"
                        >
                          <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                          Twitter
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare("copy")}
                          className="w-full justify-start"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy link
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Event Content */}
            <Card className="bg-white text-sm">
              <CardContent className="p-6">
                <div
                  className="prose prose-invert max-w-none text-black"
                  dangerouslySetInnerHTML={{ __html: event.content }}
                />
              </CardContent>
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-4 p-6">
                  <div className="md:col-span-2">
                    <img
                      src="/4.png"
                      alt="Event Banner"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  {event.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src="/5.png"
                      alt={`Event Image ${index + 2}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
