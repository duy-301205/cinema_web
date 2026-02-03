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
} from "lucide-react";

export default function PaymentTicket() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("momo"); // 'momo' | 'vnpay' | 'card'

  // Lấy dữ liệu từ trang Booking truyền sang
  const data = location.state;

  const handlePayment = () => {
    // Giả lập tạo dữ liệu thành công
    const successData = {
      movieTitle: movieTitle,
      poster: movieImage,
      location: "Grand Cinema Deluxe • Hall 4", // Có thể truyền từ Booking sang nếu có
      dateTime: `${date} • ${time}`,
      seats: seats.join(", ").replace(/-/g, ""),
      points: Math.floor(finalTotal * 10), // Giả sử 1$ = 10 điểm
      ticketId: `TIX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    };

    // Chuyển hướng sang trang success và truyền dữ liệu
    navigate("/success", { state: successData });
  };

  if (!data) {
    return (
      <div className="h-screen bg-[#0a0a0a] flex items-center justify-center">
        <button onClick={() => navigate("/")} className="text-white underline">
          Session expired. Go back to Home.
        </button>
      </div>
    );
  }

  const { movieTitle, movieImage, date, time, seats, totalPrice } = data;

  const bookingFee = 2.5;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + bookingFee + tax;

  return (
    <div className="bg-[#0f172a] min-h-screen flex items-center justify-center p-4 sm:p-8 font-sans antialiased text-slate-200">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 overflow-hidden opacity-20">
        <img
          alt="background"
          className="w-full h-full object-cover blur-xl"
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80"
        />
      </div>

      {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 right-6 z-20 text-white/30 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
      >
        <X size={28} />
      </button>

      <div className="relative z-10 w-full max-w-[1050px] flex flex-col md:flex-row bg-slate-900/80 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        {/* LEFT SECTION: Payment Details */}
        <div className="flex-1 p-6 lg:p-10 border-b md:border-b-0 md:border-r border-white/10">
          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold leading-tight tracking-tight mb-2">
              Payment Details
            </h2>
            <p className="text-white/60 text-sm">
              Select your payment method and complete your booking.
            </p>
          </div>

          {/* Payment Method Tabs */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => setPaymentMethod("momo")}
              className={`flex items-center gap-3 py-4 px-4 rounded-xl font-bold transition-all border-2 cursor-pointer ${
                paymentMethod === "momo"
                  ? "bg-[#A50064] border-transparent text-white"
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center p-1.5 flex-shrink-0">
                <svg
                  className="w-full h-full fill-[#A50064]"
                  viewBox="0 0 100 100"
                >
                  <path d="M80 20H20C14.5 20 10 24.5 10 30V70C10 75.5 14.5 80 20 80H80C85.5 80 90 75.5 90 70V30C90 24.5 85.5 20 80 20ZM40 65H30V35H40V65ZM70 65H60V35H70V65Z"></path>
                </svg>
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-widest opacity-80">
                  Pay with
                </span>
                <span className="text-base font-bold">MoMo</span>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod("vnpay")}
              className={`flex items-center gap-3 py-4 px-4 rounded-xl font-bold transition-all border-2 cursor-pointer ${
                paymentMethod === "vnpay"
                  ? "bg-[#005baa] border-transparent text-white"
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center p-1 flex-shrink-0 text-[#005baa] font-black italic text-xl">
                VN
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-widest opacity-80">
                  Pay with
                </span>
                <span className="text-base font-bold">VNPay</span>
              </div>
            </button>
          </div>

          {/* New: Credit Card Tab Option */}
          <button
            onClick={() => setPaymentMethod("card")}
            className={`w-full flex items-center justify-between p-4 mb-8 rounded-xl transition-all border-2 group cursor-pointer ${
              paymentMethod === "card"
                ? "bg-blue-600 border-transparent text-white"
                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard
                size={24}
                className={
                  paymentMethod === "card" ? "text-white" : "text-white/40"
                }
              />
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-widest opacity-80">
                  Pay with
                </span>
                <span className="text-base font-bold">Credit / Debit Card</span>
              </div>
            </div>
            {paymentMethod !== "card" && (
              <ChevronRight className="text-white/20" size={18} />
            )}
          </button>

          <div className="space-y-6">
            {/* HIỂN THỊ QR CODE CHO MOMO/VNPAY */}
            {(paymentMethod === "momo" || paymentMethod === "vnpay") && (
              <div className="bg-slate-950/50 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-1">
                    Scan to Pay with{" "}
                    {paymentMethod === "momo" ? "MoMo" : "VNPay"}
                  </h4>
                  <p className="text-white/50 text-xs">
                    Open your app to scan this code
                  </p>
                </div>

                <div className="relative p-4 bg-white rounded-xl mb-6 shadow-xl">
                  <div className="w-44 h-44 bg-slate-100 flex items-center justify-center relative border-4 border-white">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CinemaPayment_${finalTotal}`}
                      alt="QR Code"
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div className="w-full text-left space-y-3 max-w-[280px]">
                  {[
                    `Open the ${paymentMethod.toUpperCase()} app`,
                    'Select "Scan QR" and point camera here',
                    `Confirm the payment of $${finalTotal.toFixed(2)}`,
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/10 text-white/80 flex items-center justify-center text-[10px] font-bold shrink-0 border border-white/10">
                        {idx + 1}
                      </div>
                      <p className="text-white/70 text-xs leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HIỂN THỊ FORM NHẬP THẺ NẾU CHỌN CARD */}
            {paymentMethod === "card" && (
              <div className="space-y-4 animate-in slide-in-from-top-4 duration-500">
                <div className="grid gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/40 ml-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/40 ml-1">
                      Expiry Date
                    </label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/40 ml-1">
                      CVV/CVC
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                        size={18}
                      />
                      <input
                        type="password"
                        placeholder="***"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/40 ml-1">
                    Cardholder Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="NGUYEN VAN A"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all uppercase"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <button
              onClick={handlePayment}
              className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-rose-600/20 flex items-center justify-center gap-3 active:scale-[0.98] cursor-pointer"
            >
              <Lock size={20} />
              Pay Now
            </button>
          </div>
        </div>

        {/* RIGHT SECTION: Booking Summary */}
        <div className="w-full md:w-[380px] bg-black/30 p-6 lg:p-10 flex flex-col">
          <h3 className="text-white text-xl font-bold mb-8">Booking Summary</h3>
          {/* ... Phần Summary giữ nguyên như code cũ của bạn ... */}
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
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/50 font-medium">
                Tickets ({seats.length}x)
              </span>
              <span className="text-white font-semibold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
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

          <div className="mt-auto pt-10">
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-center">
              <Ticket className="text-rose-500 mx-auto mb-2" size={24} />
              <p className="text-white/60 text-[11px] italic leading-relaxed">
                Tickets for {seats.length} person(s) will be sent instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
