import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Star, Ticket, Share2, X, ArrowLeft } from "lucide-react";

export default function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);

  const data = location.state;

  if (!data) {
    return (
      <div className="h-screen bg-[#0a0a0a] flex items-center justify-center">
        <button onClick={() => navigate("/")} className="text-white underline">
          No booking record found. Go back to Home.
        </button>
      </div>
    );
  }

  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]">
      {/* Background mờ phía sau */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src={data.poster}
          className="w-full h-full object-cover blur-3xl"
          alt="bg"
        />
      </div>

      <div className="relative z-10 w-full max-w-[600px] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header thành công */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 border-b border-white/10 bg-gradient-to-br from-slate-800 to-transparent">
          <div
            className="w-28 h-40 flex-shrink-0 rounded-lg shadow-2xl bg-cover bg-center border border-white/10"
            style={{ backgroundImage: `url(${data.poster})` }}
          />

          <div className="flex flex-col justify-between py-1">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="text-emerald-400" size={20} />
                <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px]">
                  Payment Successful
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Booking Confirmed!
              </h1>
              <p className="text-white/60 text-sm italic">
                Enjoy your movie time.
              </p>
            </div>

            <div className="mt-4 inline-flex items-center gap-3 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-2">
              <Star className="text-rose-500 fill-rose-500" size={16} />
              <div>
                <p className="text-[10px] text-white/50 font-bold uppercase">
                  Points Earned
                </p>
                <p className="text-rose-500 text-lg font-black">
                  +{data.points}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nội dung chi tiết vé / QR Code */}
        <div className="p-6 md:p-8">
          {!showQR ? (
            <div className="space-y-4 animate-in slide-in-from-bottom-2">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/40 text-sm">Movie</span>
                <span className="text-white font-medium">
                  {data.movieTitle}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/40 text-sm">Location</span>
                <span className="text-white font-medium text-right">
                  {data.location}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/40 text-sm">Date & Time</span>
                <span className="text-white font-medium">{data.dateTime}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-white/40 text-sm">Seats</span>
                <span className="text-white font-bold text-rose-500 uppercase">
                  {data.seats}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-4 animate-in zoom-in">
              <div className="p-3 bg-white rounded-xl mb-4 shadow-xl">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data.ticketId}`}
                  alt="QR Ticket"
                  className="w-32 h-32"
                />
              </div>
              <p className="text-white font-mono text-xs tracking-[0.3em] uppercase">
                {data.ticketId}
              </p>
              <p className="text-white/40 text-[10px] mt-2 italic text-center">
                Scan this code at the cinema entrance
              </p>
            </div>
          )}
        </div>

        {/* Nút hành động */}
        <div className="px-6 md:px-8 pb-8 flex flex-col gap-4">
          <button
            onClick={() => setShowQR(!showQR)}
            className="w-full flex items-center justify-center gap-3 bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]"
          >
            {showQR ? <ArrowLeft size={18} /> : <Ticket size={18} />}
            {showQR ? "Back to Details" : "View Digital Ticket (QR)"}
          </button>

          <button
            onClick={() => navigate("/home")}
            className="text-white/40 hover:text-white text-sm transition-colors text-center"
          >
            Go back to Home
          </button>
        </div>

        <button
          onClick={() => navigate("/home")}
          className="absolute top-4 right-4 text-white/20 hover:text-white p-2 hover:bg-white/5 rounded-full"
        >
          <X size={20} />
        </button>
      </div>
    </main>
  );
}
