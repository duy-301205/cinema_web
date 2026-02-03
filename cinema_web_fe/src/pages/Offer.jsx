import React, { useState } from "react";
import {
  Calendar,
  Clock,
  AlarmClock,
  Crown,
  Pizza,
  IceCream,
  Wine,
  Ticket,
  Utensils,
  Users,
  Star,
  GraduationCap,
  LayoutGrid,
} from "lucide-react";
import { filterCategories, promotions, concessions } from "../data/offersData";
import Footer from "../components/Footer";

export default function Offer() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Lọc dữ liệu dựa trên category đang chọn
  const filteredPromotions =
    activeCategory === "all"
      ? promotions
      : promotions.filter((p) => p.category === activeCategory);

  const filteredConcessions =
    activeCategory === "all"
      ? concessions
      : concessions.filter((c) => c.category === activeCategory);

  // Helper function để lấy icon từ tên string
  const getIcon = (iconName, className) => {
    const ICON_MAP = {
      // Filter Icons
      LayoutGrid: <LayoutGrid className={className} />,
      Utensils: <Utensils className={className} />,
      Users: <Users className={className} />,
      Star: <Star className={className} />,
      GraduationCap: <GraduationCap className={className} />,

      // Promo & Concession Icons
      Calendar: <Calendar className={className} />,
      Clock: <Clock className={className} />,
      AlarmClock: <AlarmClock className={className} />,
      Pizza: <Pizza className={className} />,
      IceCream: <IceCream className={className} />,
      Wine: <Wine className={className} />,
      Ticket: <Ticket className={className} />,
    };
    return ICON_MAP[iconName] || null;
  };
  return (
    <>
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center">
        <div className="flex flex-col max-w-[1200px] w-full pb-20">
          {/* Hero Section */}
          <div className="p-4 md:p-6">
            <div
              className="flex min-h-[420px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-6 pb-12 md:px-12 relative overflow-hidden group shadow-2xl"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(16, 25, 34, 0.9) 0%, rgba(16, 25, 34, 0.4) 50%, rgba(19, 127, 236, 0.2) 100%), url("https://images.unsplash.com/photo-1517604931442-71053e3e2c3c?q=80&w=2070&auto=format&fit=crop")`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 mix-blend-overlay pointer-events-none"></div>

              <div className="flex flex-col gap-3 text-left relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/30 w-fit">
                  <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Limited Time Offer
                  </span>
                </div>

                <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em]">
                  Summer Blockbuster Pass
                </h1>

                <p className="text-slate-200 text-base md:text-lg font-normal leading-relaxed">
                  Save 30% on your next 5 movies. Enjoy the ultimate cinematic
                  experience with priority booking and exclusive theater access.
                </p>

                <div className="mt-4 flex flex-wrap gap-4">
                  <button className="flex min-w-[160px] items-center justify-center rounded-lg h-12 px-6 bg-blue-600 hover:bg-blue-500 text-white text-base font-bold transition-transform active:scale-95 shadow-lg shadow-blue-600/20">
                    Get Pass Now
                  </button>
                  <button className="flex min-w-[160px] items-center justify-center rounded-lg h-12 px-6 bg-white/10 backdrop-blur-md text-white border border-white/20 text-base font-bold hover:bg-white/20 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-3 px-6 py-4 flex-wrap overflow-x-auto no-scrollbar">
            {filterCategories.map((category) => {
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                  flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 transition-all duration-300
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "bg-[#233648] text-slate-300 hover:bg-[#2e475e] hover:text-white"
                  }
                `}
                >
                  {/* Gọi hàm getIcon với tên icon từ data */}
                  {!isActive && getIcon(category.icon, "w-4 h-4")}
                  <p className="text-sm font-bold">{category.label}</p>
                </button>
              );
            })}
          </div>

          {/* Loyalty Rewards Widget */}
          <div className="px-6 py-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-xl bg-gradient-to-r from-blue-900/40 to-transparent border border-blue-500/20 relative overflow-hidden">
              <div className="absolute -left-10 -top-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>

              <div className="size-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 z-10 shrink-0">
                <Crown size={28} />
              </div>

              <div className="flex-1 z-10">
                <h3 className="text-white text-lg font-bold">
                  Loyalty Rewards
                </h3>
                <p className="text-[#92adc9] text-sm mt-1">
                  Earn{" "}
                  <span className="text-amber-400 font-bold">2x Points</span> on
                  'Family Bundle' bookings this week! Maximize your rewards.
                </p>
              </div>

              <div className="w-full md:w-auto text-left md:text-right z-10 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                <p className="text-xs text-[#92adc9] uppercase font-bold tracking-widest">
                  Your Points
                </p>
                <p className="text-2xl font-black text-blue-400">
                  1,240{" "}
                  <span className="text-sm font-normal text-white/60">pts</span>
                </p>
              </div>
            </div>
          </div>

          {/* Promotions Section */}
          <div className="flex items-center justify-between px-6 pt-8 pb-4">
            <h2 className="text-white text-2xl font-black leading-tight tracking-[-0.015em]">
              Hot Promotions
            </h2>
            <a
              className="text-blue-400 text-sm font-bold hover:text-blue-300 hover:underline transition-colors"
              href="#"
            >
              See terms
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-8">
            {filteredPromotions.length > 0 ? (
              filteredPromotions.map((promo) => (
                <div key={promo.id} className="flex flex-col gap-3 group">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-white/5">
                    <div
                      className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url("${promo.image}")` }}
                    ></div>
                    <div
                      className={`absolute top-3 left-3 px-3 py-1 rounded text-white text-xs font-bold uppercase shadow-lg ${promo.tagColor}`}
                    >
                      {promo.tag}
                    </div>
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded bg-black/60 backdrop-blur-sm text-white text-xs font-bold border border-white/10">
                      {promo.points}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 px-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-white text-xl font-bold leading-normal group-hover:text-blue-400 transition-colors">
                        {promo.title}
                      </h3>
                      <span className="text-blue-400 font-black text-xl">
                        {promo.price}
                      </span>
                    </div>

                    <p className="text-[#92adc9] text-sm font-normal leading-normal line-clamp-2">
                      {promo.description}
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-slate-500 text-xs font-medium">
                      {getIcon(promo.iconType, "w-3.5 h-3.5")}
                      <span>{promo.validity}</span>
                    </div>

                    <button
                      className={`mt-4 w-full h-11 rounded-lg font-bold transition-all ${promo.btnColor}`}
                    >
                      {promo.btnText}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-slate-500 italic">
                No promotions found for this category.
              </div>
            )}
          </div>

          {/* Concessions Section */}
          <div className="px-6 py-4 mt-4">
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 border-b border-[#233648]">
              Concessions & Add-ons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mt-4">
            {filteredConcessions.map((item) => (
              <div
                key={item.id}
                className="bg-[#1a2632] p-4 rounded-xl flex items-center gap-4 border border-transparent hover:border-blue-500/40 hover:bg-[#202e3b] transition-all cursor-pointer group"
              >
                <div className="size-16 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-105 transition-transform">
                  {getIcon(item.icon, "w-8 h-8")}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-bold">{item.title}</p>
                  <p className="text-blue-400 text-xs font-black mt-0.5">
                    {item.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
