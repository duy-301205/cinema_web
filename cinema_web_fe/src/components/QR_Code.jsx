import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download, Share2, ChevronLeft } from "lucide-react";
import { MOVIES_DATA } from "../data/movie";

export default function QrCode() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = MOVIES_DATA.find((m) => m.id === parseInt(id));

  const ticketDetails = {
    date: "Friday, Oct 27",
    time: "19:30",
    hall: "IMAX - Screen 4",
    seats: "H12, H13",
    bookingId: "#BK-8829",
  };

  if (!movie)
    return <div className="text-white text-center pt-20">Ticket not found</div>;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start pt-10 pb-20 px-4 font-sans">
      <div className="w-full max-w-[420px] flex justify-between items-center mb-6 text-white">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        <h2 className="font-bold text-lg">My Ticket</h2>
        <div className="w-9"></div>
      </div>

      {/* Ticket Container */}
      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col text-[#111a22] relative">
        <div className="relative h-56 w-full">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${movie.heroBg || movie.image})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <span className="bg-blue-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              PG-13
            </span>
            <h1 className="text-2xl font-bold mt-1 text-shadow-sm">
              {movie.title}
            </h1>
          </div>
        </div>

        {/* Middle: Logistics Section */}
        <div className="p-6 relative">
          <div className="grid grid-cols-2 gap-y-6">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Date
              </span>
              <span className="text-sm font-semibold">
                {ticketDetails.date}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Time
              </span>
              <span className="text-sm font-semibold">
                {ticketDetails.time}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Hall
              </span>
              <span className="text-sm font-semibold">
                {ticketDetails.hall}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Seats
              </span>
              <span className="text-sm font-bold text-blue-600">
                {ticketDetails.seats}
              </span>
            </div>
          </div>
        </div>

        {/* --- Ticket Cutout Effect (Hiệu ứng vết cắt) --- */}
        <div className="relative w-full h-0 flex items-center justify-between z-10">
          <div className="w-6 h-6 rounded-full bg-slate-950 -ml-3"></div>
          <div className="w-full border-t-2 border-dashed border-slate-200 mx-2"></div>
          <div className="w-6 h-6 rounded-full bg-slate-950 -mr-3"></div>
        </div>

        {/* Bottom: QR Code Section */}
        <div className="bg-slate-50 p-8 flex flex-col items-center justify-center pt-8">
          <h3 className="text-[#111a22] tracking-tight text-xl font-bold leading-tight text-center pb-4">
            Scan This Code at Entry
          </h3>

          <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CinemaMax-Ticket-123456"
              alt="Ticket QR Code"
              className="w-48 h-48 object-contain"
            />
          </div>

          <p className="text-slate-500 text-xs font-normal leading-normal mt-6">
            Booking ID:{" "}
            <span className="font-mono font-bold text-slate-700">
              {ticketDetails.bookingId}
            </span>
          </p>
        </div>
      </div>

      {/* Action Buttons Below Ticket */}
      <div className="mt-8 flex flex-col gap-3 w-full max-w-[420px]">
        {/* Download PDF */}
        <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-blue-600 text-white text-sm font-bold leading-normal transition-all hover:bg-blue-500 shadow-lg shadow-blue-600/20 active:scale-95">
          <Download size={18} className="mr-2" />
          Download PDF Ticket
        </button>

        {/* Apple Wallet */}
        <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-black text-white text-sm font-bold leading-normal transition-all hover:bg-zinc-900 border border-zinc-700 active:scale-95">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.31-1.32-3.14-2.53C4.25 17 2.97 12.01 4.65 9.1c.83-1.44 2.31-2.36 3.93-2.38 1.23-.03 2.39.82 3.15.82s2.12-1.01 3.57-.86c.6-.01 2.3.23 3.39 1.83-.09.05-2.02 1.18-2 3.51.02 2.82 2.45 3.76 2.48 3.77-.02.06-.39 1.34-1.28 2.71zM13 3.5c.62-.75 1.04-1.79.92-2.82-1.03.04-2.06.69-2.73 1.47-.6.69-1.05 1.72-.9 2.72 1.13.09 2.1-.62 2.71-1.37z"></path>
          </svg>
          Add to Apple Wallet
        </button>

        {/* Share */}
        <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-5 bg-transparent text-slate-400 text-sm font-medium leading-normal hover:text-white transition-colors">
          <Share2 size={18} className="mr-2" />
          Share with Friends
        </button>
      </div>
    </div>
  );
}
