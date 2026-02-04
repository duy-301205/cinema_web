import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Shield,
  Lock,
  CreditCard,
  ChevronRight,
  Ticket,
  Armchair,
  X,
  User,
  Calendar,
  Utensils,
} from "lucide-react";

export default function PaymentTicket() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("momo");

  const data = location.state;

  if (!data) {
    return (
      <div className="h-screen bg-[#0a0a0a] flex items-center justify-center">
        <button
          onClick={() => navigate("/")}
          className="text-white underline font-sans"
        >
          Session expired. Go back to Home.
        </button>
      </div>
    );
  }

  // 1. Destructuring dữ liệu từ state
  const {
    movieTitle,
    movieImage,
    date,
    time,
    selectedSeats: seats = [],
    totalPrice, // Tổng tiền gốc (Vé + Đồ ăn)
    foodItems = [],
    totalTicketPrice, // Tiền vé từ trang Booking
  } = data;

  // Cấu hình phí và thuế
  const seatPrice = 16.0; // Đơn giá vé mặc định
  const bookingFee = 2.5;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + bookingFee + tax;

  const handlePayment = () => {
    const successData = {
      movieTitle: movieTitle,
      poster: movieImage,
      location: data.cinemaName || "Grand Cinema Deluxe • Hall 4",
      dateTime: `${date} • ${time}`,
      seats: seats.join(", ").replace(/-/g, ""),
      foodItems: foodItems,
      points: Math.floor(finalTotal * 10),
      ticketId: `TIX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      totalPaid: finalTotal,
    };
    navigate("/success", { state: successData });
  };

  return (
    <div className="bg-[#0f172a] min-h-screen flex items-center justify-center p-4 sm:p-8 font-sans antialiased text-slate-200">
      {/* Background (Giữ nguyên) */}
      <div className="fixed inset-0 z-0 overflow-hidden opacity-20">
        <img
          alt="bg"
          className="w-full h-full object-cover blur-xl"
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80"
        />
      </div>

      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 right-6 z-20 text-white/30 hover:text-white bg-white/5 p-2 rounded-full"
      >
        <X size={28} />
      </button>

      <div className="relative z-10 w-full max-w-[1050px] flex flex-col md:flex-row bg-slate-900/80 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        {/* LEFT SECTION: GIỮ NGUYÊN GIAO DIỆN CHỌN MOMO/VNPAY/CARD */}
        <div className="flex-1 p-6 lg:p-10 border-b md:border-b-0 md:border-r border-white/10">
          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold mb-2 tracking-tight">
              Payment Details
            </h2>
            <p className="text-white/60 text-sm">
              Select your payment method and complete your booking.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => setPaymentMethod("momo")}
              className={`flex items-center gap-3 py-4 px-4 rounded-xl font-bold transition-all border-2 cursor-pointer ${paymentMethod === "momo" ? "bg-[#A50064] border-transparent text-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}
            >
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center p-1.5 shrink-0">
                <svg
                  className="w-full h-full fill-[#A50064]"
                  viewBox="0 0 100 100"
                >
                  <path d="M80 20H20C14.5 20 10 24.5 10 30V70C10 75.5 14.5 80 20 80H80C85.5 80 90 75.5 90 70V30C90 24.5 85.5 20 80 20ZM40 65H30V35H40V65ZM70 65H60V35H70V65Z"></path>
                </svg>
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase opacity-80">
                  Pay with
                </span>
                <span className="text-base font-bold">MoMo</span>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod("vnpay")}
              className={`flex items-center gap-3 py-4 px-4 rounded-xl font-bold transition-all border-2 cursor-pointer ${paymentMethod === "vnpay" ? "bg-[#005baa] border-transparent text-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}
            >
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center p-1 shrink-0 text-[#005baa] font-black italic text-xl">
                VN
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase opacity-80">
                  Pay with
                </span>
                <span className="text-base font-bold">VNPay</span>
              </div>
            </button>
          </div>

          <button
            onClick={() => setPaymentMethod("card")}
            className={`w-full flex items-center justify-between p-4 mb-8 rounded-xl transition-all border-2 group cursor-pointer ${paymentMethod === "card" ? "bg-blue-600 border-transparent text-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}
          >
            <div className="flex items-center gap-3">
              <CreditCard
                size={24}
                className={
                  paymentMethod === "card" ? "text-white" : "text-white/40"
                }
              />
              <div className="text-left">
                <span className="block text-[10px] uppercase opacity-80">
                  Pay with
                </span>
                <span className="text-base font-bold">Credit / Debit Card</span>
              </div>
            </div>
            {paymentMethod !== "card" && (
              <ChevronRight className="text-white/20" size={18} />
            )}
          </button>

          {/* QR Code & Form Card (Giữ nguyên giao diện của bạn) */}
          {(paymentMethod === "momo" || paymentMethod === "vnpay") && (
            <div className="bg-slate-950/50 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
              {/* QR content... */}
              <div className="relative p-4 bg-white rounded-xl mb-6 shadow-xl">
                <div className="w-44 h-44 bg-slate-100 flex items-center justify-center relative border-4 border-white">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CinemaPayment_${finalTotal}`}
                    alt="QR Code"
                    className="w-full h-full"
                  />
                </div>
              </div>
              <p className="text-white/50 text-xs uppercase tracking-widest font-black">
                Scan to Pay
              </p>
            </div>
          )}

          <div className="mt-8">
            <button
              onClick={handlePayment}
              className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 active:scale-[0.98] cursor-pointer"
            >
              <Lock size={20} /> Pay Now
            </button>
          </div>
        </div>

        {/* RIGHT SECTION: BOOKING SUMMARY */}
        <div className="w-full md:w-[380px] bg-black/30 p-6 lg:p-10 flex flex-col">
          <h3 className="text-white text-xl font-bold mb-8">Booking Summary</h3>
          <div className="flex gap-4 mb-8">
            <div className="w-24 h-32 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 shadow-2xl">
              <img
                alt={movieTitle}
                className="w-full h-full object-cover"
                src={movieImage}
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-rose-500 font-black text-[10px] uppercase tracking-widest mb-1">
                IMAX 2D EXPERIENCE
              </span>
              <h4 className="text-white font-bold leading-tight mb-1 text-xl">
                {movieTitle}
              </h4>
              <p className="text-white/60 text-sm">
                {date} • {time}
              </p>
              <div className="text-white/80 text-sm mt-3 font-medium flex items-center gap-2">
                <Armchair size={16} className="text-rose-500" />
                <span>
                  Seats:{" "}
                  <b className="text-white">
                    {seats.join(", ").replace(/-/g, "")}
                  </b>
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            {/* 2. HIỂN THỊ GIÁ VÉ CHI TIẾT */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/50 font-medium">
                Tickets ({seats.length}x)
              </span>
              <span className="text-white font-semibold">
                ${(totalTicketPrice || seats.length * seatPrice).toFixed(2)}
              </span>
            </div>

            {/* HIỂN THỊ ĐỒ ĂN (Nếu có) */}
            {foodItems.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-rose-500 font-black text-[10px] uppercase tracking-widest mb-1">
                  <Utensils size={14} /> Snacks & Drinks
                </div>
                {foodItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs">
                    <span className="text-white/60">
                      {item.qty}x {item.name}
                    </span>
                    <span className="text-white/80">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-white/5 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/50 font-medium">Booking Fee</span>
                <span className="text-white font-semibold">
                  ${bookingFee.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pb-4 border-b border-white/5">
                <span className="text-white/50 font-medium">
                  Service Tax (8%)
                </span>
                <span className="text-white font-semibold">
                  ${tax.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-end pt-2">
              <span className="text-white font-bold text-lg">Total Amount</span>
              <div className="text-right">
                <span className="text-rose-500 font-black text-3xl tracking-tight block">
                  ${finalTotal.toFixed(2)}
                </span>
                <span className="text-white/30 text-[10px] font-bold tracking-wider uppercase">
                  ~ {(finalTotal * 25000).toLocaleString()} VND
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
