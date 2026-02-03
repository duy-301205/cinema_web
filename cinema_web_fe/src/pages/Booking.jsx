import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { MOVIES_DATA } from "../data/movie";
import {
  ArrowRight,
  X,
  DoorOpen,
  LogOut,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";

export default function Booking() {
  const navigate = useNavigate();
  const handlePurchase = () => {
    const totalAmount = selectedSeats.length * seatPrice;

    navigate("/payment", {
      state: {
        movieTitle: movie.title,
        movieImage: movie.image, // Lấy link ảnh từ MOVIES_DATA
        movieGenres: movie.genres,
        date: selectedDate,
        time: selectedTime,
        seats: selectedSeats,
        totalPrice: totalAmount,
        cinemaName: "Grand Cinema - IMAX",
      },
    });
  };
  const { id } = useParams();
  const movie = MOVIES_DATA.find((m) => m.id === parseInt(id));

  // Cấu hình rạp
  const rows = ["A", "B", "C", "D", "E", "F"];
  const seatsPerRow = 16;
  const seatPrice = 16.0;

  // State quản lý lựa chọn
  const [cinema, setCinema] = useState("imax");
  const [selectedDate, setSelectedDate] = useState("Jan 25"); // Mặc định ngày hôm nay
  const [selectedTime, setSelectedTime] = useState("19:30");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [soldSeats] = useState(["A-1", "A-2", "C-5", "E-10", "F-16"]);

  if (!movie) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#111a22] text-white font-sans">
        <h2 className="text-2xl font-bold uppercase tracking-widest">
          Phim không tồn tại!
        </h2>
        <Link to="/home" className="ml-4 text-blue-500 underline font-medium">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  const toggleSeat = (seatId) => {
    if (soldSeats.includes(seatId)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId],
    );
  };

  return (
    <main className="max-w-[1440px] mx-auto px-4 lg:px-10 py-6 text-white bg-[#0a0a0a] min-h-screen font-sans">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-8 text-sm font-medium text-[#92adc9]">
        <Link to="/home" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          to={`/movie/${movie.id}`}
          className="hover:text-white transition-colors"
        >
          Movies
        </Link>
        <span>/</span>
        <span className="text-white">{movie.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* BỘ LỌC: RẠP - NGÀY - GIỜ */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chọn Rạp */}
            <div>
              <label className="flex items-center gap-2 text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                <MapPin size={12} className="text-blue-500" /> Cinema
              </label>
              <select
                value={cinema}
                onChange={(e) => setCinema(e.target.value)}
                className="w-full bg-white/10 border-none rounded-xl h-12 px-4 focus:ring-2 focus:ring-blue-500 appearance-none outline-none cursor-pointer text-sm font-bold"
              >
                <option value="imax" className="bg-[#1a2632]">
                  Grand Cinema - IMAX
                </option>
                <option value="atmos" className="bg-[#1a2632]">
                  Hall 4 - Dolby Atmos
                </option>
                <option value="vip" className="bg-[#1a2632]">
                  VIP Lounge - Premium
                </option>
                <option value="screenx" className="bg-[#1a2632]">
                  Starlight - ScreenX
                </option>
                <option value="gold" className="bg-[#1a2632]">
                  Cineplex - Gold Class
                </option>
              </select>
            </div>

            {/* Chọn Ngày */}
            <div>
              <label className="flex items-center gap-2 text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                <Calendar size={12} className="text-blue-500" /> Select Date
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-white/10 border-none rounded-xl h-12 px-4 focus:ring-2 focus:ring-blue-500 appearance-none outline-none cursor-pointer text-sm font-bold"
              >
                <option value="Jan 25" className="bg-[#1a2632]">
                  Today, 25 Jan
                </option>
                <option value="Jan 26" className="bg-[#1a2632]">
                  Mon, 26 Jan
                </option>
                <option value="Jan 27" className="bg-[#1a2632]">
                  Tue, 27 Jan
                </option>
                <option value="Jan 28" className="bg-[#1a2632]">
                  Wed, 28 Jan
                </option>
                <option value="Jan 29" className="bg-[#1a2632]">
                  Thu, 29 Jan
                </option>
              </select>
            </div>

            {/* Chọn Giờ */}
            <div>
              <label className="flex items-center gap-2 text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                <Clock size={12} className="text-blue-500" /> Select Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-white/10 border-none rounded-xl h-12 px-4 focus:ring-2 focus:ring-blue-500 appearance-none outline-none cursor-pointer text-sm font-bold"
              >
                <option value="10:30" className="bg-[#1a2632]">
                  10:30 AM
                </option>
                <option value="13:45" className="bg-[#1a2632]">
                  13:45 PM
                </option>
                <option value="17:00" className="bg-[#1a2632]">
                  17:00 PM
                </option>
                <option value="19:30" className="bg-[#1a2632]">
                  19:30 PM
                </option>
                <option value="22:15" className="bg-[#1a2632]">
                  22:15 PM
                </option>
              </select>
            </div>
          </div>

          {/* SƠ ĐỒ GHẾ (Giữ nguyên hiệu ứng Screen phát sáng của bạn) */}
          <div className="bg-white/5 p-8 lg:p-12 rounded-3xl border border-white/10 overflow-x-auto shadow-inner">
            <div className="min-w-[750px]">
              {/* Screen với hiệu ứng phát sáng */}
              <div className="flex justify-between items-end mb-16 px-6">
                <div className="flex flex-col items-center gap-1">
                  <DoorOpen
                    size={24}
                    className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                  />
                  <span className="text-[10px] font-black uppercase tracking-tighter text-emerald-400">
                    Entrance
                  </span>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="w-3/4 h-2 bg-blue-400 rounded-full relative shadow-[0_0_40px_10px_rgba(59,130,246,0.7)]">
                    <div className="absolute inset-0 bg-blue-200 rounded-full blur-[2px] opacity-50"></div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-full h-12 bg-blue-500/10 blur-2xl pointer-events-none"></div>
                  </div>
                  <p className="mt-6 text-white/40 text-xs font-black tracking-[1.5em] uppercase">
                    Screen
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <LogOut
                    size={22}
                    className="text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]"
                  />
                  <span className="text-[10px] font-black uppercase tracking-tighter text-red-400">
                    Exit
                  </span>
                </div>
              </div>

              {/* Lưới ghế */}
              <div className="flex flex-col gap-4">
                {rows.map((row) => (
                  <div
                    key={row}
                    className="flex items-center justify-center gap-6"
                  >
                    <span className="w-5 text-white/30 text-[10px] font-bold">
                      {row}
                    </span>
                    <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] gap-2">
                      {Array.from({ length: seatsPerRow }).map((_, i) => {
                        const seatId = `${row}-${i + 1}`;
                        const isSold = soldSeats.includes(seatId);
                        const isSelected = selectedSeats.includes(seatId);
                        return (
                          <button
                            key={seatId}
                            disabled={isSold}
                            onClick={() => toggleSeat(seatId)}
                            className={`size-7 lg:size-8 rounded-lg transition-all duration-300 transform active:scale-90
                              ${
                                isSold
                                  ? "bg-white/15 cursor-not-allowed opacity-40"
                                  : isSelected
                                    ? "bg-blue-600 ring-4 ring-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                                    : "bg-white/30 hover:bg-white/30 hover:scale-110"
                              }`}
                          />
                        );
                      })}
                    </div>
                    <span className="w-5 text-white/30 text-[10px] font-bold">
                      {row}
                    </span>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-16 flex justify-center gap-10 border-t border-white/5 pt-10">
                {[
                  { label: "Available", color: "bg-white/30" },
                  { label: "Selected", color: "bg-blue-600" },
                  { label: "Sold", color: "bg-white/15 opacity-40" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`size-4 rounded ${item.color}`}></div>
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TÓM TẮT ĐẶT VÉ (Bên phải) */}
        <div className="lg:col-span-4">
          <div className="sticky top-6 bg-[#1a2632] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="relative h-44 w-full">
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2632] via-[#1a2632]/40 to-transparent z-10"></div>
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8 -mt-10 relative z-20 space-y-8">
              <div>
                <h2 className="text-3xl font-black tracking-tight uppercase italic tracking-tighter">
                  {movie.title}
                </h2>
                <div className="flex gap-3 mt-2">
                  <span className="bg-blue-500/20 text-blue-400 text-[10px] font-black px-2 py-1 rounded uppercase">
                    IMAX 2D
                  </span>
                  <span className="text-white/40 text-xs font-medium self-center">
                    {movie.duration} • {movie.genres?.join(", ")}
                  </span>
                </div>
              </div>

              <div className="space-y-5 border-y border-white/5 py-6">
                {/* Hiển thị Ngày và Giờ đã chọn */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/40 font-bold uppercase tracking-tighter">
                    Showtime
                  </span>
                  <span className="font-black text-white/90 uppercase">
                    {selectedDate} • {selectedTime}
                  </span>
                </div>

                <div>
                  <label className="block text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                    Selected Seats ({selectedSeats.length})
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.length > 0 ? (
                      selectedSeats.map((seat) => (
                        <div
                          key={seat}
                          className="group bg-blue-600 px-3 py-1.5 rounded-xl flex items-center gap-2"
                        >
                          <span className="text-xs font-black uppercase">
                            {seat.replace("-", " ")}
                          </span>
                          <button
                            onClick={() => toggleSeat(seat)}
                            className="hover:text-red-400 transition-colors"
                          >
                            <X size={14} strokeWidth={3} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-white/20 italic font-medium">
                        No seats selected yet...
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-white/40 font-bold uppercase tracking-tighter">
                    Total Price
                  </span>
                  <span className="text-4xl font-black text-blue-500">
                    ${(selectedSeats.length * seatPrice).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handlePurchase}
                  disabled={selectedSeats.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-white/5 disabled:text-white/20 disabled:cursor-not-allowed text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 group cursor-pointer"
                >
                  Purchase Tickets
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
